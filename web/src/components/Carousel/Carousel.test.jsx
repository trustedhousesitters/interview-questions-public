import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

const mockItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

const mockRenderItem = (item) => <div>{item.name}</div>;

test("renders carousel with first item by default", () => {
  const { getByText, container } = render(
    <Carousel items={mockItems} renderItem={mockRenderItem} />
  );
  
  expect(container.querySelector(".carousel")).toBeInTheDocument();
  expect(getByText("Item 1")).toBeInTheDocument();
});

test("returns null when no items provided", () => {
  const { container } = render(
    <Carousel items={[]} renderItem={mockRenderItem} />
  );
  
  expect(container.querySelector(".carousel")).not.toBeInTheDocument();
});

test("navigates between items and loops infinitely", () => {
  const { getByLabelText, getByText } = render(
    <Carousel items={mockItems} renderItem={mockRenderItem} />
  );
  
  // Start at Item 1
  expect(getByText("Item 1")).toBeInTheDocument();
  
  // Next to Item 2
  fireEvent.click(getByLabelText("Next slide"));
  expect(getByText("Item 2")).toBeInTheDocument();
  
  // Previous back to Item 1
  fireEvent.click(getByLabelText("Previous slide"));
  expect(getByText("Item 1")).toBeInTheDocument();
  
  // Previous should loop to Item 3
  fireEvent.click(getByLabelText("Previous slide"));
  expect(getByText("Item 3")).toBeInTheDocument();
  
  // Next should loop back to Item 1
  fireEvent.click(getByLabelText("Next slide"));
  expect(getByText("Item 1")).toBeInTheDocument();
});
