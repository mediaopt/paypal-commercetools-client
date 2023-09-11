import React from "react";
import { PayPalMessages } from "@paypal/react-paypal-js";

import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";

export const PayPalMessagesMask: React.FC<PayPalMessagesComponentProps> = (
  props
) => {
  return <PayPalMessages {...props} />;
};
