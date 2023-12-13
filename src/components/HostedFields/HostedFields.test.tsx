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

jest.mock("react-i18next", () => ({
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

test("HostedFields is shown", () => {
  render(<HostedFields {...params} />);
  expect(screen).toBeDefined();
});
