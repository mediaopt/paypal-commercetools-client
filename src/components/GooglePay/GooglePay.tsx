import React from "react";
import { SmartComponentsProps } from "../../types";
import { RenderTemplate } from "../RenderTemplate";
import { GooglePayButton } from "./GooglePayButton";

export const GooglePay: React.FC<SmartComponentsProps> = ({
  options,
  createPaymentUrl,
  getSettingsUrl,
  getClientTokenUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
  createOrderUrl,
  onApproveUrl,
  purchaseCallback,
  getUserInfoUrl,
  authorizeOrderUrl,
}) => {
  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      getSettingsUrl={getSettingsUrl}
      getClientTokenUrl={getClientTokenUrl}
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
      createOrderUrl={createOrderUrl}
      onApproveUrl={onApproveUrl}
      purchaseCallback={purchaseCallback}
      getUserInfoUrl={getUserInfoUrl}
      authorizeOrderUrl={authorizeOrderUrl}
    >
      <GooglePayButton />
    </RenderTemplate>
  );
};
