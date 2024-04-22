import { render, screen } from "@testing-library/react";
import { ApplePay } from "./ApplePay";

import { applePayTestParams } from "./constants";

test("ApplePay is shown", () => {
  render(<ApplePay {...applePayTestParams} />);
  expect(screen).toBeDefined();
});
