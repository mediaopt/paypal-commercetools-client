import React from "react";
import { render, screen } from "@testing-library/react";
import { CardFields } from "./CardFields";

import { testParams, testRequestHeader, testOptions } from "../../constants";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

const params = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: {
    ...testOptions,
    components: "card-fields,buttons",
    vault: false,
  },
};

test("CardFields is shown", () => {
  render(<CardFields {...params} />);
  expect(screen).toBeDefined();
});
