import React from "react";
import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoggedInContext } from "../../../App";
import ListingDetails from "../ListingDetails";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const renderWithContext = (
  isLoggedIn = true,
  route = { params: { listingId: "123" } },
) => {
  return render(
    <SafeAreaProvider>
      <NavigationContainer>
        <LoggedInContext.Provider
          value={{ isLoggedIn, toggleIsLoggedIn: jest.fn() }}
        >
          <ListingDetails route={route} />
        </LoggedInContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>,
  );
};

beforeEach(() => {
  mockNavigate.mockClear();

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ title: "Test" }),
  }) as jest.Mock;
});

test("displays error when no listingId is provided", async () => {
  global.fetch = jest.fn() as jest.Mock;
  renderWithContext(true, { params: { listingId: undefined } });
  expect(await screen.findByText("No listing ID provided")).toBeTruthy();
});

test("displays the listing id", () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ title: "Test Listing" }),
  }) as jest.Mock;

  renderWithContext();
  expect(screen.getByText("Details for listing: 123")).toBeTruthy();
});

test("displays listing title after successful fetch", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ title: "Lovely Dogs" }),
  }) as jest.Mock;

  renderWithContext();

  expect(await screen.findByText("Lovely Dogs")).toBeTruthy();
});

test("displays not found error when listing does not exist", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
  }) as jest.Mock;

  renderWithContext();

  expect(await screen.findByText("Listing not found")).toBeTruthy();
});

test("displays network error when fetch fails", async () => {
  global.fetch = jest
    .fn()
    .mockRejectedValue(new Error("Network request failed")) as jest.Mock;

  renderWithContext();

  expect(
    await screen.findByText("Network error. Please try again."),
  ).toBeTruthy();
});
