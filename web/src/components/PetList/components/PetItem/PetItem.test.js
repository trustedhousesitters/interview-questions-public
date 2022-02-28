import React from "react";
import { render } from "@testing-library/react";
import { generatePets } from "../../../../helpers/generatePets";
import PetItem from "./PetItem";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { store } from "../../../../app/store";

const pets = generatePets();

test("renders pet image", () => {
  act(() => {
    const { getByRole } = render(
      <Provider store={store}>
        <PetItem pet={pets[0]} />
      </Provider>
    );
    expect(getByRole("img", { name: "pet" })).toBeInTheDocument();
  });
});

test("renders pet name", () => {
  const { getByText } = render(
    <Provider store={store}>
      <PetItem pet={pets[0]} />
    </Provider>
  );
  expect(getByText(/Name/)).toBeInTheDocument();
  expect(getByText(pets[0].name)).toBeInTheDocument();
});

test("renders pet animal type", () => {
  const { getByText } = render(
    <Provider store={store}>
      <PetItem pet={pets[0]} />
    </Provider>
  );
  expect(getByText(/Animal Type/)).toBeInTheDocument();
  expect(getByText(pets[0].type)).toBeInTheDocument();
});

test("renders number of feeds", () => {
  const { getByText } = render(
    <Provider store={store}>
      <PetItem pet={pets[0]} />
    </Provider>
  );
  expect(getByText(/Number of feeds/)).toBeInTheDocument();
  expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});
