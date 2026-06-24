import React from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import IndividualListing from "./IndividualListing";
import { LoggedInContext } from "../../../App";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Alert } from "react-native";

const mockNavigate = {
  goBack: jest.fn(),
  push: jest.fn(),
  navigate: jest.fn(),
  dispatch: jest.fn(),
} as any;
const mockRoute = {
  key: "test-key",
  name: "IndividualListing" as const,
  params: { id: 1 },
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigate,
  useRoute: () => mockRoute,
}));

jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ children }: { children: React.ReactNode }) => children,
  }),
}));

jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ children }: { children: React.ReactNode }) => children,
  }),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockListingData = {
  id: 1,
  title: "Beautiful Home with Pets",
  animals: [{ count: 2, slug: "cats" }],
  location: { name: "Test Location", countryName: "Test Country" },
};

const mockAllListings = [
  { id: 1, title: "Beautiful Home with Pets" },
  { id: 2, title: "Cozy Apartment" },
  { id: 3, title: "Spacious House" },
];

const renderWithContext = (
  component: React.ReactNode,
  isLoggedIn = false,
  toggleIsLoggedIn = jest.fn()
) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
        {component}
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

describe("Listing Screen", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockNavigate.goBack.mockClear();
    mockNavigate.push.mockClear();

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockAllListings),
    });

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockListingData),
    });
  });

  test("renders the listing details", async () => {
    renderWithContext(
      <IndividualListing route={mockRoute} navigation={mockNavigate} />,
      true
    );

    await waitFor(() => {
      expect(screen.getByText("Beautiful Home with Pets")).toBeTruthy();
      expect(screen.getByText("2 cats")).toBeTruthy();
      expect(screen.getByText("Test Location, Test Country")).toBeTruthy();
    });
  });

  test("does not render the listing details if the user is not logged in", () => {
    renderWithContext(
      <IndividualListing route={mockRoute} navigation={mockNavigate} />,
      false
    );

    expect(screen.queryByText("Beautiful Home with Pets")).toBeFalsy();
    expect(screen.queryByText("2 cats")).toBeFalsy();
    expect(screen.queryByText("Test Location, Test Country")).toBeFalsy();
  });

  test("renders other listings", async () => {
    renderWithContext(
      <IndividualListing route={mockRoute} navigation={mockNavigate} />,
      true
    );

    await waitFor(() => {
      expect(screen.getByText("Other Listings to Explore:")).toBeTruthy();
      expect(screen.getByText("Cozy Apartment")).toBeTruthy();
      expect(screen.getByText("Spacious House")).toBeTruthy();
    });
  });

  test("navigates to the Listings screen when back button is pressed", async () => {
    const user = userEvent.setup();
    renderWithContext(
      <IndividualListing route={mockRoute} navigation={mockNavigate} />,
      true
    );

    await waitFor(() => {
      expect(screen.getByTestId("back-button")).toBeTruthy();
    });

    const backButton = screen.getByTestId("back-button");
    await user.press(backButton);

    expect(mockNavigate.goBack).toHaveBeenCalled();
  });

  test("navigates to another listing when the listing is pressed", async () => {
    const user = userEvent.setup();
    renderWithContext(
      <IndividualListing route={mockRoute} navigation={mockNavigate} />,
      true
    );

    await waitFor(() => {
      expect(screen.getByText("Cozy Apartment")).toBeTruthy();
    });

    const otherListing = screen.getByText("Cozy Apartment");
    await user.press(otherListing);

    expect(mockNavigate.push).toHaveBeenCalledWith("IndividualListing", { id: 2 });
  });

  test("handles API error gracefully", async () => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockAllListings),
    });
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(jest.fn());

    renderWithContext(
      <IndividualListing route={mockRoute} navigation={mockNavigate} />,
      true
    );

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Error accessing listing, please try again later"
      );
    });

    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
