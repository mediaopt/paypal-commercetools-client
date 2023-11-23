import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { CardFieldsButton } from "./CardFieldsButton";

import { SmartComponentsProps } from "../../types";

export const CardFields: React.FC<SmartComponentsProps> = ({
  options,
  getSettingsUrl,
  createPaymentUrl,
  requestHeader,
  getClientTokenUrl,
  getUserInfoUrl,
  shippingMethodId,
  cartInformation,
  createOrderUrl,
  onApproveUrl,
  purchaseCallback,
  enableVaulting,
  authenticateThreeDSOrderUrl,
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
      getUserInfoUrl={getUserInfoUrl}
      authenticateThreeDSOrderUrl={authenticateThreeDSOrderUrl}
    >
      <CardFieldsButton enableVaulting={enableVaulting} />
    </RenderTemplate>
  );
};
