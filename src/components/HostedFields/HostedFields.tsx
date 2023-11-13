import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { HostedFieldsButton } from "./HostedFieldsButton";

import { SmartComponentsProps } from "../../types";

export const HostedFields: React.FC<SmartComponentsProps> = ({
  options,
  getSettingsUrl,
  createPaymentUrl,
  requestHeader,
  getClientTokenUrl,
  getUserIdTokenUrl,
  shippingMethodId,
  cartInformation,
  createOrderUrl,
  onApproveUrl,
  purchaseCallback,
  enableVaulting,
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
      enableVaulting={enableVaulting}
      getUserIdTokenUrl={getUserIdTokenUrl}
    >
      <HostedFieldsButton options={options} enableVaulting={enableVaulting} />
    </RenderTemplate>
  );
};
