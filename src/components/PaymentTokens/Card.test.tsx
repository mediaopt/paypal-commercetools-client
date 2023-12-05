import React from "react";
import { render, screen } from "@testing-library/react";
import { Card, CardProps } from "./Card";

const params: CardProps = {
  id: "1",
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
    </table>
  );
  expect(screen).toBeDefined();
});

test("Text is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>
  );
  const linkElement = screen.getAllByText(/visa ending in 1234/i);
  expect(linkElement.length).toEqual(1);
});

test("Image is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>
  );
  const linkElement = screen.getAllByRole("img");
  expect(linkElement.length).toEqual(1);
});

test("Button is shown", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Card {...params} />
        </tr>
      </tbody>
    </table>
  );
  const linkElement = screen.getAllByRole("button");
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
    </table>
  );
  const linkElement = screen.getAllByText(/12\/2020/i);
  expect(linkElement.length).toEqual(1);
});
