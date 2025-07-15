import React from "react";
import { render } from "@testing-library/react";

import ListingCarousel from "./ListingCarousel";

test("renders title", () => {
  const screen = render(<ListingCarousel />);

  expect(screen.getByRole("heading", { name: "Listings" })).toBeInTheDocument();
});

test("renders carousel with data", async () => {
  const screen = render(<ListingCarousel />);

  const listings = screen.getAllByTestId("carousel-slide");

  expect(listings.length).toBe(9);
});
