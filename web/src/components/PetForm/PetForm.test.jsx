import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PetProvider } from "@/context/PetContext";
import PetForm from "./PetForm";

test("renders pet form", async () => {
  render(
    <PetProvider>
      <PetForm />
    </PetProvider>
  );
  expect(screen.getByLabelText("Name:")).toBeInTheDocument();
  expect(screen.getByLabelText("Animal Type:")).toBeInTheDocument();
  expect(screen.getByLabelText("Number of Feeds:")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Add Pet/i })).toBeInTheDocument();
});

test("shows error if name and type are missing", async () => {
  render(
    <PetProvider>
      <PetForm noValidate />
    </PetProvider>
  );

  await userEvent.click(screen.getByRole("button", { name: /Add Pet/i }));

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Name and animal type are required."
  );
});

test("accepts input and submits form", async () => {
  render(
    <PetProvider>
      <PetForm noValidate />
    </PetProvider>
  );

  const nameInput = screen.getByLabelText("Name:");
  const typeSelect = screen.getByLabelText("Animal Type:");
  const feedsInput = screen.getByLabelText("Number of Feeds:");

  await userEvent.type(nameInput, "Pizza");
  await userEvent.selectOptions(typeSelect, "Dog");
  await userEvent.clear(feedsInput);
  await userEvent.type(feedsInput, "3");

  expect(nameInput).toHaveValue("Pizza");
  expect(typeSelect).toHaveValue("Dog");
  expect(feedsInput).toHaveValue(3);

  await userEvent.click(screen.getByRole("button", { name: /Add Pet/i }));

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
}
);