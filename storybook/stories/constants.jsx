const cartInformation = {
  account: {
    email: "test@test.com",
  },
  billing: {
    firstName: "John",
    lastName: "Smith",
    streetName: "Hochstraße",
    streetNumber: "37",
    city: "Berlin",
    country: "DE",
    postalCode: "12045",
  },
  shipping: {
    firstName: "John",
    lastName: "Smith",
    streetName: "Hochstraße",
    streetNumber: "37",
    city: "Berlin",
    country: "DE",
    postalCode: "12045",
  },
};

export const options = {
  clientId:
    "AQlyw_Usbq3XVXnbs2JfrtmDAzJ2ECVzs4WM7Nm9QkoOWb8_s_C6-bkgs0o4ggzCYp_RhJO5OLS_sEi9",
  currency: "EUR",
};

export const requestHeader = {
  "Frontastic-Session":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI1Nzk5NWIyYy1lZmEzLTRkYjItYWQyYi0wN2EyMzg1M2UxNjYifQ.asS8mWYpg11E1HPVMTZxtYSxwI6fUAcdLRuOQU4w13k",
  "Commercetools-Frontend-Extension-Version": "devjonathanyeboah",
};

const baseUrl = "https://poc-mediaopt2.frontastic.rocks/frontastic/action/";

const commonParams = {
  getSettingsUrl: `${baseUrl}settings/getPayPalSettings`,
  getClientTokenUrl: `${baseUrl}payment/getClientToken`,
  createPaymentUrl: `${baseUrl}payment/createPayment`,
  purchaseCallback: (result, options) => {
    console.log("Do something", result, options);
  },
};

export const params = {
  ...commonParams,
  createOrderUrl: `${baseUrl}payment/createPayPalOrder`,
  onApproveUrl: `${baseUrl}payment/capturePayPalOrder`,
  authorizeOrderUrl: `${baseUrl}payment/authorizePayPalOrder`,
  shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
  cartInformation: cartInformation,
};

export const vaultParams = {
  getUserInfoUrl: `${baseUrl}payment/getUserInfo`,
  enableVaulting: true,
};

export const vaultOnlyParams = {
  ...commonParams,
  getUserInfoUrl: `${baseUrl}payment/getUserInfo`,
  enableVaulting: true,
  createVaultSetupTokenUrl: `${baseUrl}payment/createVaultSetupToken`,
  approveVaultSetupTokenUrl: `${baseUrl}payment/approveVaultSetupToken`,
  shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
};

export const payPalMessagesParams = {
  amount: "100.00",
  currency: "EUR",
  style: {
    layout: "text",
  },
  placement: "product",
};

export const paymentTokensJson = {
  ...params,
  ...vaultParams,
  removePaymentTokenUrl: `${baseUrl}payment/removePaymentToken`,
  requestHeader,
  options,
};

export const paypalInvoiceParams = {
  merchantId: "W3KJAHBNV5BS6",
  pageId: "checkout-page",
  invoiceBenefitsMessage:
    "Once you place an order, pay within 30 days. Our partner Ratepay will send you the instructions.",
};

export const cardFieldsParams = {
  authenticateThreeDSOrderUrl: `${baseUrl}/payment/authenticateThreeDSOrder`,
};
