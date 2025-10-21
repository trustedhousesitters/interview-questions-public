import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import PetSearch from "./PetSearch";
import { PET_TYPES } from "../../constants";

describe("PetSearch", () => {
  const mockOnSearchTermChange = vi.fn();
  const mockOnPetTypeChange = vi.fn();
  const mockOnClearSearch = vi.fn();

  beforeEach(() => {
    mockOnSearchTermChange.mockClear();
    mockOnPetTypeChange.mockClear();
    mockOnClearSearch.mockClear();
  });

  const defaultProps = {
    searchTerm: "",
    petType: "",
    onSearchTermChange: mockOnSearchTermChange,
    onPetTypeChange: mockOnPetTypeChange,
    onClearSearch: mockOnClearSearch,
  };

  test("renders search input", () => {
    render(<PetSearch {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders all pet type buttons", () => {
    render(<PetSearch {...defaultProps} />);
    
    PET_TYPES.forEach((type) => {
      expect(screen.getByRole("button", { name: type })).toBeInTheDocument();
    });
  });

  test("renders clear button", () => {
    render(<PetSearch {...defaultProps} />);
    
    const clearButton = screen.getByRole("button", { name: "Clear" });
    expect(clearButton).toBeInTheDocument();
  });

  test("calls onSearchTermChange when search input changes", () => {
    render(<PetSearch {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "Fido" } });
    
    expect(mockOnSearchTermChange).toHaveBeenCalledTimes(1);
  });

  test("calls onPetTypeChange when pet type button is clicked", () => {
    render(<PetSearch {...defaultProps} />);
    
    const dogButton = screen.getByRole("button", { name: "Dog" });
    fireEvent.click(dogButton);
    
    expect(mockOnPetTypeChange).toHaveBeenCalledWith("Dog");
  });

  test("calls onClearSearch when clear button is clicked", () => {
    render(<PetSearch {...defaultProps} />);
    
    const clearButton = screen.getByRole("button", { name: "Clear" });
    fireEvent.click(clearButton);
    
    expect(mockOnClearSearch).toHaveBeenCalled();
  });

  test("shows selected state for pet type button when petType prop matches", () => {
    render(<PetSearch {...defaultProps} petType="Dog" />);
    
    const dogButton = screen.getByRole("button", { name: "Dog" });
    expect(dogButton).toHaveClass("selected");
  });

  test("displays search term value from props", () => {
    render(<PetSearch {...defaultProps} searchTerm="Fido" />);
    
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    expect(searchInput).toHaveValue("Fido");
  });

  test("works with default prop values", () => {
    expect(() => {
      render(<PetSearch />);
    }).not.toThrow();
  });

  test("handles missing callback props gracefully", () => {
    expect(() => {
      render(<PetSearch searchTerm="" petType="" />);
      
      const searchInput = screen.getByPlaceholderText("Search by pet name");
      const dogButton = screen.getByRole("button", { name: "Dog" });
      const clearButton = screen.getByRole("button", { name: "Clear" });
      
      fireEvent.change(searchInput, { target: { value: "test" } });
      fireEvent.click(dogButton);
      fireEvent.click(clearButton);
    }).not.toThrow();
  });
});
