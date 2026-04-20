import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoggedInContext } from "../../../App";
import ListingsScreen from "../Listings";

const mockDispatch = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    dispatch: mockDispatch,
  }),
}));

const mockListings = [
  { id: 1, title: "Listing One" },
  { id: 2, title: "Listing Two" },
];

beforeEach(() => {
  mockDispatch.mockClear();
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockListings),
  }) as jest.Mock;
});

const renderWithContext = (isLoggedIn = true) => {
  return render(
    <SafeAreaProvider>
      <NavigationContainer>
        <LoggedInContext.Provider
          value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}
        >
          <ListingsScreen />
        </LoggedInContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>,
  );
};

test("shows login message when not logged in", () => {
  renderWithContext(false);
  expect(screen.getByText("Please log in to see the listings.")).toBeTruthy();
});

test("renders listing rows when logged in", async () => {
  renderWithContext(true);
  expect(await screen.findByText("Listing One")).toBeTruthy();
  expect(await screen.findByText("Listing Two")).toBeTruthy();
});

test("navigates to ListingDetails when a listing row is pressed", async () => {
  const user = userEvent.setup();
  renderWithContext(true);

  await screen.findByText("Listing One");

  await user.press(screen.getByText("Listing One"));

  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "PUSH",
      payload: expect.objectContaining({
        name: "ListingDetails",
        params: { listingId: "1" },
      }),
    }),
  );
});
