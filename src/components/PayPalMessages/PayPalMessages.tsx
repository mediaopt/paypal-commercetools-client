import React from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalMessagesButton } from "./PayPalMessagesButton";

import { GeneralComponentsProps } from "../../types";

export const PayPalMessages: React.FC<
  GeneralComponentsProps & PayPalMessagesComponentProps
> = ({
  options,
  purchaseCallback,

  createPaymentUrl,
  getSettingsUrl,
  createOrderUrl,
  onApproveUrl,

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
      getSettingsUrl={getSettingsUrl}
      createOrderUrl={createOrderUrl}
      onApproveUrl={onApproveUrl}
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
      purchaseCallback={purchaseCallback}
    >
      <PayPalMessagesButton {...buttonProps} />
    </RenderTemplate>
  );
};
