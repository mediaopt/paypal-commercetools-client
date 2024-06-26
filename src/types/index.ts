import { Dispatch, SetStateAction } from "react";
import {
  PayPalButtonsComponentProps,
  ReactPayPalScriptOptions,
  PayPalMessagesComponentProps,
} from "@paypal/react-paypal-js";
import { FUNDING_SOURCE } from "@paypal/paypal-js/types/components/funding-eligibility";

export type CreateVaultSetupTokenRequest = { paymentSource: FUNDING_SOURCE };
export type CreateVaultSetupTokenResponse = {
  createVaultSetupTokenResponse: { id: string };
  version: string;
};

export type ApproveVaultSetupTokenRequest = { vaultSetupToken: string };
export type ApproveVaultSetupTokenResponse = {
  createPaymentTokenResponse: { id: string };
  version: string;
};

export type ApproveVaultSetupTokenData = { vaultSetupToken: string };

export type CreateOrderRequest = {
  paymentId: string;
  paymentVersion: number;
  orderData?: CreatePayPalOrderData;
};

export type CreateOrderData = {
  paymentSource?: FUNDING_SOURCE | "google_pay" | "apple_pay";
  storeInVault?: boolean;
  vaultId?: string;
  verificationMethod?: ThreeDSVerification;
};

export type CreateInvoiceData = {
  fraudNetSessionId?: string;
  birthDate?: string;
  nationalNumber?: string;
  countryCode?: string;
};

export type CreatePayPalOrderData = CreateOrderData & CreateInvoiceData;

export type OrderData = {
  id: string;
  status: string;
  success?: boolean;
  message?: string;
  details?: string;
  payment_source?: {
    card: {
      name: string;
      last_digits: string;
      expiry: string;
      brand: string;
      available_networks: string[];
      type: string;
    };
  };
  links?: OrderDataLinks;
};

export type CreateOrderResponse = {
  orderData: OrderData;
  paymentVersion: number;
  ok?: boolean;
};

export type OnApproveRequest = {
  paymentId: string;
  paymentVersion: number;
  orderID: string;
  saveCard?: boolean;
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
  createOrderUrl?: string;
  getOrderUrl?: string;
  onApproveUrl?: string;
  onApproveRedirectionUrl?: string;
  authorizeOrderUrl?: string;
  getUserInfoUrl?: string;
  removePaymentTokenUrl?: string;
  authenticateThreeDSOrderUrl?: string;

  createVaultSetupTokenUrl?: string;
  approveVaultSetupTokenUrl?: string;

  shippingMethodId: string;
  purchaseCallback: (result: any, options?: any) => void;
  getClientTokenUrl?: string;
  enableVaulting?: boolean;
} & CartInformationProps;

export type ThreeDSVerification = "SCA_ALWAYS" | "SCA_WHEN_REQUIRED";

export type HostedFieldsThreeDSAuth = {
  threeDSAuth?: ThreeDSVerification;
};

export type HostedFieldsProps = {
  options: ReactPayPalScriptOptions;
  enableVaulting?: boolean;
};

export type CardFieldsProps = {
  enableVaulting?: boolean;
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

type ratepayPaymentRestrictions = {
  minPayableAmount: number;
  maxPayableAmount: number;
};

export type PayUponInvoiceProps = ratepayPaymentRestrictions & {
  merchantId: string;
  pageId: FraudnetPage;
  invoiceBenefitsMessage?: string;
  customLocale?: string;
};

export type PayUponInvoiceMaskProps = {
  fraudNetSessionId: string;
  invoiceBenefitsMessage?: string;
};

export type PayUponInvoiceButtonProps = ratepayPaymentRestrictions &
  PayUponInvoiceMaskProps;

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
  enableVaulting?: boolean;
};

export type SmartComponentsProps = CustomPayPalButtonsComponentProps &
  GeneralComponentsProps;

export type ApplePayProps = {
  applePayDisplayName: string;
};

export type ApplePayComponentsProps = ApplePayProps & SmartComponentsProps;

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

