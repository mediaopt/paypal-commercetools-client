import React, { useEffect, useRef, useState } from "react";
import { usePayment } from "../../app/usePayment";
import { GooglePayOptionsType } from "../../types";

export const GooglePayMask: React.FC<GooglePayOptionsType> = ({
  apiVersion,
  apiVersionMinor,
  allowedCardNetworks,
  allowedCardAuthMethods,
  callbackIntents,
  environment = "TEST",
}) => {
  const googlePayButton = useRef<HTMLDivElement>(null);
  const [paymentsClient, setPaymentsClient] = useState<{ [key: string]: any }>(
    {}
  );
  const [buttonCreated, setButtonCreated] = useState(false);
  const { handleCreateOrder, handleOnApprove } = usePayment();

  const baseRequest = {
    apiVersion: apiVersion || 2,
    apiVersionMinor: apiVersionMinor || 0,
  };

  const baseCardPaymentMethod = {
    type: "CARD",
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks: allowedCardNetworks,
    },
  };

  const tmpStaticTransaction = () => {
    return {
      displayItems: [
        {
          label: "Subtotal",
          type: "SUBTOTAL",
          price: "1.00",
        },
        {
          label: "tax",
          type: "TAX",
          price: "0.00",
        },
      ],
      countryCode: "DE",
      currencyCode: "EUR",
      totalPriceStatus: "FINAL",
      totalPrice: "1.00",
    };
  };

  const getGoogleTransactionInfo = () => {
    return {
      currencyCode: "EUR",
      totalPriceStatus: "FINAL",
      totalPrice: "1.00",
    };
  };

  const processPayment = async (paymentData: { [key: string]: any }) => {
    try {
      const { currencyCode, totalPrice } = tmpStaticTransaction();
      const order = {
        //intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currencyCode,
              value: totalPrice,
            },
          },
        ],
        paymentData: paymentData,
      };

      handleCreateOrder({ googlePayData: order, paymentSource: "google_pay" });
    } catch (err: any) {
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
      // @ts-ignore
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

  // @todo proper look, now just copypasta
  const getGooglePaymentDataRequest = async () => {
    // @ts-ignore
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
    console.log(paymentDataRequest);
    paymentsClient.loadPaymentData(paymentDataRequest);
  };

  const addGooglePayButton = () => {
    if (buttonCreated) return;
    const button = paymentsClient.createButton({
      onClick: () => {
        onGooglePaymentButtonClicked();
      },
      allowedPaymentMethods: [baseCardPaymentMethod],
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
        console.error(err);
      });
  };
  return (
    <>
      <div ref={googlePayButton}></div>
    </>
  );
};
