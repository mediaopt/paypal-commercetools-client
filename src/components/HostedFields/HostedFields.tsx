import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { HostedFieldsButton } from "./HostedFieldsButton";

import { SmartComponentsProps } from "../../types";
import { getClientToken } from "../../services/getClientToken";

export const HostedFields: React.FC<SmartComponentsProps> = ({
  options,
  getSettingsUrl,
  createPaymentUrl,
  requestHeader,
  getClientTokenUrl,
  shippingMethodId,
  cartInformation,
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
      <HostedFieldsButton options={options} />
    </RenderTemplate>
  );
};
