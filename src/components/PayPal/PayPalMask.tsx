import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

export const PayPalMask: React.FC<PayPalButtonsComponentProps> = (props) => {
  return <PayPalButtons {...props} forceReRender={[props]} />;
};
