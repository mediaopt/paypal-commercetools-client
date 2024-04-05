import React from "react";
import { GooglePayOptionsType, SmartComponentsProps } from "../../types";
import { RenderTemplate } from "../RenderTemplate";
import { GooglePayButton } from "./GooglePayButton";

export const GooglePay: React.FC<
  SmartComponentsProps & GooglePayOptionsType
> = ({
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
  apiVersion,
  apiVersionMinor,
  allowedCardNetworks,
  allowedCardAuthMethods,
  callbackIntents,
  environment,
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
      <GooglePayButton
        allowedCardAuthMethods={allowedCardAuthMethods}
        allowedCardNetworks={allowedCardNetworks}
        callbackIntents={callbackIntents}
        apiVersion={apiVersion}
        apiVersionMinor={apiVersionMinor}
        environment={environment}
      />
    </RenderTemplate>
  );
};