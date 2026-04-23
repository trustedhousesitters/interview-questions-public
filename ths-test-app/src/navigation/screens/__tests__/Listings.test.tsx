import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import ListingsScreen from '../Listings';
import { listingsApi } from '../../../services/listings';

jest.mock('../../../services/listings');

const mockNavigate = jest.fn();

const mockListings = [
  {
    id: '1',
    title: 'Cosy Cottage',
    published: '2025-01-01T00:00:00',
    location: { name: 'Bath', admin1Name: 'England', countryName: 'United Kingdom' },
    user: { id: 'u1', firstName: 'Alice' },
    animals: [],
  },
  {
    id: '2',
    title: 'Beach House',
    published: '2025-01-02T00:00:00',
    location: { name: 'Brighton', admin1Name: 'England', countryName: 'United Kingdom' },
    user: { id: 'u2', firstName: 'Bob' },
    animals: [],
  },
];

beforeEach(() => {
  mockNavigate.mockClear();
  (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
});

test('renders listing rows when API succeeds', async () => {
  (listingsApi.getAll as jest.Mock).mockResolvedValue({ ok: true, data: mockListings });

  render(<ListingsScreen />);

  expect(await screen.findByText('Cosy Cottage')).toBeTruthy();
  expect(screen.getByText('Beach House')).toBeTruthy();
});

test('renders no rows when API returns an error', async () => {
  (listingsApi.getAll as jest.Mock).mockResolvedValue({ ok: false, status: 'error' });

  render(<ListingsScreen />);

  // Flush the async effect so the failed response is processed
  await act(async () => {});

  expect(screen.queryByText('Cosy Cottage')).toBeNull();
});

test('navigates to Listing with listingId when a row is pressed', async () => {
  (listingsApi.getAll as jest.Mock).mockResolvedValue({ ok: true, data: mockListings });
  const user = userEvent.setup();

  render(<ListingsScreen />);

  await user.press(await screen.findByText('Cosy Cottage'));

  expect(mockNavigate).toHaveBeenCalledWith('Listing', { listingId: '1' });
});
