import { Dispatch, SetStateAction } from "react";
import {
  PayPalButtonsComponentProps,
  ReactPayPalScriptOptions,
  PayPalMessagesComponentProps,
} from "@paypal/react-paypal-js";
import { FUNDING_SOURCE } from "@paypal/paypal-js/types/components/funding-eligibility";

export type CreateOrderRequest = {
  paymentId: string;
  paymentVersion: number;
  orderData?: CreateOrderData;
};

export type CreateOrderData = {
  paymentSource: FUNDING_SOURCE;
};

export type CreateOrderResponse = {
  orderData: {
    id: string;
    success?: boolean;
    message?: string;
    details?: string;
  };
  paymentVersion: number;
};

export type createInvoiceRequest = CreateOrderRequest & {
  fraudNetSessionId: string;
  birthDate: string;
  nationalNumber: string;
  countryCode: string;
};

export type OnApproveRequest = {
  paymentId: string;
  paymentVersion: number;
  orderID: string;
};

export type OnApproveResponse = {
  orderData: { id: string; status: string; message?: string };
  paymentVersion: number;
};

export type LoadingOverlayType = {
  loadingText?: string;
  textStyles?: string;
};

export type RequestHeader = { [key: string]: string };

export type GeneralComponentsProps = {
  options: ReactPayPalScriptOptions;
  requestHeader: RequestHeader;

  createPaymentUrl: string;
  getSettingsUrl: string;
  createOrderUrl: string;

  onApproveUrl: string;
  authorizeOrderUrl?: string;

  shippingMethodId: string;
  purchaseCallback: (result: any, options?: any) => void;
  getClientTokenUrl?: string;
} & CartInformationProps;

export type HostedFieldsThreeDSAuth = {
  threeDSAuth?: "SCA_ALWAYS" | "SCA_WHEN_REQUIRED";
};

export type HostedFieldsProps = {
  options: ReactPayPalScriptOptions;
};

export type HostedFieldsSmartComponentProps = SmartComponentsProps &
  HostedFieldsThreeDSAuth;

export type FraudnetPage =
  | "home-page"
  | "search-result-page"
  | "category-page"
  | "product-detail-page"
  | "cart-page"
  | "inline-cart-page"
  | "checkout-page";

export type PayUponInvoiceProps = {
  merchantId: string;
  pageId: FraudnetPage;
  invoiceBenefitsMessage: string;
};

export type PayUponInvoiceButtonProps = {
  fraudNetSessionId: string;
  invoiceBenefitsMessage?: string;
  purchaseCallback?: (result: any, options?: any) => void;
};

export type CustomPayPalButtonsComponentProps = Omit<
  PayPalButtonsComponentProps,
  | "createOrder"
  | "createBillingAgreement"
  | "createSubscription"
  | "onApprove"
  | "onCancel"
  | "onClick"
  | "onError"
  | "onInit"
> & {
  paypalMessages?: PayPalMessagesComponentProps;
};

export type SmartComponentsProps = CustomPayPalButtonsComponentProps &
  GeneralComponentsProps;

export type CartInformation = {
  account: {
    email: string;
  };
  billing: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: string;
  };
};

export const CartInformationInitial: CartInformation = {
  account: {
    email: "",
  },
  billing: {
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
    postalCode: "",
  },
  shipping: {
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
    postalCode: "",
  },
};

export type CartInformationProps = { cartInformation?: CartInformation };

export type PaymentInfo = {
  id: string;
  version: number;
  amount: number;
  currency: string;
  lineItems: Array<any>;
  shippingMethod: {};
} & CartInformationProps;

export type CreatePaymentResponse = {
  id: string;
  version: number;
  amountPlanned: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
  lineItems: [object]; // @todo add better types maybe?
  shippingMethod: object; // @todo add better types maybe?
  braintreeCustomerId: string;
  customerVersion?: number;
};

export type ClientTokenResponse = {
  clientToken: string;
  paymentVersion: number;
  error?: string;
};

export type ClientTokenRequest = {
  paymentId: string;
  paymentVersion: number;
  braintreeCustomerId?: string;
  merchantAccountId?: string;
};

type CustomDataStringObject = { [key: string]: string };
type PayPalButtonColors = "gold" | "blue" | "white" | "silver" | "black";

export type GetSettingsResponse = {
  email: string;
  acceptPayPal: boolean;
  acceptPayLater: boolean;
  acceptVenmo: boolean;
  acceptLocal: boolean;
  acceptCredit: boolean;
  buttonPaymentPage: boolean;
  buttonCartPage: boolean;
  buttonDetailPage: boolean;
  buttonShippingPage: boolean;
  buttonShape: "rect" | "pill";
  buttonTagline: boolean;
  payLaterMessagingType: "flex" | "text";
  payLaterMessageHomePage: boolean;
  payLaterMessageCategoryPage: boolean;
  payLaterMessageDetailsPage: boolean;
  payLaterMessageCartPage: boolean;
  payLaterMessagePaymentPage: boolean;
  payLaterMessageTextLogoType: "inline" | "primary" | "alternative" | "none";
  payLaterMessageTextLogoPosition: "left" | "right" | "top";
  payLaterMessageTextColor: "black" | "white" | "monochrome" | "grayscale";
  payLaterMessageTextSize: "10" | "11" | "12" | "13" | "14" | "15" | "16";
  payLaterMessageTextAlign: "left" | "center" | "right";
  payLaterMessageFlexColor:
    | "blue"
    | "black"
    | "white"
    | "white-no-border"
    | "gray"
    | "monochrome"
    | "grayscale";
  payLaterMessageFlexRatio: "1x1" | "1x4" | "8x1" | "20x1";
  threeDSOption: "" | "SCA_ALWAYS" | "SCA_WHEN_REQUIRED";
  payPalIntent: "Authorize" | "Capture";
  partnerAttributionId: string;
  ratePayBrandName: CustomDataStringObject;
  ratePayLogoUrl: CustomDataStringObject;
  ratePayCustomerServiceInstructions: CustomDataStringObject;
  paymentDescription: CustomDataStringObject;
  storeInVaultOnSuccess: boolean;
  paypalButtonConfig: {
    buttonColor: PayPalButtonColors;
    buttonLabel: "paypal" | "checkout" | "buynow" | "pay" | "installment";
  };
  hostedFieldsPayButtonClasses: string;
  hostedFieldsInputFieldClasses: string;
};

export type CustomOnApproveData = {
  orderID: string;
  billingToken?: string | null;
  facilitatorAccessToken?: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
};

export type CustomInvoiceData = {
  fraudNetSessionId: string;
  nationalNumber: string;
  countryCode: string;
  birthDate: string;
  setRatepayMessage: Dispatch<SetStateAction<string | undefined>>;
};

export type SettingsProviderProps = {
  getSettingsUrl: string;
  requestHeader: RequestHeader;
  options: ReactPayPalScriptOptions;
};
