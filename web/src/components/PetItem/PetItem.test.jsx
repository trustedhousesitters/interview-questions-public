import React from "react";
import { render } from "@testing-library/react";
import { PetProvider } from "@/context/PetContext";
import { generatePets } from "@/mocks/generatePets";
import PetItem from "./PetItem";

const pets = generatePets();

test("renders pet image", () => {
  const { getByRole } = render(
    <PetProvider>
      <PetItem pet={pets[0]} />
    </PetProvider>
  );
  expect(getByRole("img", { name: "pet" })).toBeInTheDocument();
});

test("renders pet name", () => {
  const { getByText } = render(
    <PetProvider>
      <PetItem pet={pets[0]} />
    </PetProvider>
  );
  expect(getByText(/Name/)).toBeInTheDocument();
  expect(getByText(pets[0].name)).toBeInTheDocument();
});

test("renders pet animal type", () => {
  const { getByText } = render(
    <PetProvider>
      <PetItem pet={pets[0]} />
    </PetProvider>
  );
  expect(getByText(/Animal Type/)).toBeInTheDocument();
  expect(getByText(pets[0].type)).toBeInTheDocument();
});

test("renders number of feeds", () => {
  const { getByText } = render(
    <PetProvider>
      <PetItem pet={pets[0]} />
    </PetProvider>
  );
  expect(getByText(/Number of feeds/)).toBeInTheDocument();
  expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

test("renders delete pet button", () => {
  const { getByRole } = render(
    <PetProvider>
      <PetItem pet={pets[0]} />
    </PetProvider>
  );
  expect(getByRole("button", { name: /Delete/ })).toBeInTheDocument();
});
