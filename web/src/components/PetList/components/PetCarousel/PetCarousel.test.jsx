import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PetCarousel from "./PetCarousel";
import mockPets from '@/mocks/pets'
import { expect } from "vitest";

describe("PetCarousel", () => {

  beforeAll(() => {
    // I need scrollTo to be mocked
    Element.prototype.scrollTo = vi.fn();
  });

  beforeEach(() => {
    render(<PetCarousel pets={mockPets} />);
  });

  test("renders the tracker", () => {
      const tracker = screen.getByRole('tracker');
      expect(tracker).toHaveTextContent("1/13")
  });

  test("renders all pet names in the DOM", () => {
    
    mockPets.forEach((pet) => {
      expect(screen.getAllByText(pet.name)[0]).toBeInTheDocument();
    });
  });

  test("clicking next updates tracker", () => {
    
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    const tracker = screen.getByRole('tracker');
    expect(tracker).toHaveTextContent("2/13")
  });

  test("clicking prev from first scroll to last", () => {
    
    const prev = screen.getByRole("button", { name: /prev/i });
    fireEvent.click(prev);

    const tracker = screen.getByRole('tracker');
    expect(tracker).toHaveTextContent("13/13")
  });

  test("clicking next from lasy scroll to first", () => {
    
    const next = screen.getByRole("button", { name: /next/i });
    // click 13 times on next
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);

    const tracker = screen.getByRole('tracker');
    expect(tracker).toHaveTextContent("1/1");
    
  });
});
