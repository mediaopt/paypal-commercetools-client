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
  CustomOrderData,
  ApproveVaultSetupTokenData,
  CreateInvoiceData,
  OrderDataLinks,
  OrderData,
  SetStringState,
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
import { relevantError } from "../messages/errorMessages";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

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
  handleCreateOrder: (orderData?: CustomOrderData) => Promise<string>;
  handleOnApprove: (data: CustomOnApproveData) => Promise<void>;
  vaultOnly: boolean;
  oderDataLinks?: OrderDataLinks;
  handleCreateVaultSetupToken: (
    paymentSource: FUNDING_SOURCE,
  ) => Promise<string>;
  handleApproveVaultSetupToken: (
    data: ApproveVaultSetupTokenData,
  ) => Promise<void>;
  orderId?: string;
};

const setRelevantData = (
  orderData?: CustomOrderData,
  isInvoice?: boolean,
  enableVaulting?: boolean,
) => {
  if (isInvoice) {
    return orderData as CreateInvoiceData;
  } else
    return {
      storeInVault: enableVaulting,
      ...orderData,
    };
};

const handleResponseError = (
  t: TFunction<any, any>,
  errorDetails?: string,
  errorMessage?: string,
  showError?: SetStringState,
) => {
  console.log(errorMessage, errorDetails);
  if (!errorDetails)
    throw new Error(errorMessage ?? "", { cause: t("ui.generalError") });
  else if (showError) {
    const ratepayError = relevantError(errorDetails, "pui");
    if (ratepayError && showError) showError(ratepayError);
    else
      throw new Error(errorMessage ?? "", {
        cause: ratepayError ?? t("pui.thirdPartyIssue"),
      });
  } else {
    const paypalError = relevantError(errorDetails, "pp");
    throw new Error(errorMessage ?? "", {
      cause: paypalError ? t(paypalError) : t("pp.unknownIssue"),
    });
  }
};

const PaymentContext = createContext<PaymentContextT>({
  setSuccess: () => {},
  paymentInfo: PaymentInfoInitialObject,
  requestHeader: {},
  handleCreatePayment: () => Promise.resolve(),
  clientToken: "",
  handleCreateOrder: (orderData?: CustomOrderData) => Promise.resolve(""),
  handleOnApprove: () => Promise.resolve(),
  vaultOnly: false,
  handleCreateVaultSetupToken: (paymentSource: FUNDING_SOURCE) =>
    Promise.resolve(""),
  handleApproveVaultSetupToken: (data?: ApproveVaultSetupTokenData) =>
    Promise.resolve(),
  oderDataLinks: undefined,
  orderId: undefined,
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
  const [oderDataLinks, setOderDataLinks] = useState<OrderDataLinks>();
  const [orderId, setOrderId] = useState<string>();

  const { settings } = useSettings();

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(
    PaymentInfoInitialObject,
  );

  const { isLoading } = useLoader();
  const { notify } = useNotifications();
  const { t } = useTranslation();

  const onSuccess = (orderData: OrderData) => {
    setShowResult(true);
    setResultSuccess(true);
    purchaseCallback(orderData);
  };

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
      paymentSource: FUNDING_SOURCE,
    ) => {
      if (!createVaultSetupTokenUrl) return "";

      const createVaultSetupTokenResult = await createVaultSetupToken(
        requestHeader,
        createVaultSetupTokenUrl,
        paymentSource,
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
        vaultSetupToken,
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

    const handleCreateOrder = async (orderData?: CustomOrderData) => {
      if (!createOrderUrl) return "";
      const setRatepayMessage = orderData?.setRatepayMessage ?? undefined;
      const relevantOrderData = setRelevantData(
        orderData,
        !!setRatepayMessage,
        enableVaulting,
      );

      const createOrderResult = await createOrder(
        requestHeader,
        createOrderUrl,
        paymentInfo.id,
        latestPaymentVersion,
        {
          ...relevantOrderData,
        },
      );

      if (createOrderResult) {
        const { orderData, paymentVersion } = createOrderResult;
        const { id, status, payment_source, details, links, message } =
          orderData;
        latestPaymentVersion = paymentVersion;
        if (
          paymentVersion &&
          (status === "PAYER_ACTION_REQUIRED" || setRatepayMessage)
        )
          setPaymentInfo({ ...paymentInfo, version: paymentVersion });
        if (!id) {
          handleResponseError(
            t,
            details?.toString(),
            message,
            setRatepayMessage,
          );
          return "";
        } else {
          if (setRatepayMessage) {
            setRatepayMessage && setRatepayMessage(undefined);
            onSuccess(orderData);
          } else {
            if (status === "COMPLETED" && payment_source) {
              onSuccess(orderData);
            } else if (
              status === "PAYER_ACTION_REQUIRED" &&
              payment_source &&
              links
            ) {
              setOderDataLinks(links);
              setOrderId(id);
            }
          }
        }
        return id;
      } else return "";
    };

    const handleOnApprove = async (data: CustomOnApproveData) => {
      if (!onApproveUrl && !authorizeOrderUrl) return;

      const { orderID, saveCard } = data;
      if (!orderID) return;
      isLoading(true);

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
        saveCard,
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
      isLoading(false);
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

    let vaultOnly: boolean = !!(
      createVaultSetupTokenUrl && approveVaultSetupTokenUrl
    );

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
      oderDataLinks,
      orderId,
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
    oderDataLinks,
    orderId,
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
