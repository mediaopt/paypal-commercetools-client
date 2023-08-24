import React from "react";

export type ClientTokenRequest = {
  paymentId: string;
  paymentVersion: number;
  braintreeCustomerId?: string;
  merchantAccountId?: string;
};

export type LineItem = {
  name?: string;
  kind: string;
  quantity: string;
  unitAmount: string;
  unitOfMeasure?: string;
  totalAmount: string;
  taxAmount?: string;
  discountAmount?: string;
  productCode?: string;
  commodityCode?: string;
};

export type LineItems = LineItem[];

export type UseKount = { useKount?: boolean };

type LineItemsShipping = {
  lineItems?: LineItems;
  shipping?: Shipping;
};

export type GeneralPayButtonProps = {
  fullWidth?: boolean;
  buttonText?: string;
} & UseKount &
  LineItemsShipping;

export type GeneralComponentsProps = {
  purchaseUrl: string;
  createPaymentUrl: string;
  createPaymentForVault?: string;
  vaultPaymentMethodUrl?: string;
  getClientTokenUrl: string;
  sessionKey: string;
  sessionValue: string;
  taxAmount?: string;
  shippingAmount?: string;
  discountAmount?: string;
  purchaseCallback: (result: any, options?: any) => void;
  shippingMethodId?: string;
} & CartInformationProps &
  GeneralPayButtonProps &
  UseKount &
  LineItemsShipping;


export type ClientTokenResponse = {
  clientToken: string;
  paymentVersion: number;
};

export type CreatePaymentResponse = {
  id: string;
  version: number;
  amountPlanned: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
  lineItems: [object];
  shippingMethod: object;
  braintreeCustomerId: string;
  customerVersion?: number;
};

export type TransactionSaleResponse = {
  ok: boolean;
  message: string;
  result: {
    transactionSaleResponse: Record<string, any>;
    paymentVersion: number;
  };
};

export type PaymentInfo = {
  id: string;
  version: number;
  amount: number;
  currency: string;
  lineItems: Array<any>;
  shippingMethod: {};
} & CartInformationProps;

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

export type PayPalShippingOptions = {
  amount: number;
  countryCode: string;
};

export type ShippingAddressOverride = {
  recipientName: string;
  line1?: string;
  line2?: string;
  city?: string;
  countryCode?: string;
  postalCode?: string;
  state?: string;
  phone?: string;
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

export type VenmoTypes = {
  mobileWebFallBack: boolean;
  desktopFlow: "desktopWebLogin" | "desktopQRCode";
  paymentMethodUsage: "multi_use" | "single_use";
  allowNewBrowserTab?: boolean;
  profile_id?: string;
  useTestNonce?: boolean;
  setVenmoUserName: (venmoName: string) => any;
  ignoreBowserSupport?: boolean;
};

export type ApplePayTypes = {
  applePayDisplayName: string;
};

export type GenericError = {
  code: string;
  message: string;
};

export type LoadingOverlayType = {
  loadingText?: string;
  textStyles?: string;
};


export type Shipping = {
  company?: string;
  countryCodeAlpha2?: string;
  countryCodeAlpha3?: string;
  countryCodeNumeric?: string;
  countryName?: string;
  extendedAddress?: string;
  firstName?: string;
  lastName?: string;
  locality?: string;
  postalCode?: string;
  region?: string;
  streetAddress?: string;
};
