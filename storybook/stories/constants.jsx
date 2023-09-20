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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJiOGYwN2YzNi1iMTM4LTQwMTUtYTc5Mi03Y2ZhYjg4ODExNDkiLCJ3aXNobGlzdElkIjoiYWU4NGQzNzItMGJjMy00NTM5LWFiMWUtNzhlNmNmNGFlMmEzIn0.o-VuRwGMgmfJM3mb5spHmIcVADIXTvvdt295L_pb_a4",
  "Commercetools-Frontend-Extension-Version": "devmajidabbasi",
};

export const params = {
  createPaymentUrl:
    "https://poc-mediaopt2.frontastic.rocks/frontastic/action/payment/createPayment",
  getSettingsUrl:
    "https://poc-mediaopt2.frontastic.rocks/frontastic/action/settings/getPayPalSettings",
  createOrderUrl:
    "https://poc-mediaopt2.frontastic.rocks/frontastic/action/payment/createPayPalOrder",
  onApproveUrl:
    "https://poc-mediaopt2.frontastic.rocks/frontastic/action/payment/capturePayPalOrder",

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
