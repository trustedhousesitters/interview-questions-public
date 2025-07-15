// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/server";
import "@testing-library/jest-dom";

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close())
