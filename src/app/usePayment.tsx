import { FC, createContext, useContext, useState, useMemo } from "react";
import { Result } from "../components/Result";

import {
  GeneralComponentsProps,
  PaymentInfo,
  CartInformationInitial,
  CreatePaymentResponse,
  RequestHeader,
  GetSettingsResponse,
} from "../types";
import { createPayment, getSettings } from "../services";

import { useLoader } from "./useLoader";
import { useNotifications } from "./useNotifications";

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
  settings?: GetSettingsResponse;
};

const PaymentContext = createContext<PaymentContextT>({
  setSuccess: () => {},
  paymentInfo: PaymentInfoInitialObject,
  requestHeader: {},
  handleCreatePayment: () => {},
  settings: {},
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  createPaymentUrl,
  getSettingsUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
}) => {
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

      const { amountPlanned, lineItems, shippingMethod } = createPaymentResult;

      setPaymentInfo({
        id: createPaymentResult.id,
        version: createPaymentResult.version,
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
