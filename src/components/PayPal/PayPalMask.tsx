import React from "react";
import { PayPalButtons, PayPalMessages } from "@paypal/react-paypal-js";
import { CustomPayPalButtonsComponentProps } from "../../types";

import { usePayment } from "../../app/usePayment";

export const PayPalMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const { handleCreateOrder, handleOnApprove } = usePayment();
  const { paypalMessages, ...restprops } = props;
  return (
    <>
      <PayPalButtons
        {...restprops}
        forceReRender={[props]}
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
      />
      {paypalMessages && <PayPalMessages {...paypalMessages} />}
    </>
  );
};
