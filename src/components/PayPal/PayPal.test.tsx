import React from "react";
import { render, screen } from "@testing-library/react";
import { PayPal } from "./PayPal";
import { FUNDING_SOURCE } from "@paypal/paypal-js";

import { testParams, testRequestHeader, testOptions } from "../../constants";

const params = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: testOptions,
  fundingSource: "paypal" as FUNDING_SOURCE,
};

test("PayPal is shown", () => {
  render(<PayPal {...params} />);
  expect(screen).toBeDefined();
});
