import React from "react";
import { render, screen } from "@testing-library/react";
import { SubmitPayment } from "./SubmitPayment";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

test("SubmitPayment is shown", () => {
  render(<SubmitPayment enableVaulting={false} handleSaveCard={(e) => {}} />);
  expect(screen).toBeDefined();
});

test("Card Holder Name is shown", () => {
  render(<SubmitPayment enableVaulting={false} handleSaveCard={(e) => {}} />);
  const linkElement = screen.getAllByText(/Card Holder Name/i);
  expect(linkElement.length).toEqual(1);
});

test("Save this card for future purchases is shown", () => {
  render(<SubmitPayment enableVaulting={true} handleSaveCard={(e) => {}} />);
  const linkElement = screen.getAllByText(
    /Save this card for future purchases/i,
  );
  expect(linkElement.length).toEqual(1);
});

test("Pay is shown", () => {
  render(<SubmitPayment enableVaulting={false} handleSaveCard={(e) => {}} />);
  const linkElement = screen.getAllByText(/Pay/i);
  expect(linkElement.length).toEqual(1);
});
