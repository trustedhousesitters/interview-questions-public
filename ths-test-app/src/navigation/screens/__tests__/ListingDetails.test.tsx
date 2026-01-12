import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ListingDetailsScreen from '../ListingDetails';
import { LoggedInContext } from '../../../App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useListings } from '../../../hooks/useListings';
import { useRoute, RouteProp } from '@react-navigation/native';

jest.mock('../../../hooks/useListings');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

const mockUseListings = useListings as jest.MockedFunction<typeof useListings>;
const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

type ListingDetailsRoute = RouteProp<ReactNavigation.RootParamList, 'ListingDetails'>;

const createMockRoute = (params?: { id?: string; listingId?: string }): ListingDetailsRoute => {
  return {
    key: 'test-route',
    name: 'ListingDetails',
    params,
  } as ListingDetailsRoute;
};

const renderWithContext = (component: React.ReactNode, isLoggedIn = false) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}>
        {component}
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

test('renders Login Required when not logged in', () => {
  mockUseRoute.mockReturnValue(createMockRoute({ id: '1' }));

  mockUseListings.mockReturnValue({
    listingData: [],
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById: jest.fn(),
  });

  renderWithContext(<ListingDetailsScreen />, false);
  
  const loginRequiredText = screen.getByText('Login Required');
  expect(loginRequiredText).toBeTruthy();
});

test('renders Loading when logged in but no listing', () => {
  mockUseRoute.mockReturnValue(createMockRoute({ id: '1' }));

  mockUseListings.mockReturnValue({
    listingData: [],
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById: jest.fn(),
  });

  renderWithContext(<ListingDetailsScreen />, true);
  
  const loadingText = screen.getByText('Loading...');
  expect(loadingText).toBeTruthy();
});

test('calls getListingById when logged in and id is present', () => {
  const getListingById = jest.fn();
  mockUseRoute.mockReturnValue(createMockRoute({ id: '1' }));

  mockUseListings.mockReturnValue({
    listingData: [],
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById,
  });

  renderWithContext(<ListingDetailsScreen />, true);
  
  expect(getListingById).toHaveBeenCalledWith('1');
});

test('calls getListingById when logged in and listingId is present', () => {
  const getListingById = jest.fn();
  mockUseRoute.mockReturnValue(createMockRoute({ listingId: '2' }));

  mockUseListings.mockReturnValue({
    listingData: [],
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById,
  });

  renderWithContext(<ListingDetailsScreen />, true);
  
  expect(getListingById).toHaveBeenCalledWith('2');
});

test('renders listing details when listing is available', () => {
  const mockListing = {
    id: '1',
    title: 'Test Listing',
    user: { firstName: 'John' },
    location: { name: 'London', countryName: 'UK' },
    animals: [{ name: 'dog', count: 2 }],
  };

  mockUseRoute.mockReturnValue(createMockRoute({ id: '1' }));

  mockUseListings.mockReturnValue({
    listingData: [],
    listing: mockListing,
    error: null,
    getAllListings: jest.fn(),
    getListingById: jest.fn(),
  });

  renderWithContext(<ListingDetailsScreen />, true);
  
  expect(screen.getByText('John')).toBeTruthy();
  expect(screen.getByText('Test Listing')).toBeTruthy();
  expect(screen.getByText('London, UK')).toBeTruthy();
  expect(screen.getByText(/2/)).toBeTruthy();
});
