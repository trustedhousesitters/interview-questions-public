import React from "react";
import { render } from "@testing-library/react";
import ListingCarousel from "./ListingCarousel";

test("renders title", () => {
  const screen = render(<ListingCarousel />);

  expect(screen.getByRole("heading", { name: "Listings" })).toBeInTheDocument();
});
