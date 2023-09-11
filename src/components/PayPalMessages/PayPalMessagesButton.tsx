import React from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";

import { usePayment } from "../../app/usePayment";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

import { PayPalMessagesMask } from "./PayPalMessagesMask";

export const PayPalMessagesButton: React.FC<PayPalMessagesComponentProps> = (
  props
) => {
  const { paymentInfo } = usePayment();

  useHandleCreatePayment();

  return paymentInfo.id ? <PayPalMessagesMask {...props} /> : <></>;
};
