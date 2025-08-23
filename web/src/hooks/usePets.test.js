import { renderHook, waitFor } from "@testing-library/react";
import { test, expect } from "vitest";
import { usePets } from "./usePets";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { generatePets } from "@/mocks/generatePets";

const server = setupServer(
  http.get("/api/pets", () => {
    return HttpResponse.json(generatePets(1));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("It returns a loading status and then the data", async () => {
  const { result } = renderHook(() => usePets());

  expect(result.current.status).toBe("loading");
  await waitFor(() =>
    expect(result.current).toStrictEqual({
      status: "success",
      pets: [expect.objectContaining({ id: 0 })],
    })
  );
});

test("It returns a loading status and then an error if data fails", async () => {
  server.use(
    http.get("/api/pets", () => {
      return HttpResponse.json(null, { status: 500 });
    })
  );
  const { result } = renderHook(() => usePets());

  expect(result.current.status).toBe("loading");
  await waitFor(() =>
    expect(result.current).toStrictEqual({
      status: "error",
      pets: null,
    })
  );
});
