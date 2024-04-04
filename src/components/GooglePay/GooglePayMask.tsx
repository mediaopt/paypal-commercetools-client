import { useEffect, useRef, useState } from "react";
import { usePayment } from "../../app/usePayment";

export const GooglePayMask = () => {
  const googlePayButton = useRef<HTMLDivElement>(null);
  const [paymentsClient, setPaymentsClient] = useState<{ [key: string]: any }>(
    {}
  );
  const [buttonCreated, setButtonCreated] = useState(false);
  const { handleCreateOrder, handleOnApprove } = usePayment();

  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  };

  const allowedCardNetworks = ["MASTERCARD", "VISA"];

  const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

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

  const tokenizationSpecification = {
    type: "PAYMENT_GATEWAY",
    parameters: {
      gateway: "example",
      gatewayMerchantId: "exampleGatewayMerchantId",
    },
  };

  const cardPaymentMethod = Object.assign({}, baseCardPaymentMethod, {
    tokenizationSpecification: tokenizationSpecification,
  });

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
      /* Create Order */
      handleCreateOrder({ googlePayData: order, paymentSource: "google_pay" });
      /*const { id } = await fetch(`/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }).then((res) => res.json());*/
      //@ts-ignore
      /*const { status } = await paypal.Googlepay().confirmOrder({
        orderId: id,
        paymentMethodData: paymentData.paymentMethodData,
      });
      if (status === "APPROVED") {
        /!* Capture the Order *!/
        const captureResponse = await fetch(`/orders/${id}/capture`, {
          method: "POST",
        }).then((res) => res.json());
        return { transactionState: "SUCCESS" };
      } else {
        return { transactionState: "ERROR" };
      }*/
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
        environment: "TEST",
        //environment: "PRODUCTION",
        paymentDataCallbacks: {
          onPaymentAuthorized: onPaymentAuthorized,
        },
      })
    );
  }, []);

  useEffect(() => {
    console.log(paymentsClient);
    if (Object.keys(paymentsClient).length) {
      onGooglePayLoaded();
    }
  }, [paymentsClient]);

  /* Note: the `googlePayConfig` object in this request is the response from `paypal.Googlepay().config()` */
  // @todo proper look, now just copypasta
  const getGooglePaymentDataRequest = async () => {
    // @ts-ignore
    // const googlePayConfig = await paypal.Googlepay().config();

    const paymentDataRequest: { [key: string]: any } = Object.assign(
      {},
      baseRequest
    );

    //paymentDataRequest.allowedPaymentMethods = googlePayConfig.allowedPaymentMethods;
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];

    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    //paymentDataRequest.merchantInfo = googlePayConfig.merchantInfo;
    /*paymentDataRequest.merchantInfo = {
      merchantName: "Example Merchant",
      merchantId: "12345678901234567890",
    };*/
    paymentDataRequest.callbackIntents = ["PAYMENT_AUTHORIZATION"];
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
