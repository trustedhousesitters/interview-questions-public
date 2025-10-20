import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import PetSearch from "./PetSearch";
import { PET_TYPES } from "../../constants";

const mockPets = [
  { id: "1", name: "Fido", type: "Dog", feeds: 3 },
  { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
  { id: "3", name: "Rocky", type: "Rock", feeds: 0 },
  { id: "4", name: "Buddy", type: "Dog", feeds: 1 },
];

describe("PetSearch", () => {
  const mockOnResultsChange = vi.fn();

  beforeEach(() => {
    mockOnResultsChange.mockClear();
  });

  test("renders search input", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders all pet type buttons", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    PET_TYPES.forEach((type) => {
      expect(screen.getByRole("button", { name: type })).toBeInTheDocument();
    });
  });

  test("renders clear button", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const clearButton = screen.getByRole("button", { name: "Clear" });
    expect(clearButton).toBeInTheDocument();
  });

  test("filters pets by search term", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "Fido" } });
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 }
    ]);
  });

  test("filters pets by pet type", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const dogButton = screen.getByRole("button", { name: "Dog" });
    fireEvent.click(dogButton);
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 },
      { id: "4", name: "Buddy", type: "Dog", feeds: 1 }
    ]);
  });

  test("filters pets by both search term and pet type", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    const dogButton = screen.getByRole("button", { name: "Dog" });
    
    fireEvent.change(searchInput, { target: { value: "Buddy" } });
    fireEvent.click(dogButton);
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "4", name: "Buddy", type: "Dog", feeds: 1 }
    ]);
  });

  test("shows selected state for pet type button", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const dogButton = screen.getByRole("button", { name: "Dog" });
    fireEvent.click(dogButton);
    
    expect(dogButton).toHaveClass("selected");
  });

  test("clears search term and pet type when clear button is clicked", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    const dogButton = screen.getByRole("button", { name: "Dog" });
    const clearButton = screen.getByRole("button", { name: "Clear" });
    
    // Set search term and pet type
    fireEvent.change(searchInput, { target: { value: "Fido" } });
    fireEvent.click(dogButton);
    
    // Clear everything
    fireEvent.click(clearButton);
    
    expect(searchInput).toHaveValue("");
    expect(dogButton).not.toHaveClass("selected");
    expect(mockOnResultsChange).toHaveBeenCalledWith(mockPets);
  });

  test("handles case-insensitive search", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "fido" } });
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 }
    ]);
  });

  test("handles case-insensitive pet type filtering", () => {
    const petsWithMixedCase = [
      { id: "1", name: "Fido", type: "dog", feeds: 3 },
      { id: "2", name: "Mittens", type: "CAT", feeds: 2 },
    ];
    
    render(<PetSearch pets={petsWithMixedCase} onResultsChange={mockOnResultsChange} />);
    
    const dogButton = screen.getByRole("button", { name: "Dog" });
    fireEvent.click(dogButton);
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "1", name: "Fido", type: "dog", feeds: 3 }
    ]);
  });

  test("handles empty pets array", () => {
    render(<PetSearch pets={[]} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "test" } });
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([]);
  });

  test("handles undefined pets prop", () => {
    render(<PetSearch pets={undefined} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "test" } });
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([]);
  });

  test("handles pets with missing name property", () => {
    const petsWithMissingName = [
      { id: "1", type: "Dog", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    render(<PetSearch pets={petsWithMissingName} onResultsChange={mockOnResultsChange} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "Mittens" } });
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 }
    ]);
  });

  test("handles pets with missing type property", () => {
    const petsWithMissingType = [
      { id: "1", name: "Fido", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    render(<PetSearch pets={petsWithMissingType} onResultsChange={mockOnResultsChange} />);
    
    const catButton = screen.getByRole("button", { name: "Cat" });
    fireEvent.click(catButton);
    
    expect(mockOnResultsChange).toHaveBeenCalledWith([
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 }
    ]);
  });

  test("works without onResultsChange callback", () => {
    expect(() => {
      render(<PetSearch pets={mockPets} />);
    }).not.toThrow();
  });

  test("calls onResultsChange with all pets initially", () => {
    render(<PetSearch pets={mockPets} onResultsChange={mockOnResultsChange} />);
    
    expect(mockOnResultsChange).toHaveBeenCalledWith(mockPets);
  });
});
