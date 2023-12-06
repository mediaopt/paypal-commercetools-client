import React from "react";
import { render, screen } from "@testing-library/react";
import { PayPalMessages } from "./PayPalMessages";

import { testParams, testRequestHeader, testOptions } from "../../constants";

const params = {
  requestHeader: testRequestHeader,
  ...testParams,
  options: { ...testOptions, components: "messages" },
};

test("PayPalMessages is shown", () => {
  render(<PayPalMessages {...params} />);
  expect(screen).toBeDefined();
});
