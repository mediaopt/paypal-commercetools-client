import React from "react";
import { render, screen } from "@testing-library/react";
import { HostedFieldsMask } from "./HostedFieldsMask";

import { testParams, testRequestHeader, testOptions } from "../../constants";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));
jest.mock("../../app/useSettings", () => {
  return {
    useSettings: () => {
      return {
        settings: { key: "value", payPalIntent: "capture" },
      };
    },
  };
});

jest.mock("../../app/usePayment", () => {
  return {
    usePayment: () => {
      return {
        clientToken: "test",
      };
    },
  };
});

const params = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: {
    ...testOptions,
    components: "hosted-fields,buttons",
    vault: false,
  },
};

test("HostedFieldsMask is shown", () => {
  render(<HostedFieldsMask {...params} />);
  expect(screen).toBeDefined();
});

test("Card Number is shown", () => {
  render(<HostedFieldsMask {...params} />);
  const linkElement = screen.getAllByText(/Card Number/i);
  expect(linkElement.length).toEqual(1);
});

test("CVV is shown", () => {
  render(<HostedFieldsMask {...params} />);
  const linkElement = screen.getAllByText(/CVV/i);
  expect(linkElement.length).toEqual(1);
});

test("Expiration Date is shown", () => {
  render(<HostedFieldsMask {...params} />);
  const linkElement = screen.getAllByText(/Expiration Date/i);
  expect(linkElement.length).toEqual(1);
});
