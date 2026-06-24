import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import HomeScreen from "../Home";
import { LoggedInContext } from "../../../App";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const renderWithContext = (
  component: React.ReactNode,
  isLoggedIn = false,
  toggleIsLoggedIn = jest.fn(),
) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
        <NavigationContainer>{component}</NavigationContainer>
      </LoggedInContext.Provider>
    </SafeAreaProvider>,
  );
};

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
const navigation = {
  dispatch: mockDispatch,
  navigate: mockNavigate,
};
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
jest.mock("@react-navigation/native", () => ({
  StackActions: {
    push: jest.fn((screen, params) => ({
      type: "PUSH",
      payload: { screen, params },
    })),
  },
}));
test("renders login button when not logged in", () => {
  renderWithContext(<HomeScreen />, false);

  const loginButton = screen.getByText("Log In");
  expect(loginButton).toBeTruthy();
});

test("renders logout button when logged in", () => {
  renderWithContext(<HomeScreen />, true);

  const logoutButton = screen.getByText("Log Out");
  expect(logoutButton).toBeTruthy();
});
test("navigates to Listings after logging in", async () => {
  const user = userEvent.setup();
  renderWithContext(<HomeScreen />, false); // Not logged in

  await user.press(screen.getByText("Log In"));

  expect(mockNavigate).toHaveBeenCalledWith("HomeTabs", { screen: "Listings" });
});
test("calls toggleIsLoggedIn when Log Out button is pressed", async () => {
  const toggleIsLoggedIn = jest.fn();
  const user = userEvent.setup();
  renderWithContext(<HomeScreen />, true, toggleIsLoggedIn);

  await user.press(screen.getByText("Log Out"));

  expect(toggleIsLoggedIn).toHaveBeenCalled();
});
test("calls toggleIsLoggedIn when Log In button is pressed", async () => {
  const toggleIsLoggedIn = jest.fn();
  const user = userEvent.setup();
  renderWithContext(<HomeScreen />, false, toggleIsLoggedIn);

  const loginButton = screen.getByText("Log In");
  await user.press(loginButton);

  expect(toggleIsLoggedIn).toHaveBeenCalled();
});
it("navigates to ListingDetails when pendingListingId exists", async () => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue("123");

  const listingId = await AsyncStorage.getItem("pendingListingId");

  if (listingId) {
    navigation.dispatch(StackActions.push("ListingDetails", { listingId }));
    await AsyncStorage.removeItem("pendingListingId");
  } else {
    navigation.navigate("HomeTabs", { screen: "Listings" });
  }

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "PUSH",
    payload: {
      screen: "ListingDetails",
      params: { listingId: "123" },
    },
  });

  expect(AsyncStorage.removeItem).toHaveBeenCalledWith("pendingListingId");
});
