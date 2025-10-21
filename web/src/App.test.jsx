import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

  test("filters pets by search term", async () => {
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

    // Search for "Fido"
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "Fido" } });

    await waitFor(() => {
      expect(screen.getByText("Fido")).toBeInTheDocument();
      expect(screen.queryByText("Mittens")).not.toBeInTheDocument();
    });
  });

  test("filters pets by pet type", async () => {
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

    // Filter by Dog type
    const dogButton = screen.getByRole("button", { name: "Dog" });
    fireEvent.click(dogButton);

    await waitFor(() => {
      expect(screen.getByText("Fido")).toBeInTheDocument();
      expect(screen.queryByText("Mittens")).not.toBeInTheDocument();
    });
  });

  test("clears search filters", async () => {
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

    // Apply search filter
    const searchInput = screen.getByPlaceholderText("Search by pet name");
    fireEvent.change(searchInput, { target: { value: "Fido" } });

    await waitFor(() => {
      expect(screen.getByText("Fido")).toBeInTheDocument();
      expect(screen.queryByText("Mittens")).not.toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByRole("button", { name: "Clear" });
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText("Fido")).toBeInTheDocument();
      expect(screen.getByText("Mittens")).toBeInTheDocument();
    });
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
