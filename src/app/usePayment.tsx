import React, {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { FUNDING_SOURCE } from "@paypal/paypal-js/types/components/funding-eligibility";

import { Result } from "../components/Result";
import {
  GeneralComponentsProps,
  PaymentInfo,
  CartInformationInitial,
  CreatePaymentResponse,
  RequestHeader,
  ClientTokenResponse,
  CustomOnApproveData,
  OnApproveResponse,
  CreateOrderData,
  CustomInvoiceData,
  ApproveVaultSetupTokenData,
} from "../types";
import {
  createPayment,
  createOrder,
  onApprove,
  createVaultSetupToken,
  approveVaultSetupToken,
} from "../services";

import { useLoader } from "./useLoader";
import { useNotifications } from "./useNotifications";
import { useSettings } from "./useSettings";
import { getClientToken } from "../services/getClientToken";
import { createPaypalInvoice } from "../services/createPaypalInvoice";
import { useTranslation } from "react-i18next";
import { relevantError } from "../components/PayUponInvoice/RatepayErrorNote";

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
  handleCreatePayment: () => Promise<void>;
  clientToken: string;
  handleCreateOrder: (orderData?: CreateOrderData) => Promise<string>;
  handleOnApprove: (data: CustomOnApproveData) => Promise<void>;
  vaultOnly: boolean;

  handleCreateVaultSetupToken: (
    paymentSource: FUNDING_SOURCE
  ) => Promise<string>;
  handleApproveVaultSetupToken: (
    data: ApproveVaultSetupTokenData
  ) => Promise<void>;
  handleCreateInvoice: (data: CustomInvoiceData) => Promise<string>;
};

