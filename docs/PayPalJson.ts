export const PayPalJson = {
  getSettingsUrl: "URL/getPayPalSettings",
  createPaymentUrl: "URL/createPayment",
  createOrderUrl: "URL/createPayPalOrder",
  onApproveUrl: "URL/capturePayPalOrder",
  shippingMethodId: "", //Leave it empty if you do not use shippingMethodId or pass a valid ID
  requestHeader: {
    // this key and value object will be sent as header in the API calls
    KEY1: "VALUE1",
    KEY2: "VALUE2",
  },
  options: {
    clientId: "PAYPAL_CLIENT_ID",
    currency: "EUR",
  },
  fundingSource: "paypal",
  cartInformation: {
    account: {
      email: "CUSTOMER_EMAIL",
    },
    billing: {
      firstName: "CUSTOMER_FIRST_NAME",
      lastName: "CUSTOMER_LAST_NAME",
      streetName: "CUSTOMER_STREET_NAME",
      streetNumber: "CUSTOMER_STREET_NUMBER",
      city: "CUSTOMER_CITY",
      country: "CUSTOMER_COUNTRY_CODE",
      postalCode: "CUSTOMER_POSTAL_CODE",
    },
    shipping: {
      firstName: "CUSTOMER_FIRST_NAME",
      lastName: "CUSTOMER_LAST_NAME",
      streetName: "CUSTOMER_STREET_NAME",
      streetNumber: "CUSTOMER_STREET_NUMBER",
      city: "CUSTOMER_CITY",
      country: "CUSTOMER_COUNTRY_CODE",
      postalCode: "CUSTOMER_POSTAL_CODE",
    },
  },
  purchaseCallback: (result: any, options: any) => {
    // this function will be called after the payment is done
  },
  authenticateThreeDSOrderUrl: "URL/authenticateThreeDSOrder", //For CardFields and GooglePay component
  getClientTokenUrl: "URL/getClientToken", //For CardFields component
  getOrderUrl: "URL/getPayPalOrder", //Optional
  authorizeOrderUrl: "URL/authorizePayPalOrder", // For Vaulting
};
