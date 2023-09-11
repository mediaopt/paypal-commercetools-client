import React from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalMessagesButton } from "./PayPalMessagesButton";

import { GeneralComponentsProps } from "../../types";

export const PayPalMessages: React.FC<
  GeneralComponentsProps & PayPalMessagesComponentProps
> = ({
  options,

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
      options={options}
      createPaymentUrl={createPaymentUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <PayPalMessagesButton {...buttonProps} />
    </RenderTemplate>
  );
};
