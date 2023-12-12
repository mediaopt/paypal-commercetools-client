import * as React from "react";
import { PayUponInvoiceButton } from "./PayUponInvoiceButton";
import { cleanup, render, screen } from "@testing-library/react";
import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";

jest.mock("react-i18next", () => ({
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
jest.mock("../../app/usePayment");
jest.mock("../../app/useSettings");
jest.mock("../../app/useHandleCreatePayment");
jest.mock("./PayUponInvoiceMask", () => ({
  PayUponInvoiceMask: (
    fraudNetSessionId: string,
    invoiceBenefitsMessage: string | undefined,
  ) => <div>Mocked mask</div>,
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  cleanup();
});

const testButtonProps = {
  minPayableAmount: 5,
  maxPayableAmount: 2500,
  fraudNetSessionId: "123",
};

test("Mask is shown if settings and params are valid", () => {
  (usePayment as jest.Mock).mockReturnValue({
    paymentInfo: { id: "123", amount: 20 },
    clientToken: "123",
  });
  (useSettings as jest.Mock).mockReturnValue({
    settings: { payPalIntent: "Capture" },
  });
  render(<PayUponInvoiceButton {...testButtonProps} />);
  expect(screen.getAllByText("Mocked mask").length).toEqual(1);
});
