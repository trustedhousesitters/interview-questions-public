import React from "react";
import { render, screen } from "@testing-library/react";
import PetList from "./PetList";

const mockPets = [
  { id: "1", name: "Fido", type: "Dog", feeds: 3, imageUrl: "" },
  { id: "2", name: "Mittens", type: "Cat", feeds: 2, imageUrl: "" },
];

test("renders title", () => {
  const { getByRole } = render(<PetList pets={[]} />);

  expect(getByRole("heading")).toHaveTextContent("My Pets");
});

test("renders pets passed as props", () => {
  render(<PetList pets={mockPets} />);

  expect(screen.getByText("Fido")).toBeInTheDocument();
  expect(screen.getByText("Mittens")).toBeInTheDocument();

  const images = screen.getAllByRole("img", { name: /pet/i });
  expect(images).toHaveLength(2);
});

test("renders error message when error prop is provided", () => {
  render(<PetList pets={[]} error="Failed to load pets" />);

  expect(screen.getByRole("alert")).toHaveTextContent("Failed to load pets");
});

test("renders empty list when no pets provided", () => {
  render(<PetList pets={[]} />);

  expect(screen.getByRole("heading")).toHaveTextContent("My Pets");
  expect(screen.queryAllByRole("img", { name: /pet/i })).toHaveLength(0);
});

test("handles undefined pets prop", () => {
  render(<PetList pets={undefined} />);

  expect(screen.getByRole("heading")).toHaveTextContent("My Pets");
  expect(screen.queryAllByRole("img", { name: /pet/i })).toHaveLength(0);
});