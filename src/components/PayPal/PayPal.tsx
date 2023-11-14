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
  authorizeOrderUrl,
  getUserInfoUrl,

  createVaultSetupTokenUrl,
  approveVaultSetupTokenUrl,

  requestHeader,
  shippingMethodId,
  cartInformation,
  purchaseCallback,
  enableVaulting,

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
      purchaseCallback={purchaseCallback}
      authorizeOrderUrl={authorizeOrderUrl}
      getUserInfoUrl={getUserInfoUrl}
      enableVaulting={enableVaulting}
      createVaultSetupTokenUrl={createVaultSetupTokenUrl}
      approveVaultSetupTokenUrl={approveVaultSetupTokenUrl}
    >
      <PayPalButton {...buttonProps} />
    </RenderTemplate>
  );
};
