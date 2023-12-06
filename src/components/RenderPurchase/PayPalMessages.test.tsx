import React from "react";
import { render, screen } from "@testing-library/react";
import { RenderPurchase } from "./RenderPurchase";

test("RenderPurchase is shown", () => {
  render(<RenderPurchase />);
  expect(screen).toBeDefined();
});

test("Custom Text is shown", () => {
  render(<RenderPurchase>Custom Text</RenderPurchase>);
  const linkElement = screen.getAllByText(/Custom Text/i);
  expect(linkElement.length).toEqual(1);
});
