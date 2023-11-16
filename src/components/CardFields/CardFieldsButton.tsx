import React from "react";

import { usePayment } from "../../app/usePayment";
import { CardFieldsMask } from "./CardFieldsMask";
import { HostedFieldsProps } from "../../types";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

export const CardFieldsButton: React.FC<HostedFieldsProps> = ({
  options,
  enableVaulting,
}) => {
  const { paymentInfo } = usePayment();
  useHandleCreatePayment();

  return paymentInfo.id && window.paypal ? (
    <CardFieldsMask options={options} enableVaulting={enableVaulting} />
  ) : (
    <></>
  );
};
