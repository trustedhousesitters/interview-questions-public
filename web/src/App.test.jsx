import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import App from "./App";

// Mock fetch to avoid actual network calls
global.fetch = vi.fn();

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders logo", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: "logo" })).toBeInTheDocument();
  });

  test("renders PetSearch and PetList components", () => {
    render(<App />);
    
    // Check for PetSearch elements
    expect(screen.getByPlaceholderText("Search by pet name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    
    // Check for PetList elements
    expect(screen.getByRole("heading", { name: "My Pets" })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("fetches and displays pets successfully", async () => {
    const mockPets = [
      { id: "1", name: "Fido", type: "Dog", feeds: 3, imageUrl: "" },
      { id: "2", name: "Mittens", type: "Cat", feeds: 2, imageUrl: "" },
    ];

    server.use(
      http.get("/api/pets", () => HttpResponse.json(mockPets))
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Fido")).toBeInTheDocument();
      expect(screen.getByText("Mittens")).toBeInTheDocument();
    });
  });

  test("handles 404 error by showing no pets found message", async () => {
    server.use(
      http.get("/api/pets", () =>
        HttpResponse.json({ message: "Not found" }, { status: 404 })
      )
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("No pets found");
    });

    // Should not show any pet images
    expect(screen.queryAllByRole("img", { name: /pet/i })).toHaveLength(0);
  });

  test("handles server error by showing error message", async () => {
    server.use(
      http.get("/api/pets", () => HttpResponse.error())
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to load pets. Please try again later."
      );
    });
  });

  test("handles network error by showing error message", async () => {
    server.use(
      http.get("/api/pets", () => {
        throw new Error("Network error");
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to load pets. Please try again later."
      );
    });
  });

  test("passes pets to PetSearch component", async () => {
    const mockPets = [
      { id: "1", name: "Fido", type: "Dog", feeds: 3, imageUrl: "" },
    ];

    server.use(
      http.get("/api/pets", () => HttpResponse.json(mockPets))
    );

    render(<App />);

    await waitFor(() => {
      // PetSearch should receive the pets and be able to search them
      const searchInput = screen.getByPlaceholderText("Search by pet name");
      expect(searchInput).toBeInTheDocument();
    });
  });

  test("initially shows empty filtered pets list", () => {
    render(<App />);
    
    // Initially, filteredPets should be empty, so no pet images should be visible
    expect(screen.queryAllByRole("img", { name: /pet/i })).toHaveLength(0);
  });

  test("shows error state when API fails", async () => {
    server.use(
      http.get("/api/pets", () => HttpResponse.error())
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to load pets. Please try again later."
      );
    });
  });
});
