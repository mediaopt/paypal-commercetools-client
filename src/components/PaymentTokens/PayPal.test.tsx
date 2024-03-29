import React from "react";
import { render, screen } from "@testing-library/react";
import { PayPal, PayPalProps } from "./PayPal";

const params: PayPalProps = {
  email_address: "test@gmail.com",
};

test("PayPal is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <PayPal {...params} />
        </tr>
      </tbody>
    </table>,
  );
  expect(screen).toBeDefined();
});

test("Text is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <PayPal {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByText(/test@gmail.com/i);
  expect(linkElement.length).toEqual(1);
});

test("Expiry is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <PayPal {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByText(/N\/A/i);
  expect(linkElement.length).toEqual(1);
});

test("Logo is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <PayPal {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByRole("img");
  expect(linkElement.length).toEqual(1);
});
