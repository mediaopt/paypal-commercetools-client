import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export const PayPalMask: React.FC = () => {
  return <PayPalButtons fundingSource="paypal" />;
};
