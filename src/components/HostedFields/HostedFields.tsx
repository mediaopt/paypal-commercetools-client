import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { HostedFieldsButton } from "./HostedFieldsButton";

import { HostedFieldsSmartComponentProps } from "../../types";
import { getClientToken } from "../../services/getClientToken";

export const HostedFields: React.FC<HostedFieldsSmartComponentProps> = ({
  options,
  getSettingsUrl,
  createPaymentUrl,
  requestHeader,
  getClientTokenUrl,
  shippingMethodId,
  cartInformation,
  theeDSAuth,
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
    >
      <HostedFieldsButton options={options} threeDSAuth={theeDSAuth} />
    </RenderTemplate>
  );
};
