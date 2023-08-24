import React from "react";
import "./App.css";

import {
  ShippingAddressOverride,
  Shipping,
  PayPalShippingOptions,
  LineItem,
} from "./types";



const COFE_IDENTIFIER: string = "jye";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIxZDQ1OGJiNC01OTk3LTRiNmYtOWU5Mi1mMGYwMzJlYTAwYzYiLCJhY2NvdW50Ijp7ImFjY291bnRJZCI6IjJkODNmNDcwLWZiNTktNGY5ZS1hYjcxLWRkMjdiMzBlZjI2NiIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJiaXJ0aGRheSI6IjE5NzQtMDktMjBUMDA6MDA6MDAuMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiYWRkcmVzc2VzIjpbeyJhZGRyZXNzSWQiOiJJZ2RnNmtudiIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IkRvZSIsInN0cmVldE5hbWUiOiJGaXJzdCBTdHJlZXQiLCJzdHJlZXROdW1iZXIiOiIxMiIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJFeGFtcGxlIENpdHkiLCJjb3VudHJ5IjoiVVMiLCJwaG9uZSI6IiszMTIzNDU2NzgiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9LHsiYWRkcmVzc0lkIjoiaW13blJQUkYiLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJzdHJlZXROYW1lIjoiVGhpcmQgU3RyZWV0Iiwic3RyZWV0TnVtYmVyIjoiMzQiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiRXhhbXBsZSBDaXR5IiwiY291bnRyeSI6Ik5MIiwicGhvbmUiOiIrMzExMjM0NTY3OCIsImlzRGVmYXVsdEJpbGxpbmdBZGRyZXNzIjp0cnVlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOnRydWV9LHsiYWRkcmVzc0lkIjoiWmVhMzBNdWkiLCJmaXJzdE5hbWUiOiJTaW1lb25lIiwibGFzdE5hbWUiOiJFbHNlIiwic3RyZWV0TmFtZSI6IlVubmFtZWRzdHIiLCJzdHJlZXROdW1iZXIiOiIyMzQiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiVG93biIsImNvdW50cnkiOiJERSIsInBob25lIjoiMTI0MzI1MzY1NDY0MjMxNDM1NjciLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9XX0sIndpc2hsaXN0SWQiOiI3NGRjOGQzMi1mYmRmLTQ2OWMtYWY3ZS1jOWQ2MTYxMjI3YzAifQ.H9QMibJLj3HnXVPF-F1NwuKncro-tqyAPnTVHD108xM";

function App() {
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

  const lineItems: LineItem[] = [
    {
      name: "Product",
      kind: "debit",
      quantity: "6",
      unitAmount: "1.00",
      unitOfMeasure: "unit",
      totalAmount: "6.00",
      taxAmount: "0.00",
      discountAmount: "0.00",
      productCode: "54321",
      commodityCode: "98765",
    },
  ];

  const shipping: Shipping = {
    firstName: "Majid",
    lastName: "Abbasi",
  };

  const shippingOptions: PayPalShippingOptions[] = [
    {
      amount: 3.0,
      countryCode: "DE",
    },
    {
      amount: 4.0,
      countryCode: "US",
    },
  ];

  const params = {
    createPaymentUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPayment`,
    getClientTokenUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken`,
    purchaseUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase`,
    sessionKey: "frontastic-session",
    sessionValue: COFE_SESSION_VALUE,
    purchaseCallback: (result: any, options: any) => {
      console.log("Do something", result, options);
    },
    fullWidth: true,
    buttonText: "Pay €X",
    cartInformation: cartInformation,
    lineItems: lineItems,
    shipping: shipping,
    taxAmount: "0.00",
    shippingAmount: "0.00",
    discountAmount: "0.00",
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
  };

  const vaultingParams = {
    createPaymentForVault: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPaymentForVault`,
    vaultPaymentMethodUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/vaultPaymentMethod`,
    isPureVault: true,
  };

  const paypalShippingAddressOverride: ShippingAddressOverride = {
    recipientName: "Scruff McGruff",
    line1: "1234 Main St.",
    line2: "Unit 1",
    city: "Chicago",
    countryCode: "US",
    postalCode: "60652",
    state: "IL",
    phone: "123.456.7890",
  };


  return (
    <div className="App">
      PayPal comercetools client
    </div>
  );
}

export default App;
