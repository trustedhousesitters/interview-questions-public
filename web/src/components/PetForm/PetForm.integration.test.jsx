import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PetProvider } from "@/context/PetContext";
import { fetchDogImage } from "@/utils/fetchDogImage";
import PetList from "../PetList";
import PetForm from "./PetForm";

vi.mock("@/utils/fetchDogImage", () => ({
  fetchDogImage: vi.fn(),
}));

const mockFetchDogImage = vi.mocked(fetchDogImage);

test("full addition flow: form submission with fetched image to list", async () => {
  const mockImageUrl = "https://random.dog/test.jpg";
  mockFetchDogImage.mockResolvedValue(mockImageUrl);

  render(
    <PetProvider>
      <PetForm />
      <PetList />
    </PetProvider>
  );

  const nameInput = screen.getByLabelText("Name:");
  const typeSelect = screen.getByLabelText("Animal Type:");
  const feedsInput = screen.getByLabelText("Number of Feeds:");
  const submitButton = screen.getByRole("button", { name: /Add Pet/i });

  await userEvent.type(nameInput, "Pizza");
  await userEvent.selectOptions(typeSelect, "Dog");
  await userEvent.clear(feedsInput);
  await userEvent.type(feedsInput, "3");

  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Pizza")).toBeInTheDocument();
  });

  const img = screen.getByRole("img", { name: "Pet Pizza" });
  expect(img).toHaveAttribute("src", mockImageUrl);
  expect(mockFetchDogImage).toHaveBeenCalledTimes(1);
});
