import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { NotificationsProvider, useNotifications } from "./useNotifications";

test("NotificationsProvider is shown", () => {
  render(<NotificationsProvider />);
  expect(screen).toBeDefined();
});

test("NotificationsProvider is shown", () => {
  render(
    <NotificationsProvider>
      <span>test text</span>
    </NotificationsProvider>
  );
  expect(screen).toBeDefined();
});

test("NotificationsProvider is shown text", () => {
  render(
    <NotificationsProvider>
      <span>test text</span>
    </NotificationsProvider>
  );
  const linkElement = screen.getAllByText(/test text/i);
  expect(linkElement.length).toEqual(1);
});

test("useNotifications check notify", () => {
  const { result } = renderHook(useNotifications);
  expect(result.current.notify).toBeTruthy();
});
