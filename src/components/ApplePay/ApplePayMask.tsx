import React, { useEffect, useState } from "react";

import { CustomPayPalButtonsComponentProps } from "../../types";
import loadScript from "../../app/loadScript";

declare const window: any;
declare const paypal: any;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "apple-pay-button": {
        id: string;
        buttonstyle: string;
        type: string;
        locale: string;
        onClick: () => void;
      };
    }
  }
}

export const ApplePayMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const [error, setError] = useState<string>();
  const [isEligible, setIsEligible] = useState<boolean>(false);

  let ApplePaySession;

  useEffect(() => {
    loadScript("https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js").then(
      async () => {
        ApplePaySession = window.ApplePaySession;

        if (!ApplePaySession) {
          setError("This device does not support Apple Pay");
          return;
        }
        if (!ApplePaySession.canMakePayments()) {
          setError("This device is not capable of making Apple Pay payments");
          return;
        }
        try {
          const applepay = await paypal.Applepay();
          console.log("applepay", applepay);
          const applepayConfig = await applepay.config();
          console.log("applepayConfig", applepayConfig);
          if (applepayConfig.isEligible) {
            setIsEligible(true);
          }
        } catch (error) {
          setError("Error while fetching Apple Pay configuration.");
          return;
        }
      }
    );
  }, [props]);

  return (
    <>
      <div id="applepay-container">
        {isEligible ? (
          <>
            Is Elegible
            <apple-pay-button
              id="btn-appl"
              buttonstyle="black"
              type="buy"
              locale="en"
              onClick={() => console.log("Apple Pay button clicked")}
            ></apple-pay-button>
          </>
        ) : (
          <>{error}</>
        )}
      </div>
    </>
  );
};
