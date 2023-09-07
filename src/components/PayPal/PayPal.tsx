import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalButton } from "./PayPalButton";

import { SmartComponentsProps } from "../../types";

export const PayPal: React.FC<SmartComponentsProps> = ({
  clientId,
  createPaymentUrl,
  sessionKey,
  sessionValue,
  shippingMethodId,
  cartInformation,
  ...restProps
}) => {
  const buttonProps = restProps ?? undefined;
  return (
    <RenderTemplate
      clientId={clientId}
      createPaymentUrl={createPaymentUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <PayPalButton {...buttonProps} />
    </RenderTemplate>
  );
};