const PaymentContext = createContext<PaymentContextT>({
  setSuccess: () => {},
  paymentInfo: PaymentInfoInitialObject,
  requestHeader: {},
  handleCreatePayment: () => Promise.resolve(),
  clientToken: "",
  handleCreateOrder: (orderData?: CreateOrderData) => Promise.resolve(""),
  handleOnApprove: () => Promise.resolve(),
  vaultOnly: false,
  handleCreateVaultSetupToken: (paymentSource: FUNDING_SOURCE) =>
    Promise.resolve(""),
  handleApproveVaultSetupToken: (data?: ApproveVaultSetupTokenData) =>
    Promise.resolve(),
  handleCreateInvoice: () => Promise.resolve(""),
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  purchaseCallback,

  createPaymentUrl,
  createOrderUrl,
  onApproveUrl,
  authorizeOrderUrl,

  createVaultSetupTokenUrl,
  approveVaultSetupTokenUrl,

  getClientTokenUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,

  enableVaulting,
}) => {
  const [clientToken, setClientToken] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultSuccess, setResultSuccess] = useState<boolean>();
  const [resultMessage, setResultMessage] = useState<string>();

  const { settings } = useSettings();
  const { t } = useTranslation();

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(
    PaymentInfoInitialObject,
  );

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

    const handleCreateVaultSetupToken = async (
      paymentSource: FUNDING_SOURCE
    ) => {
      if (!createVaultSetupTokenUrl) return "";

      const createVaultSetupTokenResult = await createVaultSetupToken(
        requestHeader,
        createVaultSetupTokenUrl,
        paymentSource
      );

      return createVaultSetupTokenResult
        ? createVaultSetupTokenResult.createVaultSetupTokenResponse.id
        : "";
    };
    const handleApproveVaultSetupToken = async ({
      vaultSetupToken,
    }: ApproveVaultSetupTokenData) => {
      if (!approveVaultSetupTokenUrl) return;

      const result = await approveVaultSetupToken(
        requestHeader,
        approveVaultSetupTokenUrl,
        vaultSetupToken
      );
      if (result) {
        setShowResult(true);
        setResultSuccess(true);
        purchaseCallback(result);
      } else {
        setShowResult(true);
        setResultSuccess(false);
      }
    };

    const handleCreateOrder = async (orderData?: CreateOrderData) => {
      if (!createOrderUrl) return "";

      const createOrderResult = await createOrder(
        requestHeader,
        createOrderUrl,
        paymentInfo.id,
        paymentInfo.version,
        {
          storeInVault: enableVaulting,
          ...orderData,
        }
      );

      if (createOrderResult) {
        const { orderData, paymentVersion } = createOrderResult;
        const { id, status, payment_source } = orderData;
        latestPaymentVersion = paymentVersion;
        if (status === "COMPLETED" && payment_source) {
          setShowResult(true);
          setResultSuccess(true);
          purchaseCallback(orderData);
          return "";
        } else {
          return id;
        }
      } else return "";
    };

    const handleCreateInvoice = async (data: CustomInvoiceData) => {
      if (!createOrderUrl) return "";
      const {
        fraudNetSessionId,
        nationalNumber,
        countryCode,
        birthDate,
        setRatepayMessage,
      } = data;

      const createOrderResult = await createPaypalInvoice(
        requestHeader,
        createOrderUrl,
        {
          fraudNetSessionId,
          nationalNumber,
          countryCode,
          birthDate,
          paymentId: paymentInfo.id,
          paymentVersion: paymentInfo.version,
        },
      );

      if (createOrderResult) {
        const { orderData, paymentVersion } = createOrderResult;
        if (paymentVersion) latestPaymentVersion = paymentVersion;
        if (orderData?.success) {
          setRatepayMessage(undefined);
          return orderData.id;
        } else {
          const errorDetails =
            orderData?.details?.length && orderData?.details[0];
          if (errorDetails) {
            const ratepayError = relevantError(errorDetails);
            if (ratepayError) {
              setRatepayMessage(ratepayError);
              return "";
            }
          }
          notify("Error", orderData?.message ?? t("thirdPartyIssue"));
        }
      }
      return "";
    };

    const handleOnApprove = async (data: CustomOnApproveData) => {
      if (!onApproveUrl && !authorizeOrderUrl) return;

      const { orderID, saveCard } = data;

      const onAuthorizeOrderUrl =
        settings?.payPalIntent === "Authorize" ? authorizeOrderUrl : null;

      const requestUrl = onAuthorizeOrderUrl ?? onApproveUrl;

      if (!requestUrl) return;

      const onApproveResult = await onApprove(
        requestHeader,
        requestUrl,
        paymentInfo.id,
        latestPaymentVersion,
        orderID,
        saveCard
      );

      const { orderData } = onApproveResult as OnApproveResponse;
      if (orderData.status === "COMPLETED") {
        setShowResult(true);
        setResultSuccess(true);
        purchaseCallback(onApproveResult);
      } else {
        setShowResult(true);
        setResultSuccess(false);
        if (orderData) {
          setResultMessage(orderData.message);
        }
      }
    };

    const handleCreatePayment = async () => {
      isLoading(true);

      if (createPaymentUrl && cartInformation) {
        const createPaymentResult = (await createPayment(
          requestHeader,
          createPaymentUrl,
          cartInformation,
          shippingMethodId,
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
            createPaymentResult.braintreeCustomerId,
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

    let vaultOnly: boolean =
      createVaultSetupTokenUrl && approveVaultSetupTokenUrl ? true : false;

    return {
      setSuccess,
      requestHeader,
      paymentInfo,
      handleCreatePayment,
      clientToken,
      handleOnApprove,
      handleCreateOrder,
      vaultOnly,
      handleCreateVaultSetupToken,
      handleApproveVaultSetupToken,
      handleCreateInvoice,
    };
  }, [
    paymentInfo,
    cartInformation,
    createOrderUrl,
    createPaymentUrl,
    isLoading,
    onApproveUrl,
    requestHeader,
    shippingMethodId,
    notify,
    settings,
    createVaultSetupTokenUrl,
    approveVaultSetupTokenUrl,
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
