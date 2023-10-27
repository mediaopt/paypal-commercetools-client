import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("TestButton is shown", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/TestButton/i);
  expect(linkElement.length).toEqual(1);
});

test("PayPal is shown", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/PayPal/i);
  expect(linkElement.length).toEqual(4);
});

test("PayPalMessages is shown", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/PayPalMessages/i);
  expect(linkElement.length).toEqual(1);
});

test("HostedFields is shown", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/HostedFields/i);
  expect(linkElement.length).toEqual(1);
});