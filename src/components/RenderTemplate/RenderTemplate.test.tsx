import React from "react";
import { render, screen } from "@testing-library/react";
import { RenderTemplate } from "./RenderTemplate";

import { testParams, testRequestHeader, testOptions } from "../../constants";

const params = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: testOptions,
};

test("RenderTemplate is shown", () => {
  render(<RenderTemplate {...params} />);
  expect(screen).toBeDefined();
});
