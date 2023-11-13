import React, { useMemo } from "react";
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

  const style = useMemo(() => {
    if (restprops.style || !settings) {
      return restprops.style;
    }
    if (
      settings.paypalButtonConfig &&
      settings.buttonTagline &&
      settings.buttonShape
    ) {
      return {
        color: settings.paypalButtonConfig.buttonColor,
        label: settings.paypalButtonConfig.buttonLabel,
        tagline: settings.buttonTagline,
        shape: settings.buttonShape,
      };
    }
    return restprops.style;
  }, [settings, restprops]);

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
