import { render, screen } from "@testing-library/react";
import { GooglePay } from "./GooglePay";

import { GooglePayTestParams } from "./constants";

test("GooglePay is shown", () => {
  render(<GooglePay {...GooglePayTestParams} />);
  expect(screen).toBeDefined();
});
