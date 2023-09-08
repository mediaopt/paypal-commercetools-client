import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { TestButtonMask } from "./TestButtonMask";

import { GeneralComponentsProps } from "../../types";

export const TestButton: React.FC<GeneralComponentsProps> = ({
  options,
  createPaymentUrl,
  sessionKey,
  sessionValue,
  shippingMethodId,
  cartInformation,
}) => {
  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <TestButtonMask />
    </RenderTemplate>
  );
};
