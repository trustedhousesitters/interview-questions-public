import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import PetList from "./PetList";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { generatePets } from "@/mocks/generatePets";

const server = setupServer(
  http.get("/api/pets", () => {
    return HttpResponse.json(generatePets(3));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders title", async () => {
  render(<PetList />);

  expect(await screen.findByRole("heading")).toHaveTextContent("My Pets");
});

test("when api successful it shows a list of pets", async () => {
  render(<PetList />);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  expect(await screen.findByRole("list")).toBeInTheDocument();
  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("when api successful but there are no pets, it shows a not found message", async () => {
  server.use(
    http.get("/api/pets", () => {
      return HttpResponse.json(generatePets(0));
    })
  );

  render(<PetList />);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  expect(await screen.findByText("No pets found")).toBeInTheDocument();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("when api fails it shows an error message", async () => {
  server.use(
    http.get("/api/pets", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<PetList />);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Something went wrong"
  );
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});
