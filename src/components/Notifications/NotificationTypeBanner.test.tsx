import React from "react";
import { render, screen } from "@testing-library/react";
import {
  NotificationTypeBanner,
  NotificationTypeBannerProps,
} from "./NotificationTypeBanner";

const params: NotificationTypeBannerProps = {
  type: "Info",
  text: "Custom Text",
  onClose: () => {},
};

test("NotificationTypeBanner is shown", () => {
  render(<NotificationTypeBanner {...params} />);
  expect(screen).toBeDefined();
});

test("Custom Text is shown", () => {
  render(<NotificationTypeBanner {...params} />);
  const linkElement = screen.getAllByText(/Custom Text/i);
  expect(linkElement.length).toEqual(1);
});

test("Information is shown", () => {
  render(<NotificationTypeBanner {...params} />);
  const linkElement = screen.getAllByText(/Information/i);
  expect(linkElement.length).toEqual(1);
});

test("Button is shown", () => {
  render(<NotificationTypeBanner {...params} />);
  const linkElement = screen.getAllByRole("button");
  expect(linkElement.length).toEqual(1);
});
