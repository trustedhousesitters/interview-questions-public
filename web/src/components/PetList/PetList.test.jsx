import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PetList from "./PetList";
import PetItem from "./components/PetItem/PetItem";

const mockPets = [
  { id: 1, name: "Fido", petType: "Dog" },
  { id: 2, name: "Whiskers", petType: "Cat" },
  { id: 3, name: "Montgomery", petType: "Horse" },
  { id: 4, name: "Rocky", petType: "Rock" },
];

test("renders title", () => {
  const { getByRole } = render(<PetList />);

  expect(getByRole("heading")).toHaveTextContent("My Pets");
});

test("renders pet list", () => {
  render(<PetList />);
  const { getByRole } = render(<PetItem />);

  render(
    mockPets.map((pet) => {
      render(<PetItem pet={pet} key={pet.id} />);
      expect(getByRole("name")).toBeInTheDocument();
    })
  );
});
