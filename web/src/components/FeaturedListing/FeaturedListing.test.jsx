import React from "react";
import { render } from "@testing-library/react";
import { featuredListings } from "../../mocks/featuredListings";
import FeaturedListing from "./FeaturedListing";

const listing = featuredListings[0];

test("renders featured listing image", () => {
  const { getByRole } = render(<FeaturedListing listing={listing} />);
  const img = getByRole("img");
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("alt", `${listing.name}, a featured ${listing.type}`);
});

test("renders listing name", () => {
  const { getByText } = render(<FeaturedListing listing={listing} />);
  expect(getByText(listing.name)).toBeInTheDocument();
});

test("renders listing type", () => {
  const { getByText } = render(<FeaturedListing listing={listing} />);
  expect(getByText(listing.type)).toBeInTheDocument();
});

test("renders listing description", () => {
  const { getByText } = render(<FeaturedListing listing={listing} />);
  expect(getByText(listing.description)).toBeInTheDocument();
});
