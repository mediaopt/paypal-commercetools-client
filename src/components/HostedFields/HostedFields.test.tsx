import React from "react";
import { render, screen } from "@testing-library/react";
import { HostedFields } from "./HostedFields";

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

test("HostedFields is shown", () => {
  render(<HostedFields {...params} />);
  expect(screen).toBeDefined();
});
