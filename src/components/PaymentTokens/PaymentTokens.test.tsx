import React from "react";
import { render, screen } from "@testing-library/react";
import { PaymentTokens } from "./PaymentTokens";

import { testParams, testRequestHeader, testOptions } from "../../constants";

const params = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: {
    ...testOptions,
    components: "hosted-fields,buttons",
    vault: false,
  },
};

test("PaymentTokens is shown", () => {
  render(<PaymentTokens {...params} />);
  expect(screen).toBeDefined();
});
