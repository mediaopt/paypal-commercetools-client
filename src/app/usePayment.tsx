import React, {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { OnApproveData } from "@paypal/paypal-js";
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
import {
  createPayment,
  getSettings,
  createOrder,
  onApprove,
} from "../services";

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
  handleCreateOrder: () => Promise<string>;
  handleOnApprove: (data: OnApproveData) => Promise<void>;
};

const PaymentContext = createContext<PaymentContextT>({
  setSuccess: () => {},
  paymentInfo: PaymentInfoInitialObject,
  requestHeader: {},
  handleCreatePayment: () => {},
  clientToken: "",
  settings: {},
  handleCreateOrder: () => Promise.resolve(""),
  handleOnApprove: () => Promise.resolve(),
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  purchaseCallback,

  createPaymentUrl,
  getSettingsUrl,
  createOrderUrl,
  onApproveUrl,

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

  let latestPaymentVersion = paymentInfo.version;

  useEffect(() => {
    if (showResult) {
      isLoading(false);
    }
  }, [showResult]);

  const value = useMemo(() => {
    const setSuccess = () => {
      setResultSuccess(true);
      setShowResult(true);
      setResultMessage("Test success successful");
    };

    const handleCreateOrder = async () => {
      if (!createOrderUrl) return "";

      const createOrderResult = await createOrder(
        requestHeader,
        createOrderUrl,
        paymentInfo.id,
        paymentInfo.version
      );

      if (createOrderResult) {
        const { orderData, paymentVersion } = createOrderResult;
        latestPaymentVersion = paymentVersion;

        return orderData.id;
      } else return "";
    };

    const handleOnApprove = async (data: OnApproveData) => {
      if (!onApproveUrl) return;
      const orderID = data.orderID;

      const onApproveResult = await onApprove(
        requestHeader,
        onApproveUrl,
        paymentInfo.id,
        latestPaymentVersion,
        orderID
      );

      if (
        onApproveResult &&
        onApproveResult.captureOrderData.status === "COMPLETED"
      ) {
        setShowResult(true);
        setResultSuccess(true);
        purchaseCallback(onApproveResult);
      } else {
        setShowResult(true);
        setResultSuccess(false);
      }
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

        const { amountPlanned, lineItems, shippingMethod } =
          createPaymentResult;

        setPaymentInfo({
          id: createPaymentResult.id,
          version: paymentVersion,
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
      clientToken,
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
