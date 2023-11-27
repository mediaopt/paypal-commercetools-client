import * as React from "react";

import { render } from "@testing-library/react";
import { PayUponInvoiceProps } from "../../types";

import { PayUponInvoice } from "./index";

const fraudNetUrl = "https://c.paypal.com/da/r/fb.js";

const cartInformation = {
  account: {
    email: "payment_source_info_cannot_be_verified@example.com",
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

const commonParams = {
  getSettingsUrl: " ",
  getClientTokenUrl: " ",
  createPaymentUrl: " ",
  purchaseCallback: (result: any, options: any) => {
    console.log("Do something", result, options);
  },
};

const params = {
  ...commonParams,
  createOrderUrl: "",
  authorizeOrderUrl: "",
  onApproveUrl: "",
  shippingMethodId: "",
  cartInformation: cartInformation,
};

const options = {
  clientId: " ",
  currency: " ",
};

const paypalInvoiceParams: PayUponInvoiceProps = {
  merchantId: "",
  pageId: "checkout-page",
  minPayableAmount: 5, //euro
  maxPayableAmount: 2500, //euro
  customLocale: "de",
};
const requestHeader = {
  "Frontastic-Session": "",
  "Commercetools-Frontend-Extension-Version": "",
};

const PayUponInvoiceJson = {
  options,
  requestHeader,
  ...params,
  ...paypalInvoiceParams,
};

test("Fraud net script is loaded on PUI render", () => {
  render(<PayUponInvoice {...PayUponInvoiceJson} />);
  const fraudnetScript = document.querySelectorAll(
    `script[src="${fraudNetUrl}"]`,
  );
  expect(fraudnetScript.length).toEqual(1);
});
