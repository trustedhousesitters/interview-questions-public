import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { LoggedInContext } from '../../App';
import { Navigation } from '../index';
import { listingsApi } from '../../services/listings';

jest.mock('../../services/listings');

beforeEach(() => {
  // Prevent Listings screen (lazy: false) from triggering real network calls
  (listingsApi.getAll as jest.Mock).mockReturnValue(new Promise(() => {}));
});

const renderNavigator = (isLoggedIn: boolean) =>
  render(
    <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}>
      <Navigation />
    </LoggedInContext.Provider>,
  );

test('Listings tab is not shown when logged out', () => {
  renderNavigator(false);
  expect(screen.queryByText('Listings')).toBeNull();
});

test('Listings tab is shown when logged in', () => {
  renderNavigator(true);
  expect(screen.getByText('Listings')).toBeTruthy();
});
