import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import HomeScreen from './screens/Home';
import Listings from './screens/Listings';
import Listing from './screens/Listing';
import NotFound from './screens/NotFound';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

import { HapticTab } from '../components/HapticTab';
import { IconSymbol } from '../components/ui/IconSymbol';
import TabBarBackground from '../components/ui/TabBarBackground';

const ListingsStack = createNativeStackNavigator({
  screens: {
    ListingsList: {
      screen: Listings,
      options: {
        headerShown: false,
      },
      linking: {
        path: 'listings',
      },
    },
    Listing: {
      screen: Listing,
      getId: ({ params }) => (params as { listingId?: string })?.listingId,
      options: {
        title: 'Listing',
      },
      linking: {
        path: 'listing',
        parse: {
          listingId: (value: string) => value,
        },
      },
    },
  },
});

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
      },
    },
    Listings: {
      if: useIsLoggedIn,
      screen: ListingsStack,
      options: {
        headerShown: false,
        lazy: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="pawprint" color={color} />,
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select({
      ios: {
        // Use a transparent background on iOS to show the blur effect
        position: 'absolute' as const,
      },
      default: {},
    }),
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },

  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      // StaticParamList does not infer params for conditional screens (if:).
      // Explicitly declare them here so navigate() is correctly typed.
      Listing: { listingId: string };
    }
  }
}
