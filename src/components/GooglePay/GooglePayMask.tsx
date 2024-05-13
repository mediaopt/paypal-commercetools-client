import React, { useEffect, useRef, useState } from "react";
import { usePayment } from "../../app/usePayment";
import { GooglePayOptionsType } from "../../types";
import { errorFunc } from "../errorNotification";
import { useLoader } from "../../app/useLoader";
import { useNotifications } from "../../app/useNotifications";
import { useTranslation } from "react-i18next";

declare const google: any;
declare const paypal: any;

export const GooglePayMask: React.FC<GooglePayOptionsType> = ({
  apiVersion = 2,
  apiVersionMinor = 0,
  allowedCardNetworks,
  allowedCardAuthMethods,
  callbackIntents,
  environment = "TEST",
  totalPriceStatus = "FINAL",
  buttonColor = "default",
  buttonType = "buy",
  buttonRadius,
  buttonSizeMode = "static",
  verificationMethod,
}) => {
  const googlePayButton = useRef<HTMLDivElement>(null);
  const [paymentsClient, setPaymentsClient] = useState<{ [key: string]: any }>(
    {}
  );
  const [buttonCreated, setButtonCreated] = useState(false);
  const { handleCreateOrder, paymentInfo } = usePayment();
  const { isLoading } = useLoader();
  const { notify } = useNotifications();
  const { t } = useTranslation();

  const baseRequest = {
    apiVersion: apiVersion,
    apiVersionMinor: apiVersionMinor,
  };

  const baseCardPaymentMethod = {
    type: "CARD",
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks: allowedCardNetworks,
    },
  };

  const getGoogleTransactionInfo = () => {
    return {
      currencyCode: paymentInfo.currency,
      totalPriceStatus: totalPriceStatus,
      totalPrice: paymentInfo.amount.toString(),
    };
  };

  const processPayment = async (paymentData: { [key: string]: any }) => {
    try {
      const { currency, amount } = paymentInfo;
      const order = {
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString(),
            },
          },
        ],
        paymentData: paymentData,
      };

      await handleCreateOrder({
        googlePayData: order,
        paymentSource: "google_pay",
        verificationMethod: verificationMethod,
      });
    } catch (err: any) {
      errorFunc(err, isLoading, notify, t);
      return {
        transactionState: "ERROR",
        error: {
          message: err.message,
        },
      };
    }
  };

  const onPaymentAuthorized = (paymentData: { [key: string]: any }) => {
    return new Promise(function (resolve, reject) {
      processPayment(paymentData)
        .then(() => {
          resolve({ transactionState: "SUCCESS" });
        })
        .catch(() => {
          resolve({ transactionState: "ERROR" });
        });
    });
  };

  useEffect(() => {
    setPaymentsClient(
      new google.payments.api.PaymentsClient({
        environment: environment,
        paymentDataCallbacks: {
          onPaymentAuthorized: onPaymentAuthorized,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (Object.keys(paymentsClient).length) {
      onGooglePayLoaded();
    }
  }, [paymentsClient]);

  const getGooglePaymentDataRequest = async () => {
    const googlePayConfig = await paypal.Googlepay().config();

    const paymentDataRequest: { [key: string]: any } = Object.assign(
      {},
      baseRequest
    );

    paymentDataRequest.allowedPaymentMethods =
      googlePayConfig.allowedPaymentMethods;

    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = googlePayConfig.merchantInfo;
    paymentDataRequest.callbackIntents = callbackIntents;
    return paymentDataRequest;
  };

  const onGooglePaymentButtonClicked = async () => {
    const paymentDataRequest = await getGooglePaymentDataRequest();
    paymentsClient.loadPaymentData(paymentDataRequest).catch((err: any) => {
      notify("Error", err.statusCode);
    });
  };

  const addGooglePayButton = () => {
    if (buttonCreated) return;
    const buttonOptions: Record<string, any> = {
      buttonColor: buttonColor,
      buttonType: buttonType,
      buttonSizeMode: buttonSizeMode,
    };
    if (buttonRadius) {
      buttonOptions.buttonRadius = buttonRadius;
    }
    const button = paymentsClient.createButton({
      onClick: () => {
        isLoading(true);
        onGooglePaymentButtonClicked()
          .then(() => isLoading(false))
          .catch((err: Record<string, never>) => {
            errorFunc(err, isLoading, notify, t);
          });
      },
      allowedPaymentMethods: [baseCardPaymentMethod],
      ...buttonOptions,
    });
    if (googlePayButton.current) {
      googlePayButton.current.appendChild(button);
      setButtonCreated(true);
    }
  };

  const onGooglePayLoaded = () => {
    const isReadyToPayRequest: { [key: string]: any } = Object.assign(
      {},
      baseRequest
    );
    isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod];
    paymentsClient
      .isReadyToPay(isReadyToPayRequest)
      .then((response: { [key: string]: any }) => {
        if (response.result) {
          addGooglePayButton();
        }
      })
      .catch((err: { [key: string]: any }) => {
        errorFunc(err, isLoading, notify, t);
      });
  };
  return (
    <>
      <div ref={googlePayButton}></div>
    </>
  );
};
