import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { HostedFieldsButton } from "./HostedFieldsButton";

import { SmartComponentsProps } from "../../types";

export const HostedFields: React.FC<SmartComponentsProps> = ({
  options,

  createPaymentUrl,
  sessionKey,
  sessionValue,
  shippingMethodId,
  cartInformation,
  ...restProps
}) => {
  const buttonProps = restProps ?? undefined;
  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      sessionKey={sessionKey}
      sessionValue={sessionValue}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
    >
      <HostedFieldsButton options={options} />
    </RenderTemplate>
  );
};
