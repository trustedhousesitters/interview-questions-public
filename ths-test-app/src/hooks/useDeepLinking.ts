import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import {
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

type NavigationRef = NavigationContainerRef<ReactNavigation.RootParamList>;

function navigateOrPushToListingDetails(
  navigationRef: NavigationRef,
  listingId: string
) {
  const state = navigationRef.getState();
  const currentRoute = state?.routes[state.index];

  if (currentRoute?.name === 'ListingDetails') {
    navigationRef.dispatch(StackActions.push('ListingDetails', { listingId }));
  } else {
    navigationRef.navigate('ListingDetails', { listingId });
  }
}

export function useDeepLinking(navigationRef: NavigationRef, isLoggedIn: boolean) {

  useEffect(() => {
    const handleDeepLink = async (url: string | null) => {
      if (!url) return;

      const parsed = Linking.parse(url);
      const { hostname, queryParams } = parsed;

      if (hostname !== 'listing' || !queryParams?.listingId) {
        return;
      }

      if (!navigationRef.isReady()) {
        return;
      }

      const listingId = queryParams.listingId as string;
      if (!listingId) {
        return;
      }

      if (!isLoggedIn) {
        navigationRef.navigate('LoginRequired');
        return;
      }

      try {
        const response = await fetch(`/api/listings/${listingId}`);
        if (response.status === 404) {
          navigationRef.navigate('NotFound');
          return;
        }

        navigateOrPushToListingDetails(navigationRef, listingId);
      } catch (error) {
        console.error('Deep linking error:', error);
      }
    };

    Linking.getInitialURL().then(handleDeepLink);

    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      subscription.remove();
    };

  }, [navigationRef, isLoggedIn]);
}
