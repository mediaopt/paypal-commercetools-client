// react 17.0.2

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";
import { HostedFields } from "./components/HostedFields";
import { PaymentTokens } from "./components/PaymentTokens";
import { PayUponInvoice } from "./components/PayUponInvoice";

const rootElement = document.getElementById("commercetools-paypal-root");
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}

const commercetoolsPaypalComponent = document.getElementById(
  "commercetools-paypal-component"
);
if (commercetoolsPaypalComponent) {
  const paymentMethod = commercetoolsPaypalComponent?.getAttribute(
    "data-payment-method"
  );
  const request = JSON.parse(
    commercetoolsPaypalComponent?.getAttribute("data-request") as string
  );
  ReactDOM.render(
    <React.StrictMode>
      {paymentMethod === "paypal" && <PayPal {...request} />}
      {paymentMethod === "hosted-fields" && <HostedFields {...request} />}
      {paymentMethod === "payment-tokens" && <PaymentTokens {...request} />}
      {paymentMethod === "paypal-messages" && <PayPalMessages {...request} />}
      {paymentMethod === "pay-upon-invoice" && <PayUponInvoice {...request} />}
    </React.StrictMode>,
    commercetoolsPaypalComponent
  );
}
