import React from "react";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

import { usePayment } from "../../app/usePayment";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

import { ApplePayMask } from "./ApplePayMask";

import { ApplePayProps } from "../../types";

type CustomPayPalButtonsComponentProps = ApplePayProps &
  PayPalButtonsComponentProps & {
    enableVaulting?: boolean;
  };

export const ApplePayButton: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const { paymentInfo } = usePayment();
  useHandleCreatePayment();
  return paymentInfo.id ? <ApplePayMask {...props} /> : <></>;
};
