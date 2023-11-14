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
  paymentSource?: FUNDING_SOURCE;
  storeInVault?: boolean;
  vaultId?: string;
};

export type CreateOrderResponse = {
  orderData: {
    id: string;
    status: string;
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
  };
  paymentVersion: number;
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
  createOrderUrl: string;
  onApproveUrl: string;
  authorizeOrderUrl?: string;
  getUserIdTokenUrl?: string;
  removePaymentTokenUrl?: string;

  shippingMethodId: string;
  purchaseCallback: (result: any, options?: any) => void;
  getClientTokenUrl?: string;
  enableVaulting?: boolean;
} & CartInformationProps;

export type HostedFieldsThreeDSAuth = {
  threeDSAuth?: "SCA_ALWAYS" | "SCA_WHEN_REQUIRED";
};

export type HostedFieldsProps = {
  options: ReactPayPalScriptOptions;
  enableVaulting?: boolean;
};

export type HostedFieldsSmartComponentProps = SmartComponentsProps &
  HostedFieldsThreeDSAuth;

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
  saveCard?: boolean;
};

export type SettingsProviderProps = {
  getSettingsUrl: string;
  getUserIdTokenUrl?: string;
  requestHeader: RequestHeader;
  options: ReactPayPalScriptOptions;
  removePaymentTokenUrl?: string;
};

export type RemovePaymentTokenRequest = { paymentTokenId: string };
