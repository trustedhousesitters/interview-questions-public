import React from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Listings from "./Listings";
import { LoggedInContext } from "../../../App";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Alert } from "react-native";

const mockNavigate = jest.fn();
const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockListings = [
  { id: 385669, title: "Mountain sit with two cats" },
  { id: 338555, title: "Beach stay with dog" },
  { id: 339162, title: "Come and stay by the beach with my dog" },
];

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const renderWithContext = (
  component: React.ReactNode,
  isLoggedIn = false,
  toggleIsLoggedIn = jest.fn()
) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
        <NavigationContainer>{component}</NavigationContainer>
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

describe("Listings Screen", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockNavigate.mockClear();
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockListings),
    });
  });

  test("renders listings when logged in", async () => {
    renderWithContext(<Listings />, true);

    await waitFor(() => {
      expect(screen.getByText("Mountain sit with two cats")).toBeTruthy();
    });
  });

  test("renders multiple listings if they are there", async () => {
    renderWithContext(<Listings />, true);

    await waitFor(() => {
      expect(screen.getByText("Mountain sit with two cats")).toBeTruthy();
      expect(screen.getByText("Beach stay with dog")).toBeTruthy();
      expect(
        screen.getByText("Come and stay by the beach with my dog")
      ).toBeTruthy();
    });
  });

  test("navigates to listing detail when listing is pressed", async () => {
    const user = userEvent.setup();
    renderWithContext(<Listings />, true);

    await waitFor(() => {
      expect(screen.getByText("Mountain sit with two cats")).toBeTruthy();
    });

    const listingItem = screen.getByText("Mountain sit with two cats");
    await user.press(listingItem);

    expect(mockNavigate).toHaveBeenCalledWith("Listing", { id: 385669 });
  });

  test("handles API error gracefully", async () => {
    mockFetch.mockReset();
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

    renderWithContext(<Listings />, true);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Error accessing listings, please try again later"
      );
    });

    alertSpy.mockRestore();
  });
});
