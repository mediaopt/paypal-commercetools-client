import { render, screen } from "@testing-library/react";
import { ApplePayButton } from "./ApplePayButton";

import { applePayTestParams } from "./constants";

jest.mock("./ApplePayMask", () => ({
  ApplePayMask: () => <div>ApplePayMask</div>,
}));
jest.mock("../../app/usePayment", () => ({
  usePayment: () => {
    return { paymentInfo: { id: "123" } };
  },
}));
jest.mock("../../app/useHandleCreatePayment", () => ({
  useHandleCreatePayment: () => {
    return {};
  },
}));

test("ApplePayButton is shown", () => {
  render(<ApplePayButton {...applePayTestParams} />);
  expect(screen).toBeDefined();

  const applePayMask = screen.getByText("ApplePayMask");
  expect(applePayMask).toBeDefined();
});
