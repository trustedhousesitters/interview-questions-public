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