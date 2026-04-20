import "react-native-gesture-handler";
import { useEffect, useState, createContext, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StackActions,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useLogger } from "@react-navigation/devtools";
import * as Linking from "expo-linking";
import { Navigation } from "./navigation";

SplashScreen.preventAutoHideAsync();

const LoggedInContext = createContext<LoggedInContextType>({
  isLoggedIn: false,
  toggleIsLoggedIn: async () => {},
});

export interface LoggedInContextType {
  isLoggedIn: boolean;
  toggleIsLoggedIn: () => Promise<void>;
}

export function App() {
  const [serverStarted, setServerStarted] = useState(false);
  const [isLoggedInRetrieved, setIsLoggedInRetrieved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigationRef = useNavigationContainerRef();

  const handleDeepLink = async (url: string) => {
    const parsed = Linking.parse(url);
    const listingId = parsed.queryParams?.listingId as string;

    // if (!listingId) return;
    if (!isLoggedIn) {
      await AsyncStorage.setItem("pendingListingId", listingId);

      navigationRef.navigate("HomeTabs", { screen: "Home" });
    } else {
      navigationRef.dispatch(
        StackActions.push("ListingDetails", { listingId }),
      );
    }
  };
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => sub.remove();
  }, [isLoggedIn]);
  useLogger(navigationRef);

  useEffect(() => {
    async function enableMocking() {
      if (!__DEV__) {
        return;
      }
      await import("../msw.polyfills");
      const { server } = await import("./mocks/server");
      server.listen();
      setServerStarted(true);
      SplashScreen.hide();
    }
    enableMocking();
  }, []);

  useEffect(() => {
    async function retrieveLoginStatus() {
      let storedStatus = null;
      try {
        storedStatus = await AsyncStorage.getItem("isLoggedIn");
      } catch (e) {
        console.error("Failed to retrieve login status:", e);
      }
      if (storedStatus !== null) {
        setIsLoggedIn(storedStatus === "true");
      } else {
        try {
          await AsyncStorage.setItem("isLoggedIn", false.toString());
        } catch (e) {
          console.error("Failed to save login status:", e);
        }
      }
      setIsLoggedInRetrieved(true);
    }
    retrieveLoginStatus();
  }, []);

  const toggleIsLoggedIn = async () => {
    try {
      const newValue = !isLoggedIn;
      await AsyncStorage.setItem("isLoggedIn", newValue.toString());
      setIsLoggedIn(newValue);
    } catch (e) {
      console.error("Failed to save login status:", e);
    }
  };

  if (!serverStarted || !isLoggedInRetrieved) {
    return null;
  }

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
      <Navigation ref={navigationRef} />
    </LoggedInContext.Provider>
  );
}

export { LoggedInContext };
