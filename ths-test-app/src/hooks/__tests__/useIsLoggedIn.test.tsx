import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { LoggedInContext } from '../../App';
import { useIsLoggedIn } from '../useIsLoggedIn';

// Wrapper to mock values for the LoggedInContext
const makeMockWrapper = (isLoggedIn: boolean) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}>
      {children}
    </LoggedInContext.Provider>
  );

  // Eslint was complaining..
  Wrapper.displayName = 'LoggedInContextWrapper';

  return Wrapper;
};

test('returns false when not logged in', () => {
  const { result } = renderHook(() => useIsLoggedIn(), {
    wrapper: makeMockWrapper(false), 
  });

  expect(result.current).toBe(false);
});

test('returns true when logged in', () => {
  const { result } = renderHook(() => useIsLoggedIn(), {
    wrapper: makeMockWrapper(true), 
  });

  expect(result.current).toBe(true);
});
