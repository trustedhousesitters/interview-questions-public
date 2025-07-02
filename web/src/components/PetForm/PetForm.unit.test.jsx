import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PetForm from "./PetForm";

const mockDispatch = vi.fn();

vi.mock("@/context/PetContext", () => ({
  usePets: () => ({
    dispatch: mockDispatch,
  }),
}));

vi.mock("@/utils/fetchDogImage", () => ({
  fetchDogImage: vi.fn(),
}));

test("renders form inputs and button", () => {
  render(<PetForm />);

  // Name input
  const nameInput = screen.getByLabelText("Name:");
  expect(nameInput).toHaveAttribute("type", "text");
  expect(nameInput).toHaveAttribute("pattern", "^[a-zA-Z\\s]+$");
  expect(nameInput).toBeRequired();

  // Animal type
  const typeSelect = screen.getByLabelText("Animal Type:");
  expect(typeSelect).toBeRequired();
  expect(screen.getByRole("option", { name: "Dog" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Cat" })).toBeInTheDocument();

  // Number input
  const feedsInput = screen.getByLabelText("Number of Feeds:");
  expect(feedsInput).toHaveAttribute("type", "number");
  expect(feedsInput).toHaveAttribute("min", "1");
  expect(feedsInput).toHaveAttribute("max", "10");
  expect(feedsInput).toHaveValue(1);

  // Submit button
  expect(screen.getByRole("button", { name: /Add Pet/i })).toHaveAttribute("type", "submit");
});

test("shows error if name/type are missing", async () => {
  render(<PetForm noValidate />);
  await userEvent.click(screen.getByRole("button", { name: /Add Pet/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Name and animal type are required.");
});

test("dispatches ADD_PET action", async () => {
  render(<PetForm noValidate />);
  await userEvent.type(screen.getByLabelText("Name:"), "Pizza");
  await userEvent.selectOptions(screen.getByLabelText("Animal Type:"), "Dog");
  await userEvent.clear(screen.getByLabelText("Number of Feeds:"));
  await userEvent.type(screen.getByLabelText("Number of Feeds:"), "3");
  await userEvent.click(screen.getByRole("button", { name: /Add Pet/i }));

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  const action = mockDispatch.mock.calls[0][0];
  expect(action.type).toBe("ADD_PET");
  expect(action.payload).toMatchObject({
    name: "Pizza",
    type: "Dog",
    feeds: 3,
  });
});
