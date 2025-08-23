import React from "react";
import { render, screen } from "@testing-library/react";
import { generatePets } from "@/mocks/generatePets";
import PetItem from "./PetItem";

const pets = generatePets();

test("renders pet image", () => {
  render(<PetItem pet={pets[0]} />);
  expect(screen.getByRole("img", { name: "pet" })).toBeInTheDocument();
});

test("renders pet name", () => {
  render(<PetItem pet={pets[0]} />);
  expect(screen.getByText(/Name/)).toBeInTheDocument();
  expect(screen.getByText(pets[0].name)).toBeInTheDocument();
});

test("renders pet animal type", () => {
  render(<PetItem pet={pets[0]} />);
  expect(screen.getByText(/Animal Type/)).toBeInTheDocument();
  expect(screen.getByText(pets[0].type)).toBeInTheDocument();
});

test("renders number of feeds", () => {
  render(<PetItem pet={pets[0]} />);
  expect(screen.getByText(/Number of feeds/)).toBeInTheDocument();
  expect(screen.getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});
