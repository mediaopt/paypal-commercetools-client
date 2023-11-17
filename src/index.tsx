// react 17.0.2

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("commercetools-paypal-root")
);

const commercetoolsPaypalComponent = document.getElementById(
  "commercetools-paypal-component"
);
const paymentMethod = commercetoolsPaypalComponent?.getAttribute(
  "data-payment-method"
);
ReactDOM.render(
  <React.StrictMode>
    {paymentMethod === "paypal" && <>paypal</>}
    {paymentMethod === "hosted-fields" && <>hosted-fields</>}
  </React.StrictMode>,
  commercetoolsPaypalComponent
);
