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
  orderData: { id: string };
  paymentVersion: number;
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

export type GetSettingsResponse = {
  [key: string]: string | boolean;
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

export type SettingsProviderProps = {
  getSettingsUrl: string;
  requestHeader: RequestHeader;
  options: ReactPayPalScriptOptions;
};
