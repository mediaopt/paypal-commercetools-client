import React, { useEffect, useState } from "react";

import { usePayment } from "../../app/usePayment";
import { CardFieldsMask } from "./CardFieldsMask";
import { CardFieldsProps } from "../../types";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";

export const CardFieldsButton: React.FC<CardFieldsProps> = ({
  enableVaulting,
}) => {
  const { paymentInfo, vaultOnly } = usePayment();
  const [showComponent, setShowComponent] = useState<boolean>(false);
  useHandleCreatePayment();

  useEffect(() => {
    let intervall = setInterval(() => {
      if (!!window.paypal && (paymentInfo.id || vaultOnly)) {
        clearInterval(intervall);
        setShowComponent(true);
      }
    }, 250);
    return () => {
      clearInterval(intervall);
    };
  }, [paymentInfo]);

  return showComponent ? (
    <CardFieldsMask enableVaulting={enableVaulting} />
  ) : (
    <></>
  );
};
