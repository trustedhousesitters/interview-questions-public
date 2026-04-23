import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';
import {
  createNavigationContainerRef,
  getStateFromPath,
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';
import { LoggedInContext } from '../../App';
import { Navigation } from '../index';
import { listingsApi } from '../../services/listings';

// The integration tests render the full navigator, so hooks like useRoute and
// useNavigation must use the real implementations provided by the navigator context.
// This overrides the global mock set in jest.setup.js for this file only.
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}));

jest.mock('../../services/listings');

// Path config type doesn't deeply accept nested screens in its generic shape
const LISTING_PATH_CONFIG: any = {
  screens: {
    HomeTabs: {
      screens: {
        Listings: {
          screens: {
            ListingsList: 'listings',
            Listing: {
              path: 'listing',
              parse: { listingId: (v: string) => v },
            },
          },
        },
      },
    },
    NotFound: '*',
  },
};

const makeListing = (id: string) => ({
  ok: true as const,
  data: {
    id,
    title: `Listing ${id}`,
    published: '2025-01-01T00:00:00',
    location: { name: 'Bath', admin1Name: 'England', countryName: 'United Kingdom' },
    user: { id: 'u1', firstName: 'Alice' },
    animals: [],
  },
});

beforeEach(() => {
  (listingsApi.getAll as jest.Mock).mockReturnValue(new Promise(() => {}));
});

const renderNavigator = (isLoggedIn: boolean, ref?: React.Ref<NavigationContainerRef<ParamListBase>>) =>
  render(
    <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}>
      <Navigation ref={ref} />
    </LoggedInContext.Provider>,
  );

// ─── Auth guard ──────────────────────────────────────────────────────────────

test('Listings tab is not shown when logged out', () => {
  renderNavigator(false);
  expect(screen.queryByText('Listings')).toBeNull();
});

test('Listings tab is shown when logged in', () => {
  renderNavigator(true);
  expect(screen.getByText('Listings')).toBeTruthy();
});

// ─── Deep link URL parsing ────────────────────────────────────────────────────

test('ths-test-app://listing?listingId=123456 resolves to Listing screen with correct params', () => {
  const state = getStateFromPath('listing?listingId=123456', LISTING_PATH_CONFIG);

  // Traverse nested state: RootStack → HomeTabs → Listings (ListingsStack) → Listing
  const homeTabsRoute = state?.routes[0];
  const listingsTabRoute = homeTabsRoute?.state?.routes?.find((r) => r.name === 'Listings');
  const listingRoute = listingsTabRoute?.state?.routes?.find((r) => r.name === 'Listing');

  expect(listingRoute?.name).toBe('Listing');
  expect(listingRoute?.params).toEqual({ listingId: '123456' });
});

// ─── Stacking behaviour ───────────────────────────────────────────────────────

test('navigating to a different listing pushes it on top of the existing one', async () => {
  const ref = createNavigationContainerRef<ParamListBase>();

  (listingsApi.getById as jest.Mock).mockImplementation((id: string) =>
    Promise.resolve(makeListing(id)),
  );

  renderNavigator(true, ref);

  // Wait for navigator ready and auth guard to resolve
  await screen.findByText('Listings');
  await waitFor(() => expect(ref.isReady()).toBe(true));

  const navigateToListing = async (listingId: string) =>
    await act(async () => {
      ref.dispatch({
        type: 'NAVIGATE',
        payload: {
          name: 'HomeTabs',
          params: {
            screen: 'Listings',
            params: { screen: 'Listing', params: { listingId } },
          },
        },
      });
    });

  // Navigate to listing '1'
  await navigateToListing('1');
  expect(await screen.findByText('Listing 1')).toBeTruthy();

  // Navigate to listing '2' — getId ensures it pushes on top, not replaces
  await navigateToListing('2');
  expect(await screen.findByText('Listing 2')).toBeTruthy();

  // Go back — should reveal listing '1', not the list root
  await act(async () => ref.goBack());
  expect(await screen.findByText('Listing 1')).toBeTruthy();
});
