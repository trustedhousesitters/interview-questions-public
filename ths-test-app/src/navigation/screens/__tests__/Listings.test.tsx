import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import ListingsScreen from '../Listings';
import { LoggedInContext } from '../../../App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useListings } from '../../../hooks/useListings';
import { useNavigation } from '@react-navigation/native';

jest.mock('../../../hooks/useListings');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const mockUseListings = useListings as jest.MockedFunction<typeof useListings>;
const mockUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>;

const renderWithContext = (component: React.ReactNode, isLoggedIn = false) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}>
        {component}
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

test('renders LoginRequiredScreen when not logged in', () => {
  mockUseListings.mockReturnValue({
    listingData: [],
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById: jest.fn(),
  });

  renderWithContext(<ListingsScreen />, false);
  
  const loginRequiredText = screen.getByText('Login Required');
  expect(loginRequiredText).toBeTruthy();
});

test('calls getAllListings when logged in', () => {
  const getAllListings = jest.fn();
  mockUseListings.mockReturnValue({
    listingData: [],
    listing: null,
    error: null,
    getAllListings,
    getListingById: jest.fn(),
  });

  renderWithContext(<ListingsScreen />, true);
  
  expect(getAllListings).toHaveBeenCalled();
});

test('renders listing items when logged in', () => {
  const mockListings = [
    { id: '1', title: 'Test Listing 1' },
    { id: '2', title: 'Test Listing 2' },
  ];

  mockUseListings.mockReturnValue({
    listingData: mockListings,
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById: jest.fn(),
  });

  const mockNavigate = jest.fn();
  mockUseNavigation.mockReturnValue({
    navigate: mockNavigate,
  } as any);

  renderWithContext(<ListingsScreen />, true);
  
  expect(screen.getByText('Test Listing 1')).toBeTruthy();
  expect(screen.getByText('Test Listing 2')).toBeTruthy();
});

test('navigates to ListingDetails when listing is pressed', async () => {
  const mockListings = [
    { id: '1', title: 'Test Listing 1' },
  ];

  mockUseListings.mockReturnValue({
    listingData: mockListings,
    listing: null,
    error: null,
    getAllListings: jest.fn(),
    getListingById: jest.fn(),
  });

  const mockNavigate = jest.fn();
  mockUseNavigation.mockReturnValue({
    navigate: mockNavigate,
  } as any);

  const user = userEvent.setup();
  renderWithContext(<ListingsScreen />, true);
  
  const listingItem = screen.getByText('Test Listing 1');
  await user.press(listingItem);
  
  expect(mockNavigate).toHaveBeenCalledWith('ListingDetails', { id: '1' });
});
