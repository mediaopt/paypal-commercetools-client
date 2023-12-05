import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { PaymentProvider, usePayment } from "./usePayment";

import { testParams, testRequestHeader, testOptions } from "../constants";

jest.mock("react-i18next", () => {
  return {
    useTranslation: () => {
      return {
        t: (key: string) => key,
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

test("PaymentProvider is shown", () => {
  render(<PaymentProvider {...params} />);
  expect(screen).toBeDefined();
});

test("PaymentProvider is shown", () => {
  render(
    <PaymentProvider {...params}>
      <span>test text</span>
    </PaymentProvider>
  );
  expect(screen).toBeDefined();
});

test("PaymentProvider is shown text", () => {
  render(
    <PaymentProvider {...params}>
      <span>test text</span>
    </PaymentProvider>
  );
  const linkElement = screen.getAllByText(/test text/i);
  expect(linkElement.length).toEqual(1);
});

test("useNotifications check initial values", () => {
  const render = renderHook(usePayment);

  expect(render.result.current.clientToken).toBe("");
  expect(render.result.current.handleApproveVaultSetupToken).toBeTruthy();
  expect(render.result.current.handleCreateOrder).toBeTruthy();
  expect(render.result.current.handleCreatePayment).toBeTruthy();
  expect(render.result.current.handleCreateVaultSetupToken).toBeTruthy();
  expect(render.result.current.handleOnApprove).toBeTruthy();
  expect(render.result.current.oderDataLinks).toBeUndefined();
  expect(render.result.current.orderId).toBeUndefined();
  expect(render.result.current.paymentInfo).toBeTruthy();
  expect(render.result.current.requestHeader).toBeTruthy();
  expect(render.result.current.setSuccess).toBeTruthy();
  expect(render.result.current.vaultOnly).toBe(false);
});
