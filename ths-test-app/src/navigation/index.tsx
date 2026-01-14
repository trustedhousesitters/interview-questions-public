import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import HomeScreen from "./screens/Home/Home";
import Listings from "./screens/Listings/Listings";
import IndividualListing from "./screens/IndividualListing/IndividualListing";
import NotFound from "./screens/NotFound/NotFound";

import { HapticTab } from "../components/HapticTab";
import { IconSymbol } from "../components/ui/IconSymbol";
import TabBarBackground from "../components/ui/TabBarBackground";

type TabParamList = {
  Home: undefined;
  Listings: undefined;
};

type RootStackParamList = {
  HomeTabs: undefined;
  Listings: undefined;
  IndividualListing: { id: number };
  Home: undefined;
  NotFound: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const linking = {
  prefixes: ["thstestapp://"],
  config: {
    screens: {
      Home: "/",
      IndividualListing: {
        path: "listing",
        parse: {
          id: (id: string) => Number(id),
        },
        stringify: {
          id: (id: number) => id.toString(),
        },
      },
      Listings: "listings",
      NotFound: "*",
    },
  },
};

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarActiveTintColor: "#006263",
      tabBarStyle: Platform.select({
        ios: {
          position: "absolute" as const,
        },
        default: {},
      }),
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="house.fill" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Listings"
      component={Listings}
      options={{
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="pawprint" color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Listings" component={Listings} />
            <Stack.Screen
              name="IndividualListing"
              component={IndividualListing}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type { RootStackParamList };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
