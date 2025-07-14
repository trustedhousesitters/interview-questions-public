import { render } from "@testing-library/react";
import CarouselItem from "./CarouselItem";

const mockedListing = {
  id: 1,
  name: "Lovely Dog, Lovely House",
  dates: "Sep 04, 2025 - Sep 20, 2025",
  location: "Penarth, United Kingdom",
  imageUrl: "/ListingPlaceholders/house-01.webp",
  imageAlt: "house",
  pets: [
    {
      count: 1,
      type: "Dog",
    },
  ],
};

test("renders a single pet", () => {
  const singlePetListing = {
    ...mockedListing,
    pets: [
      {
        count: 1,
        type: "Dog",
      },
    ],
  };
  const screen = render(<CarouselItem listing={singlePetListing} />);
  const petsList = screen.getByTestId("pets-list");

  expect(screen.getByTestId("carousel-slide")).toBeInTheDocument();
  expect(screen.getByAltText(singlePetListing.imageAlt)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: singlePetListing.name })
  ).toBeInTheDocument();
  expect(screen.getByText(singlePetListing.dates)).toBeInTheDocument();
  expect(screen.getByText(singlePetListing.location)).toBeInTheDocument();

  expect(petsList).toBeInTheDocument();
  expect(petsList.children).toHaveLength(1);
});

test("renders multiple pets", () => {
  const multiPetListing = {
    ...mockedListing,
    pets: [
      {
        count: 2,
        type: "Cat",
      },
      {
        count: 2,
        type: "Dog",
      },
    ],
  };
  const screen = render(<CarouselItem listing={multiPetListing} />);
  const petsList = screen.getByTestId("pets-list");

  expect(screen.getByTestId("carousel-slide")).toBeInTheDocument();
  expect(screen.getByAltText(multiPetListing.imageAlt)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: multiPetListing.name })
  ).toBeInTheDocument();
  expect(screen.getByText(multiPetListing.dates)).toBeInTheDocument();
  expect(screen.getByText(multiPetListing.location)).toBeInTheDocument();

  expect(petsList).toBeInTheDocument();
  expect(petsList.children).toHaveLength(2);
});
