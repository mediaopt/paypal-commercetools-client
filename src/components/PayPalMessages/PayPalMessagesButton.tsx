import React from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";

import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

import { PayPalMessagesMask } from "./PayPalMessagesMask";

export const PayPalMessagesButton: React.FC<PayPalMessagesComponentProps> = (
  props
) => {
  useHandleCreatePayment();

  return <PayPalMessagesMask {...props} />;
};
