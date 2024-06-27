import React from "react";
import { render, screen } from "@testing-library/react";
import { PaymentTokensList } from "./PaymentTokensList";

jest.mock("../../app/useSettings", () => {
  return {
    useSettings: () => {
      return {
        paymentTokens: {
          customer: { id: "testCustomer" },
          payment_tokens: [
            {
              id: "testID-1",
              customer: { id: "testCustomer" },
              payment_source: {
                card: {
                  name: "testName",
                  last_digits: "testLastDigits",
                  brand: "testBrand",
                },
              },
            },
            {
              id: "testID-2",
              customer: { id: "testCustomer" },
              payment_source: {
                paypal: {
                  email_address: "testEmail@test.com",
                },
              },
            },
          ],
        },
      };
    },
  };
});

test("PaymentTokensList is shown", () => {
  render(<PaymentTokensList />);
  expect(screen).toBeDefined();
});

test("Method is shown", () => {
  render(<PaymentTokensList />);
  const linkElement = screen.getAllByText(/Method/i);
  expect(linkElement.length).toEqual(1);
});

test("Expires is shown", () => {
  render(<PaymentTokensList />);
  const linkElement = screen.getAllByText(/Expires/i);
  expect(linkElement.length).toEqual(1);
});

test("Buttons are shown", () => {
  render(<PaymentTokensList />);
  const linkElement = screen.getAllByRole("button");
  expect(linkElement.length).toEqual(2);
});
