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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiY2I1MDQ4NmEtNzM4NC00NzU5LTkwODktMWZiODE3NGQwZTIzIiwiY2FydElkIjoiYmU5MGJjYWItZGZiYi00MzJkLTkwOGUtN2JlMzI4YTk5NGE0In0.6ReqB2MAPhY1IyJmCZ5DNw_ujbT5pDz0b8TEodBp7yI",
  "Commercetools-Frontend-Extension-Version": "devliudmylamasliuk",
};

const baseUrl = "https://poc-mediaopt2.frontastic.rocks/frontastic/action/";

export const params = {
  createPaymentUrl: `${baseUrl}payment/createPayment`,
  getSettingsUrl: `${baseUrl}settings/getPayPalSettings`,
  createOrderUrl: `${baseUrl}payment/createPayPalOrder`,
  getClientTokenUrl: `${baseUrl}payment/getClientToken`,
  onApproveUrl: `${baseUrl}payment/capturePayPalOrder`,
  authorizeOrderUrl: `${baseUrl}payment/authorizePayPalOrder`,
  shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
  cartInformation: cartInformation,
  purchaseCallback: (result, options) => {
    console.log("Do something", result, options);
  },
};

export const payPalMessagesParams = {
  amount: "100.00",
  currency: "EUR",
  style: {
    layout: "text",
  },
  placement: "product",
};

export const paypalInvoiceParams = {
  merchantId: "W3KJAHBNV5BS6",
  pageId: "checkout-page",
  invoiceBenefitsMessage:
    "Once you place an order, pay within 30 days. Our partner Ratepay will send you the instructions.",
};
