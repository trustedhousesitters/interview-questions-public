import React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders logo", () => {
  const { getByRole } = render(<App />);

  expect(getByRole("img", { name: "logo" })).toBeInTheDocument();
});
