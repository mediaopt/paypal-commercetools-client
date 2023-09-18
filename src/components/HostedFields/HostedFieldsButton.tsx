import React, { useEffect } from "react";

import { usePayment } from "../../app/usePayment";
import { HostedFieldsMask } from "./HostedFieldsMask";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { HostedFieldsProps } from "../../types";

export const HostedFieldsButton: React.FC<HostedFieldsProps> = ({
  options,
}) => {
  // const { paymentInfo } = usePayment();
  useHandleGetClientToken(false);
  const { clientToken } = usePayment();

  useEffect(() => {
    console.log("change");
    console.log(!!clientToken);
  }, [clientToken]);

  // useHandleCreatePayment();
  // return paymentInfo.id ? <HostedFieldsMask /> : <></>;
  return clientToken ? <HostedFieldsMask options={options} /> : <></>;
};
