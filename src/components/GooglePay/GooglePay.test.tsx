import { render, screen, waitFor } from "@testing-library/react";
import { GooglePay } from "./GooglePay";

import { GooglePayTestParams } from "./constants";

const MockText: string = "GooglePayMask";
jest.mock("./GooglePayMask", () => ({
  GooglePayMask: () => <div>{MockText}</div>,
}));

jest.mock("../../app/loadScript", () => ({
  __esModule: true,
  default: () => Promise.resolve(),
}));

test("GooglePay is shown", async () => {
  render(<GooglePay {...GooglePayTestParams} />);
  await waitFor(() => {
    expect(screen).toBeDefined();
  });
});
