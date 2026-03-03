import React from "react";
import { render, screen } from "@testing-library/react-native";
import ListingsScreen from "../Listings";
import { LoggedInContext } from "../../../App";
import { SafeAreaProvider } from "react-native-safe-area-context";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const renderWithContext = (component: React.ReactNode, isLoggedIn = false, toggleIsLoggedIn = jest.fn()) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
        {component}
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

test("shows login message when logged out", () => {
  renderWithContext(<ListingsScreen />, false);

  expect(screen.getByText('Please log in to view listings.')).toBeTruthy();
});
