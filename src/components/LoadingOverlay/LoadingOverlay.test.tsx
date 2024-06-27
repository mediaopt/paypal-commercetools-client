import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingOverlay } from "./LoadingOverlay";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

test("HostedFields is shown", () => {
  render(<LoadingOverlay />);
  expect(screen).toBeDefined();
});

test("Custom Text is shown", () => {
  render(<LoadingOverlay loadingText="Custom Text" />);
  const linkElement = screen.getAllByText(/Custom Text/i);
  expect(linkElement.length).toEqual(1);
});
