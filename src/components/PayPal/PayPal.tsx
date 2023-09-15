import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalButton } from "./PayPalButton";

import { SmartComponentsProps } from "../../types";

export const PayPal: React.FC<SmartComponentsProps> = ({
  options,

  createPaymentUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
  ...restProps
}) => {
  const buttonProps = restProps ?? undefined;
  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <PayPalButton {...buttonProps} />
    </RenderTemplate>
  );
};
