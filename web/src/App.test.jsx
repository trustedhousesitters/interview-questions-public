import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "./App";

test("renders logo", async () => {
  render(<App />);
  const logo = await screen.findByRole("img", { name: /logo/i });
  expect(logo).toBeInTheDocument();
});