import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { PaymentTokensList } from "./PaymentTokensList";

import { SmartComponentsProps } from "../../types";

export const PaymentTokens: React.FC<SmartComponentsProps> = ({
  options,

  createPaymentUrl,
  getSettingsUrl,
  createOrderUrl,
  onApproveUrl,
  authorizeOrderUrl,
  getUserInfoUrl,
  removePaymentTokenUrl,

  requestHeader,
  shippingMethodId,
  cartInformation,
  purchaseCallback,
  enableVaulting,
}) => {
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
      purchaseCallback={purchaseCallback}
      authorizeOrderUrl={authorizeOrderUrl}
      getUserInfoUrl={getUserInfoUrl}
      enableVaulting={enableVaulting}
      removePaymentTokenUrl={removePaymentTokenUrl}
    >
      <PaymentTokensList />
    </RenderTemplate>
  );
};
