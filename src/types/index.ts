import {
  PayPalButtonsComponentProps,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export type LoadingOverlayType = {
  loadingText?: string;
  textStyles?: string;
};

export type RequestHeader = { [key: string]: string };

export type GeneralComponentsProps = {
  options: ReactPayPalScriptOptions;
  requestHeader: RequestHeader;

  createPaymentUrl: string;
  shippingMethodId?: string;
} & CartInformationProps;

export type SmartComponentsProps = PayPalButtonsComponentProps &
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

export type CartInformationProps = { cartInformation: CartInformation };

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
