import React, { useEffect, useState } from "react";

import loadScript from "../../app/loadScript";
import { usePayment } from "../../app/usePayment";
import { CustomPayPalButtonsComponentProps } from "../../types";

declare const window: any;
declare const paypal: any;

type ApplePaySession = any;

type ApplepayConfig = {
  countryCode: string;
  currencyCode: string;
  isEligible: boolean;
  merchantCapabilities: string[];
  merchantCountry: string;
  supportedNetworks: string[];
};

type ApplepayValidateMerchant = {
  validationUrl: string;
  displayName: string;
};

type ConfirmOrder = {
  orderId: string;
  token: string;
  billingContact: string;
};

type ApplepayValidateMerchantResult = {
  merchantSession: string;
};

type Applepay = {
  config: () => Promise<ApplepayConfig>;
  confirmOrder: ({}: ConfirmOrder) => Promise<void>;
  validateMerchant: ({}: ApplepayValidateMerchant) => Promise<ApplepayValidateMerchantResult>;
};

export const ApplePayMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props
) => {
  const [error, setError] = useState<string>();
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [payConfig, setPayConfig] = useState<ApplepayConfig>();
  const [pay, setPay] = useState<Applepay>();

  const { paymentInfo, handleCreateOrder, handleOnApprove } = usePayment();

  useEffect(() => {
    loadScript("https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js").then(
      async () => {
        const applePaySession: ApplePaySession = window.ApplePaySession;
        console.log("ApplePaySession", applePaySession);
        if (!applePaySession) {
          setError("This device does not support Apple Pay");
          return;
        }
        if (!applePaySession.canMakePayments()) {
          setError("This device is not capable of making Apple Pay payments");
          return;
        }
        try {
          const applepay: Applepay = await paypal.Applepay();
          console.log("applepay", applepay);
          const applepayConfig: ApplepayConfig = await applepay.config();
          console.log("applepayConfig", applepayConfig);
          if (applepayConfig.isEligible) {
            setIsEligible(true);
            setPayConfig(applepayConfig);
            setPay(applepay);
          }
        } catch (error) {
          setError("Error while fetching Apple Pay configuration.");
          return;
        }
      }
    );
  }, [props]);

  const onApplePayButtonClicked = () => {
    const applePaySession: ApplePaySession = window.ApplePaySession;

    console.log("Apple Pay button clicked");

    console.log("applePaySession", applePaySession);
    console.log("applepayConfig", payConfig);
    console.log("applepay", pay);
    console.log("paymentInfo", paymentInfo);

    if (!applePaySession || !payConfig || !paymentInfo || !pay) {
      console.log(
        "Apple Pay session, config, pay or payment info not available"
      );
      return;
    }

    const paymentRequest = {
      requiredBillingContactFields: ["postalAddress"],
      total: {
        label: "Demo",
        amount: paymentInfo.amount,
      },
    };
    console.log("paymentRequest", paymentRequest);

    const session = new applePaySession(4, paymentRequest);
    console.log("session", session);

    session.onvalidatemerchant = (event: any) => {
      pay
        .validateMerchant({
          validationUrl: event.validationURL,
          displayName: "My Store",
        })
        .then((validateResult) => {
          console.log("onvalidatemerchant validateResult", validateResult);
          session.completeMerchantValidation(validateResult.merchantSession);
        })
        .catch((validateError) => {
          console.error("Error validating merchant");
          console.error(validateError);
          session.abort();
        });
    };

    session.onpaymentauthorized = (event: any) => {
      console.log("Your billing address is:", event.payment.billingContact);
      console.log("Your shipping address is:", event.payment.shippingContact);

      handleCreateOrder({
        storeInVault: false,
        paymentSource: "applepay",
      })
        .then((orderId) => {
          console.log("onpaymentauthorized orderId", orderId);
          pay
            .confirmOrder({
              orderId: orderId,
              token: event.payment.token,
              billingContact: event.payment.billingContact,
            })
            .then((confirmResult) => {
              console.log("onpaymentauthorized confirmResult", confirmResult);
              handleOnApprove({ orderID: orderId })
                .then((captureResult) => {
                  console.log(
                    "onpaymentauthorized captureResult",
                    captureResult
                  );
                })
                .catch((captureError) => console.error(captureError));
            })
            .catch((confirmError) => {
              console.error("Error confirming order with applepay token");
              console.error(confirmError);
              session.completePayment(applePaySession.STATUS_FAILURE);
            });
        })
        .catch((createError) => {
          console.error("Error creating order");
          console.error(createError);
        });
    };

    session.begin();
  };

  return (
    <>
      <div id="applepay-container">
        {isEligible ? (
          <button
            onClick={onApplePayButtonClicked}
            type="button"
            className="w-full justify-center text-white bg-primary-900 focus:ring-4 focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 mr-2 mb-2"
          >
            Check out with Apple Pay
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="apple"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              ></path>
            </svg>
          </button>
        ) : (
          <>{error}</>
        )}
      </div>
    </>
  );
};
