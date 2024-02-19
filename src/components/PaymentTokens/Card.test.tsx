import React from "react";
import { render, screen } from "@testing-library/react";
import { Card, CardProps } from "./Card";

const params: CardProps = {
  name: "Ursula Meerfrau",
  brand: "visa",
  last_digits: "1234",
  expiry: "12/2020",
};

test("Card is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>,
  );
  expect(screen).toBeDefined();
});

test("Last digits are shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByText(/••• 1234/i);
  expect(linkElement.length).toEqual(1);
});

test("Expiry is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByText(/12\/2020/i);
  expect(linkElement.length).toEqual(1);
});

test("Name is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByText(/Ursula Meerfrau/i);
  expect(linkElement.length).toEqual(1);
});

test("Brand is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>,
  );
  const linkElement = screen.getAllByRole("img");
  expect(linkElement.length).toEqual(1);
});
