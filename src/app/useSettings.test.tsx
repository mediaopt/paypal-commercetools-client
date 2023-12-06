import React from "react";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { SettingsProvider, useSettings } from "./useSettings";
import { testParams, testRequestHeader, testOptions } from "../constants";

const params = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: {
    ...testOptions,
    components: "hosted-fields,buttons",
    vault: false,
  },
};

test("SettingsProvider is shown", () => {
  render(<SettingsProvider {...params} />);
  expect(screen).toBeDefined();
});

test("SettingsProvider is shown", () => {
  render(
    <SettingsProvider {...params}>
      <span>test text</span>
    </SettingsProvider>
  );
  expect(screen).toBeDefined();
});

test("useNotifications check initial values", () => {
  const render = renderHook(useSettings);

  expect(render.result.current.handleGetSettings).toBeTruthy();
  expect(render.result.current.handleRemovePaymentToken).toBeTruthy();
  expect(render.result.current.paymentTokens).toBeTruthy();
  expect(render.result.current.settings).toBeUndefined();
});
