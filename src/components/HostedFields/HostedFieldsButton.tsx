import React from "react";

import { usePayment } from "../../app/usePayment";
import { HostedFieldsMask } from "./HostedFieldsMask";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { HostedFieldsProps } from "../../types";

export const HostedFieldsButton: React.FC<HostedFieldsProps> = ({
  options,
  threeDSAuth,
}) => {
  useHandleGetClientToken(false);
  const { clientToken } = usePayment();

  return clientToken ? (
    <HostedFieldsMask threeDSAuth={threeDSAuth} options={options} />
  ) : (
    <></>
  );
};
