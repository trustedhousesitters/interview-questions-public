import { useContext } from 'react';
import { LoggedInContext } from '@/App';

export function useIsLoggedIn() {
  const { isLoggedIn } = useContext(LoggedInContext);
  return isLoggedIn;
}
