import React, { useEffect, useState } from "react";

import { usePayment } from "../../app/usePayment";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";
import loadScript from "../../app/loadScript";
import { GooglePayMask } from "./GooglePayMask";
import { useLoader } from "../../app/useLoader";
import { GooglePayOptionsType } from "../../types";

export const GooglePayButton: React.FC<GooglePayOptionsType> = ({
  apiVersion,
  apiVersionMinor,
  allowedCardNetworks,
  allowedCardAuthMethods,
  callbackIntents,
  environment,
}) => {
  const { isLoading } = useLoader();
  const scriptUrl: string = "https://pay.google.com/gp/p/js/pay.js";
  const { paymentInfo } = usePayment();
  const [showComponent, setShowComponent] = useState<boolean>(false);
  useHandleCreatePayment();

  useEffect(() => {
    isLoading(true);
    let intervall = setInterval(() => {
      if (!!window.paypal && paymentInfo.id) {
        clearInterval(intervall);
        loadScript(scriptUrl).then(() => {
          isLoading(false);
          setShowComponent(true);
        });
      }
    }, 250);
    return () => {
      setShowComponent(false);
      clearInterval(intervall);
    };
  }, [paymentInfo]);

  return showComponent ? (
    <GooglePayMask
      allowedCardAuthMethods={allowedCardAuthMethods}
      allowedCardNetworks={allowedCardNetworks}
      callbackIntents={callbackIntents}
      apiVersion={apiVersion}
      apiVersionMinor={apiVersionMinor}
      environment={environment}
    />
  ) : (
    <></>
  );
};
