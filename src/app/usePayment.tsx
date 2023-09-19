import { FC, createContext, useContext, useState, useMemo } from "react";
import { OnApproveData } from "@paypal/paypal-js";

import { Result } from "../components/Result";
import {
  GeneralComponentsProps,
  PaymentInfo,
  CartInformationInitial,
  CreatePaymentResponse,
  RequestHeader,
  GetSettingsResponse,
} from "../types";
import {
  createPayment,
  getSettings,
  createOrder,
  onApprove,
} from "../services";

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
  handleCreateOrder: () => Promise<string>;
  handleOnApprove: (data: OnApproveData) => Promise<void>;
};

const PaymentContext = createContext<PaymentContextT>({
  setSuccess: () => {},
  paymentInfo: PaymentInfoInitialObject,
  requestHeader: {},
  handleCreatePayment: () => {},
  settings: {},
  handleCreateOrder: () => Promise.resolve(""),
  handleOnApprove: () => Promise.resolve(),
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,

  createPaymentUrl,
  getSettingsUrl,
  createOrderUrl,
  onApproveUrl,

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

    const handleCreateOrder = async () => {
      if (!createOrderUrl) return "";

      return await createOrder(requestHeader, createOrderUrl);
    };

    const handleOnApprove = async (data: OnApproveData) => {
      if (!onApproveUrl) return;
      const orderID = data.orderID;
      await onApprove(requestHeader, onApproveUrl, orderID);
    };

    const handleCreatePayment = async () => {
      isLoading(true);

      if (getSettingsUrl) {
        const getSettingsResult = (await getSettings(
          requestHeader,
          getSettingsUrl
        )) as GetSettingsResponse;

        setSettings(getSettingsResult);
      }

      if (createPaymentUrl && cartInformation) {
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

        const { amountPlanned, lineItems, shippingMethod } =
          createPaymentResult;

        setPaymentInfo({
          id: createPaymentResult.id,
          version: createPaymentResult.version,
          amount: amountPlanned.centAmount / 100,
          currency: amountPlanned.currencyCode,
          lineItems: lineItems,
          shippingMethod: shippingMethod,
          cartInformation: cartInformation,
        });
      }
      isLoading(false);
    };

    return {
      setSuccess,
      requestHeader,
      paymentInfo,
      handleCreatePayment,
      settings,
      handleOnApprove,
      handleCreateOrder,
    };
  }, [
    paymentInfo,
    settings,
    cartInformation,
    createOrderUrl,
    createPaymentUrl,
    getSettingsUrl,
    isLoading,
    onApproveUrl,
    requestHeader,
    shippingMethodId,
    notify,
  ]);

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