export type CardPaymentSource = {
  name: string;
  last_digits: string;
  brand: string;
  expiry: string;
  verification_status: string;
  verification: {
    network_transaction_id: string;
    time: string;
    amount: {
      currency_code: string;
      value: string;
    };
    processor_response: {
      avs_code: string;
      cvv_code: string;
      response_code: string;
    };
  };
};
export type PayPalPaymentSource = {
  shipping: {
    name: {
      full_name: string;
    };
    address: {
      address_line_1: string;
      address_line_2: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    };
  };
  usage_type: string;
  customer_type: string;
  email_address: string;
  payer_id: string;
  name: {
    given_name: string;
    surname: string;
    full_name: string;
  };
  phone: {
    phone_number: {
      country_code: string;
      national_number: string;
    };
  };
  tenant: string;
};

export type PaymentTokens = {
  customer?: { id: string };
  payment_tokens?: Array<{
    id: string;
    customer: { id: string };
    payment_source: {
      card: CardPaymentSource;
      paypal: PayPalPaymentSource;
      venmo: PayPalPaymentSource;
      apple_pay: {
        card: CardPaymentSource;
      };
    };
  }>;
};

export type GetUserInfoResponse = {
  userIdToken?: string;
  paymentTokens?: PaymentTokens;
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
  merchantId: string;
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
  payLaterMessagingType: Record<string, "flex" | "text">;
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
  threeDSAction: Record<string, any>;
};

export type CustomOnApproveData = {
  orderID: string;
  billingToken?: string | null;
  facilitatorAccessToken?: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
  saveCard?: boolean;
  liabilityShift?: string;
};

export type SetStringState = Dispatch<SetStateAction<string | undefined>>;

type GooglePayDataType = {
  purchase_units: {
    amount: {
      currency_code: string;
      value: string;
    };
  }[];
  paymentData: { [key: string]: any };
};

export type CustomOrderData = CreatePayPalOrderData & {
  setRatepayMessage?: SetStringState;
  googlePayData?: GooglePayDataType;
};

export type SettingsProviderProps = {
  getSettingsUrl: string;
  getUserInfoUrl?: string;
  requestHeader: RequestHeader;
  options: ReactPayPalScriptOptions;
  removePaymentTokenUrl?: string;
};

export type RemovePaymentTokenRequest = { paymentTokenId: string };

type OrderDataLink = {
  href: string;
  rel: string;
  method: string;
};

export type OrderDataLinks = OrderDataLink[];

export type GooglePayOptionsType = {
  environment?: "TEST" | "PRODUCTION";
  allowedCardNetworks: string[];
  allowedCardAuthMethods: string[];
  callbackIntents: string[];
  apiVersion?: number;
  apiVersionMinor?: number;
  totalPriceStatus?: "FINAL" | "ESTIMATED";
  buttonColor?: "default" | "white" | "black";
  buttonType?:
    | "book"
    | "buy"
    | "checkout"
    | "donate"
    | "order"
    | "pay"
    | "plain"
    | "subscribe";
  buttonRadius?: number;
  buttonSizeMode?: "static" | "fill";
  verificationMethod: ThreeDSVerification;
};

export type ApplePaySession = any;

export type ApplepayConfig = {
  countryCode: string;
  currencyCode: string;
  isEligible: boolean;
  merchantCapabilities: string[];
  merchantCountry: string;
  supportedNetworks: string[];
};

type ApplepayValidateMerchant = {
  validationUrl: string;
  displayName: string;
};

type ApplepayConfirmOrder = {
  orderId: string;
  token: string;
  billingContact: string;
};

type ApplepayValidateMerchantResult = {
  merchantSession: string;
};

export type Applepay = {
  config: () => Promise<ApplepayConfig>;
  confirmOrder: ({}: ApplepayConfirmOrder) => Promise<void>;
  validateMerchant: ({}: ApplepayValidateMerchant) => Promise<ApplepayValidateMerchantResult>;
};
