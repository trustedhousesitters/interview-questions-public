import React from "react";
import { render } from "@testing-library/react";
import PetList from "./PetList";

test("renders title", () => {
  const { getByRole } = render(<PetList />);

  expect(getByRole("heading")).toHaveTextContent("My Pets");
});
