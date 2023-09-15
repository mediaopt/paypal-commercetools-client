import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { TestButtonMask } from "./TestButtonMask";

import { GeneralComponentsProps } from "../../types";

export const TestButton: React.FC<GeneralComponentsProps> = ({
  options,
  createPaymentUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
}) => {
  return (
    <RenderTemplate
      options={options}
      requestHeader={requestHeader}
      createPaymentUrl={createPaymentUrl}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <TestButtonMask />
    </RenderTemplate>
  );
};
