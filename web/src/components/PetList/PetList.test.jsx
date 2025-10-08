import React from "react";
import { render, screen } from "@testing-library/react";
import PetList from "./PetList";
import mockPets from '@/mocks/pets'

globalThis.fetch = vi.fn( () => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockPets) 
}))

test("renders title", async () => {
  render(<PetList />);
  const heading = await screen.findByRole('heading', {name: "My Pets"})
  expect(heading).toBeInTheDocument()
});
