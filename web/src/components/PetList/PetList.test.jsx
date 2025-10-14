import React from "react";
import { render, screen } from "@testing-library/react";
import PetList from "./PetList";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";

test("renders title", () => {
  const { getByRole } = render(<PetList />);

  expect(getByRole("heading")).toHaveTextContent("My Pets");
});

test("renders pets returned by API", async () => {
  server.use(
    http.get("/api/pets", () =>
      HttpResponse.json([
        { id: "1", name: "Fido", type: "Dog", feeds: 3, imageUrl: "" },
        { id: "2", name: "Mittens", type: "Cat", feeds: 2, imageUrl: "" },
      ])
    )
  );

  render(<PetList />);

  expect(await screen.findByText("Fido")).toBeInTheDocument();
  expect(await screen.findByText("Mittens")).toBeInTheDocument();

  const images = await screen.findAllByRole("img", { name: /pet/i });
  expect(images).toHaveLength(2);
});

test("handles server error by rendering no items and error message", async () => {
  server.use(http.get("/api/pets", () => HttpResponse.error()));

  render(<PetList />);

  await screen.findByRole("heading", { name: /my pets/i });
  expect(screen.queryAllByRole("img", { name: /pet/i })).toHaveLength(0);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    /failed to load pets/i
  );
});

test("handles 404 by rendering no items and error message", async () => {
  server.use(
    http.get("/api/pets", () =>
      HttpResponse.json({ message: "Not found" }, { status: 404 })
    )
  );

  render(<PetList />);

  await screen.findByRole("heading", { name: /my pets/i });
  expect(screen.queryAllByRole("img", { name: /pet/i })).toHaveLength(0);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    /no pets found/i
  );
});