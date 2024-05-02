import { render, screen, waitFor } from "@testing-library/react";
import { GooglePayTestParams } from "./constants";
import { GooglePayMask } from "./GooglePayMask";

jest.mock("../../app/loadScript", () => ({
  __esModule: true,
  default: () => Promise.resolve(),
}));

jest.mock("./GooglePayMask", () => ({
  GooglePayMask: () => <div>mock</div>,
}));

test("GooglePayMask is shown", async () => {
  render(<GooglePayMask {...GooglePayTestParams} />);
  await waitFor(() => {
    expect(screen).toBeDefined();
  });
});
