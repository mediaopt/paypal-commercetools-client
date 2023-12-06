import React from "react";
import { render, screen } from "@testing-library/react";

import { LoaderProvider } from "./useLoader";

test("LoaderProvider is shown", () => {
  render(<LoaderProvider />);
  expect(screen).toBeDefined();
});

test("LoaderProvider is shown", () => {
  render(
    <LoaderProvider>
      <span>test text</span>
    </LoaderProvider>
  );
  expect(screen).toBeDefined();
});

test("test text is shown", () => {
  render(
    <LoaderProvider>
      <span>test text</span>
    </LoaderProvider>
  );
  const linkElement = screen.getAllByText(/test text/i);
  expect(linkElement.length).toEqual(1);
});
