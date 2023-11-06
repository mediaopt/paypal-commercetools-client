import React from "react";
import { PayPalButtons, PayPalMessages } from "@paypal/react-paypal-js";
import { CustomPayPalButtonsComponentProps } from "../../types";

import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";

export const PayPalMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const { handleCreateOrder, handleOnApprove } = usePayment();
  const { settings } = useSettings();
  const { paypalMessages, ...restprops } = props;

  if (!settings) {
    return <></>;
  }

  const style = {
    color: settings.paypalButtonConfig.buttonColor,
    label: settings.paypalButtonConfig.buttonLabel,
    tagline: settings.buttonTagline,
    shape: settings.buttonShape,
  };
  return (
    <>
      <PayPalButtons
        {...restprops}
        style={style}
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
      />
      {paypalMessages && <PayPalMessages {...paypalMessages} />}
    </>
  );
};
