import React from "react";
import { PayPalButtons, PayPalMessages } from "@paypal/react-paypal-js";
import { CustomPayPalButtonsComponentProps } from "../../types";

import { usePayment } from "../../app/usePayment";
import { useLoader } from "../../app/useLoader";
import { useNotifications } from "../../app/useNotifications";

export const PayPalMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const { handleCreateOrder, handleOnApprove } = usePayment();
  const { isLoading } = useLoader();
  const { notify } = useNotifications();
  const { paypalMessages, ...restprops } = props;

  const errorFunc = (err: Record<string, unknown>) => {
    isLoading(false);
    notify("Error", "an error occurred");
    console.error(err);
  };

  return (
    <>
      <PayPalButtons
        {...restprops}
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
        onError={errorFunc}
      />
      {paypalMessages && <PayPalMessages {...paypalMessages} />}
    </>
  );
};
