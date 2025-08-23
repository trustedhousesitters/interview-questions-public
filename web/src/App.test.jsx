import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders logo", async () => {
  render(<App />);

  expect(await screen.findByRole("img", { name: "logo" })).toBeInTheDocument();
});
