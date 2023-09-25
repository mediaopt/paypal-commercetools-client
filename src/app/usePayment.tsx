import React, { FC, createContext, useContext, useState, useMemo } from "react";
import { Result } from "../components/Result";

import {
  GeneralComponentsProps,
  PaymentInfo,
  CartInformationInitial,
  CreatePaymentResponse,
  RequestHeader,
  GetSettingsResponse,
  ClientTokenResponse,
} from "../types";
import { createPayment, getSettings } from "../services";

import { useLoader } from "./useLoader";
import { useNotifications } from "./useNotifications";
import { getClientToken } from "../services/getClientToken";

const PaymentInfoInitialObject = {
  version: 0,
  id: "",
  amount: 0,
  currency: "",
  lineItems: [],
  shippingMethod: {},
  cartInformation: CartInformationInitial,
  sessionKey: "",
  sessionValue: "",
};

type PaymentContextT = {
  setSuccess: () => void;
  paymentInfo: PaymentInfo;
  requestHeader: RequestHeader;
  handleCreatePayment: () => void;
  clientToken: string;
  settings?: GetSettingsResponse;
};

const PaymentContext = createContext<PaymentContextT>({
  setSuccess: () => {},
  paymentInfo: PaymentInfoInitialObject,
  requestHeader: {},
  handleCreatePayment: () => {},
  clientToken: "",
  settings: {},
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  createPaymentUrl,
  getSettingsUrl,
  getClientTokenUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
}) => {
  const [clientToken, setClientToken] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultSuccess, setResultSuccess] = useState<boolean>();
  const [resultMessage, setResultMessage] = useState<string>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(
    PaymentInfoInitialObject
  );
  const [settings, setSettings] = useState<GetSettingsResponse>();

  const { isLoading } = useLoader();
  const { notify } = useNotifications();

  const value = useMemo(() => {
    const setSuccess = () => {
      setResultSuccess(true);
      setShowResult(true);
      setResultMessage("Test success successful");
    };

    const handleCreatePayment = async () => {
      isLoading(true);

      const getSettingsResult = (await getSettings(
        requestHeader,
        getSettingsUrl
      )) as GetSettingsResponse;

      setSettings(getSettingsResult);

      const createPaymentResult = (await createPayment(
        requestHeader,
        createPaymentUrl,
        cartInformation,
        shippingMethodId
      )) as CreatePaymentResponse;

      if (!createPaymentResult) {
        isLoading(false);
        notify("Error", "There is an error in creating payment!");
        return;
      }

      let paymentVersion: number = createPaymentResult.version;
      if (getClientTokenUrl) {
        const clientTokenResult = (await getClientToken(
          requestHeader,
          getClientTokenUrl,
          createPaymentResult.id,
          createPaymentResult.version,
          createPaymentResult.braintreeCustomerId
        )) as ClientTokenResponse;
        setClientToken(clientTokenResult.clientToken);
        paymentVersion = clientTokenResult.paymentVersion;
      }

      const { amountPlanned, lineItems, shippingMethod } = createPaymentResult;

      setPaymentInfo({
        id: createPaymentResult.id,
        version: paymentVersion,
        amount: amountPlanned.centAmount / 100,
        currency: amountPlanned.currencyCode,
        lineItems: lineItems,
        shippingMethod: shippingMethod,
        cartInformation: cartInformation,
      });

      isLoading(false);
    };

    return {
      setSuccess,
      requestHeader,
      paymentInfo,
      handleCreatePayment,
      clientToken,
      settings,
    };
  }, [paymentInfo, settings]);

  return (
    <PaymentContext.Provider value={value}>
      {showResult ? (
        <Result success={resultSuccess} message={resultMessage} />
      ) : (
        children
      )}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
