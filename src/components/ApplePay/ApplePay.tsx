import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { ApplePayButton } from "./ApplePayButton";

import { ApplePayComponentsProps } from "../../types";

export const ApplePay: React.FC<ApplePayComponentsProps> = ({
  options,

  createPaymentUrl,
  getSettingsUrl,
  createOrderUrl,
  authorizeOrderUrl,
  getUserInfoUrl,

  onApproveUrl,
  onApproveRedirectionUrl,

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
      onApproveRedirectionUrl={onApproveRedirectionUrl}
    >
      <ApplePayButton {...buttonProps} enableVaulting={enableVaulting} />
    </RenderTemplate>
  );
};
