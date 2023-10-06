import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { HostedFieldsButton } from "./HostedFieldsButton";

import { HostedFieldsSmartComponentProps } from "../../types";

export const HostedFields: React.FC<HostedFieldsSmartComponentProps> = ({
  options,
  getSettingsUrl,
  createPaymentUrl,
  requestHeader,
  getClientTokenUrl,
  shippingMethodId,
  cartInformation,
  createOrderUrl,
  onApproveUrl,
  purchaseCallback,
  threeDSAuth,
  ...restProps
}) => {
  const buttonProps = restProps ?? undefined;
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
    >
      <HostedFieldsButton options={options} threeDSAuth={threeDSAuth} />
    </RenderTemplate>
  );
};
