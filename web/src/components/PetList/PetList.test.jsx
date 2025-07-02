import React from "react";
import { render, screen } from "@testing-library/react";
import { PetProvider } from "@/context/PetContext";
import PetList from "./PetList";

test("renders title", async () => {
  render(
    <PetProvider>
      <PetList />
    </PetProvider>
  );
  const heading = await screen.findByRole("heading");
  expect(heading).toHaveTextContent("My Pets");
});

test("renders pets from API", async () => {
  render(
    <PetProvider>
      <PetList />
    </PetProvider>
  );

  const items = await screen.findAllByTestId("pet-item");
  expect(items).toHaveLength(13);
});
