import React from "react";
import { render } from "@testing-library/react";
import { generatePets } from "@/mocks/generatePets";
import PetItem from "./PetItem";

const pets = generatePets();

test("renders pet image", () => {
  const { getByRole } = render(<PetItem pet={pets[0]} />);
  expect(getByRole("img", { name: "pet" })).toBeInTheDocument();
});

test("renders pet name", () => {
  const { getByText } = render(<PetItem pet={pets[0]} />);
  expect(getByText(/Name/)).toBeInTheDocument();
  expect(getByText(pets[0].name)).toBeInTheDocument();
});

test("renders pet animal type", () => {
  const { getByText } = render(<PetItem pet={pets[0]} />);
  expect(getByText(/Animal Type/)).toBeInTheDocument();
  expect(getByText(pets[0].type)).toBeInTheDocument();
});

test("renders pet age", () => {
  const { getByText } = render(<PetItem pet={pets[0]} />);
  expect(getByText(/Age/)).toBeInTheDocument();
  const ageText = pets[0].age === 1 ? "1 year old" : `${pets[0].age} years old`;
  expect(getByText(ageText)).toBeInTheDocument();
});

test("renders number of feeds", () => {
  const { getByText } = render(<PetItem pet={pets[0]} />);
  expect(getByText(/Number of feeds/)).toBeInTheDocument();
  expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});
