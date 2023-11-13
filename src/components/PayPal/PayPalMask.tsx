import React, { useMemo } from "react";
import { PayPalButtons, PayPalMessages } from "@paypal/react-paypal-js";
import { CustomPayPalButtonsComponentProps } from "../../types";

import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { useLoader } from "../../app/useLoader";
import { useNotifications } from "../../app/useNotifications";

export const PayPalMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const { handleCreateOrder, handleOnApprove } = usePayment();
  const { settings } = useSettings();
  const { isLoading } = useLoader();
  const { notify } = useNotifications();
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


  const errorFunc = (err: Record<string, unknown>) => {
    isLoading(false);
    notify("Error", "an error occurred");
    console.error(err);
  };

  return (
    <>
      <PayPalButtons
        {...restprops}
        style={style}
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
        onError={errorFunc}
      />
      {paypalMessages && <PayPalMessages {...paypalMessages} />}
    </>
  );
};
