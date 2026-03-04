import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import ListingsScreen from "../Listings";
import { LoggedInContext } from "../../../App";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fetchMock from 'jest-fetch-mock';

const mockListing = [
  {
    id: "338551",
    location: {
      name: "Horsham",
      slug: "horsham",
      admin1Name: "England",
      admin1Slug: "england",
      admin2Name: "West Sussex",
      admin2Slug: "west-sussex",
      countryName: "United Kingdom",
      countrySlug: "united-kingdom",
      continentName: "EU",
      continentSlug: "europe",
      coordinates: {
        lat: 51.06314,
        lon: -0.32757
      }
    },
    user: {
      id: "1306623",
      firstName: "Louise Standardowner",
      profilePhoto: {
        id: "2240224",
        publicId:
          "remote_media/media/photo/5b/111c4d5d464fb5aafa8d1a27c73089.jpg"
      },
      isReferred: false,
      referredCount: 0
    },
    animals: [
      {
        name: "cat",
        slug: "cats",
        count: 1
      }
    ],
    title: "Rural Horsham stay with Labrador",
    published: "2025-09-29T08:25:47"
  }
];

beforeEach(() => {
  fetchMock.resetMocks();
});

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

test("renders listing when logged in ", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockListing));

  renderWithContext(<ListingsScreen />, true);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith("/api/listings");
  });

  expect(await screen.findByText("Rural Horsham stay with Labrador")).toBeTruthy();
});