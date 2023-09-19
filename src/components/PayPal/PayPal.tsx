import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalButton } from "./PayPalButton";

import { SmartComponentsProps } from "../../types";

export const PayPal: React.FC<SmartComponentsProps> = ({
  options,

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
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
      createPaymentUrl={createPaymentUrl}
      createOrderUrl={createOrderUrl}
      onApproveUrl={onApproveUrl}
      getSettingsUrl={getSettingsUrl}
    >
      <PayPalButton {...buttonProps} />
    </RenderTemplate>
  );
};
