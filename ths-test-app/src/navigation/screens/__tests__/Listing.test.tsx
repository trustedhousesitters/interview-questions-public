import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';

import ListingScreen from '../Listing';
import { listingsApi } from '../../../services/listings';

jest.mock('../../../services/listings');

const mockListing = {
  id: '123',
  title: 'Cosy Cottage in Bath',
  published: '2025-01-01T00:00:00',
  location: { name: 'Bath', admin1Name: 'England', countryName: 'United Kingdom' },
  user: { id: 'u1', firstName: 'Alice' },
  animals: [{ name: 'Dog', slug: 'dog', count: 2 }],
};

beforeEach(() => {
  (useRoute as jest.Mock).mockReturnValue({ params: { listingId: '123' } });
});

test('shows no content while fetching', () => {
  // Never-resolving promise keeps the screen in loading state
  (listingsApi.getById as jest.Mock).mockReturnValue(new Promise(() => {}));

  render(<ListingScreen />);

  expect(screen.queryByText('Cosy Cottage in Bath')).toBeNull();
  expect(screen.queryByText('Listing not found.')).toBeNull();
});

test('renders listing details on success', async () => {
  (listingsApi.getById as jest.Mock).mockResolvedValue({ ok: true, data: mockListing });

  render(<ListingScreen />);

  expect(await screen.findByText('Cosy Cottage in Bath')).toBeTruthy();
  expect(screen.getByText('Bath, England, United Kingdom')).toBeTruthy();
  expect(screen.getByText('2x Dog')).toBeTruthy();
  expect(screen.getByText('Hosted by Alice')).toBeTruthy();
});

test('shows not found message on 404', async () => {
  (listingsApi.getById as jest.Mock).mockResolvedValue({ ok: false, status: 'not_found' });

  render(<ListingScreen />);

  expect(await screen.findByText('Listing not found.')).toBeTruthy();
});

test('shows error message on network error', async () => {
  (listingsApi.getById as jest.Mock).mockResolvedValue({ ok: false, status: 'error' });

  render(<ListingScreen />);

  expect(
    await screen.findByText('Something went wrong. Please check your connection and try again.'),
  ).toBeTruthy();
});
