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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiMmFkYWM1OWMtYzBlNy00NjgzLWE3YjgtODhkOTUxYzg5NjNiIiwiY2FydElkIjoiYjNiM2VmNWEtZWI4Ny00NWVjLWJiYWQtMDNkZjQzZGU5YWNlIiwiYWNjb3VudCI6eyJhY2NvdW50SWQiOiJmMjJhNGZlMy1jMmI4LTQ4MDEtODIwOC00MTRkMjA2MjBlMGIiLCJlbWFpbCI6Im1hamlkLmFiYmFzaUBtZWRpYW9wdC5kZSIsInNhbHV0YXRpb24iOiIiLCJmaXJzdE5hbWUiOiJNYWppZCIsImxhc3ROYW1lIjoiQWJiYXNpIiwiYmlydGhkYXkiOiIxOTg5LTAzLTA1VDAwOjAwOjAwLjAwMFoiLCJjb25maXJtZWQiOnRydWUsImFkZHJlc3NlcyI6W3siYWRkcmVzc0lkIjoiamJUSlhtM00iLCJmaXJzdE5hbWUiOiJNYWppZCIsImxhc3ROYW1lIjoiQWJiYXNpIiwic3RyZWV0TmFtZSI6IkhvY2hzdHJhXHUwMGRmZSAzNyIsInN0cmVldE51bWJlciI6IkhvY2hzdHJhXHUwMGRmZSAzNyIsInBvc3RhbENvZGUiOiIxMzM1NyIsImNpdHkiOiJERSIsImNvdW50cnkiOiJERSIsInBob25lIjoiNTk5MzU3NTYyIiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOmZhbHNlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOmZhbHNlfSx7ImFkZHJlc3NJZCI6ImtyelI3bTBRIiwiZmlyc3ROYW1lIjoiTWFqaWQiLCJsYXN0TmFtZSI6IkFiYmFzaSIsInN0cmVldE5hbWUiOiJDb3VudHkgU3QuIE1pYW1pIiwic3RyZWV0TnVtYmVyIjoiNDMyIiwicG9zdGFsQ29kZSI6IjMzMDE4IiwiY2l0eSI6IlVTIiwiY291bnRyeSI6IkRFIiwicGhvbmUiOiI1OTkzNTc1NjIiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6dHJ1ZSwiaXNEZWZhdWx0U2hpcHBpbmdBZGRyZXNzIjp0cnVlfV19fQ.rlgp17YSpyxqQwdvcv3goNw0ADKO2r_xJmwsAEoeaXE",
  "Commercetools-Frontend-Extension-Version": "devmajidabbasi",
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
