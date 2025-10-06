import React from "react";
import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

test("renders loading spinner", () => {
  const { container } = render(<LoadingSpinner />);
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
});

test("applies custom size prop", () => {
  const { container } = render(<LoadingSpinner size={100} />);
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("width", "100");
  expect(svg).toHaveAttribute("height", "100");
});
