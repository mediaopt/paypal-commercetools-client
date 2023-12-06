import React from "react";
import { render, screen } from "@testing-library/react";
import HostedFieldsInvalid from "./HostedFieldsInvalid";

test("* is shown", () => {
  render(<HostedFieldsInvalid />);
  const linkElement = screen.getAllByText(/\*/i);
  expect(linkElement.length).toEqual(1);
});
