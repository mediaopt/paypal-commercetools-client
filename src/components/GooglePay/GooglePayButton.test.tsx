import { render, screen } from "@testing-library/react";
import { GooglePayTestParams } from "./constants";
import { GooglePayMask } from "./GooglePayMask";

const MockText: string = "GooglePayMask";
jest.mock("./GooglePayMask", () => ({
  GooglePayMask: () => <div>{MockText}</div>,
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

test("GooglePayButton is shown", () => {
  render(<GooglePayMask {...GooglePayTestParams} />);
  expect(screen).toBeDefined();

  const googlePayMask = screen.getByText(MockText);
  expect(googlePayMask).toBeDefined();
});
