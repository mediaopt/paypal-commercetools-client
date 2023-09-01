import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalButton } from "./PayPalButton";

import { GeneralComponentsProps } from "../../types";

export const PayPal: React.FC<GeneralComponentsProps> = ({
  clientId,
  createPaymentUrl,
  sessionKey,
  sessionValue,
  shippingMethodId,
  cartInformation,
}) => {
  return (
    <RenderTemplate
      clientId={clientId}
      createPaymentUrl={createPaymentUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <PayPalButton />
    </RenderTemplate>
  );
};
