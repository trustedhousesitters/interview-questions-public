import { describe, test, expect } from "vitest";
import { filterPets } from "./utils";

describe("filterPets", () => {
  const mockPets = [
    { id: "1", name: "Fido", type: "Dog", feeds: 3 },
    { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    { id: "3", name: "Rocky", type: "Rock", feeds: 0 },
    { id: "4", name: "Buddy", type: "Dog", feeds: 1 },
    { id: "5", name: "Whiskers", type: "Cat", feeds: 4 },
  ];

  test("returns all pets when no filters are applied", () => {
    const result = filterPets(mockPets, "", "");
    expect(result).toEqual(mockPets);
  });

  test("filters pets by search term", () => {
    const result = filterPets(mockPets, "Fido", "");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 }
    ]);
  });

  test("filters pets by pet type", () => {
    const result = filterPets(mockPets, "", "Dog");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 },
      { id: "4", name: "Buddy", type: "Dog", feeds: 1 }
    ]);
  });

  test("filters pets by both search term and pet type", () => {
    const result = filterPets(mockPets, "Buddy", "Dog");
    expect(result).toEqual([
      { id: "4", name: "Buddy", type: "Dog", feeds: 1 }
    ]);
  });

  test("returns empty array when search term matches no pets", () => {
    const result = filterPets(mockPets, "NonExistent", "");
    expect(result).toEqual([]);
  });

  test("returns empty array when pet type matches no pets", () => {
    const result = filterPets(mockPets, "", "Bird");
    expect(result).toEqual([]);
  });

  test("returns empty array when both filters match no pets", () => {
    const result = filterPets(mockPets, "NonExistent", "Bird");
    expect(result).toEqual([]);
  });

  test("handles case-insensitive search", () => {
    const result = filterPets(mockPets, "fido", "");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 }
    ]);
  });

  test("handles case-insensitive pet type filtering", () => {
    const result = filterPets(mockPets, "", "dog");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 },
      { id: "4", name: "Buddy", type: "Dog", feeds: 1 }
    ]);
  });

  test("handles partial search matches", () => {
    const result = filterPets(mockPets, "id", "");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 }
    ]);
  });

  test("handles empty pets array", () => {
    const result = filterPets([], "Fido", "Dog");
    expect(result).toEqual([]);
  });

  test("handles undefined pets", () => {
    const result = filterPets(undefined, "Fido", "Dog");
    expect(result).toEqual([]);
  });

  test("handles null pets", () => {
    const result = filterPets(null, "Fido", "Dog");
    expect(result).toEqual([]);
  });

  test("handles pets with missing name property", () => {
    const petsWithMissingName = [
      { id: "1", type: "Dog", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithMissingName, "Mittens", "");
    expect(result).toEqual([
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 }
    ]);
  });

  test("handles pets with missing type property", () => {
    const petsWithMissingType = [
      { id: "1", name: "Fido", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithMissingType, "", "Cat");
    expect(result).toEqual([
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 }
    ]);
  });

  test("handles pets with null name", () => {
    const petsWithNullName = [
      { id: "1", name: null, type: "Dog", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithNullName, "Mittens", "");
    expect(result).toEqual([
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 }
    ]);
  });

  test("handles pets with null type", () => {
    const petsWithNullType = [
      { id: "1", name: "Fido", type: null, feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithNullType, "", "Cat");
    expect(result).toEqual([
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 }
    ]);
  });

  test("handles pets with numeric name", () => {
    const petsWithNumericName = [
      { id: "1", name: 123, type: "Dog", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithNumericName, "123", "");
    expect(result).toEqual([
      { id: "1", name: 123, type: "Dog", feeds: 3 }
    ]);
  });

  test("handles pets with numeric type", () => {
    const petsWithNumericType = [
      { id: "1", name: "Fido", type: 123, feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithNumericType, "", "123");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: 123, feeds: 3 }
    ]);
  });

  test("handles whitespace in search term", () => {
    const result = filterPets(mockPets, "  Fido  ", "");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 }
    ]);
  });

  test("handles whitespace in pet type", () => {
    const result = filterPets(mockPets, "", "  Dog  ");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 },
      { id: "4", name: "Buddy", type: "Dog", feeds: 1 }
    ]);
  });

  test("handles special characters in search term", () => {
    const petsWithSpecialChars = [
      { id: "1", name: "Fido-123", type: "Dog", feeds: 3 },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2 },
    ];
    
    const result = filterPets(petsWithSpecialChars, "Fido-123", "");
    expect(result).toEqual([
      { id: "1", name: "Fido-123", type: "Dog", feeds: 3 }
    ]);
  });

  test("handles multiple pets matching search term", () => {
    const petsWithSimilarNames = [
      { id: "1", name: "Fido", type: "Dog", feeds: 3 },
      { id: "2", name: "Fido Jr", type: "Dog", feeds: 2 },
      { id: "3", name: "Mittens", type: "Cat", feeds: 1 },
    ];
    
    const result = filterPets(petsWithSimilarNames, "Fido", "");
    expect(result).toEqual([
      { id: "1", name: "Fido", type: "Dog", feeds: 3 },
      { id: "2", name: "Fido Jr", type: "Dog", feeds: 2 }
    ]);
  });
});
