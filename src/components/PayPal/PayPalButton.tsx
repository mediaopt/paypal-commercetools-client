import React from "react";

import { usePayment } from "../../app/usePayment";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

import { PayPalMask } from "./PayPalMask";

export const PayPalButton: React.FC = ({}) => {
  const { paymentInfo } = usePayment();

  useHandleCreatePayment();

  return paymentInfo.id ? <PayPalMask /> : <></>;
};
