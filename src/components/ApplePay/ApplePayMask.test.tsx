import { render, screen, waitFor } from "@testing-library/react";
import { ApplePayMask } from "./ApplePayMask";

import { applePayTestParams, DEVICE_ERROR } from "./constants";

jest.mock("../../app/loadScript", () => ({
  __esModule: true,
  default: () => Promise.resolve(),
}));

test("ApplePayMask is shown", async () => {
  render(<ApplePayMask {...applePayTestParams} />);
  await waitFor(() => {
    expect(screen).toBeDefined();

    expect(screen.getByText(DEVICE_ERROR)).toBeDefined();
  });
});
