import React from "react";

import { usePayment } from "../../app/usePayment";
import { CardFieldsMask } from "./CardFieldsMask";
import { CardFieldsProps } from "../../types";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

export const CardFieldsButton: React.FC<CardFieldsProps> = ({
  enableVaulting,
}) => {
  const { paymentInfo, vaultOnly } = usePayment();
  useHandleCreatePayment();

  return (paymentInfo.id || vaultOnly) && window.paypal ? (
    <CardFieldsMask enableVaulting={enableVaulting} />
  ) : (
    <></>
  );
};
