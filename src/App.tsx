import React, { useState } from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";
import { FUNDING_SOURCE } from "@paypal/paypal-js";

import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";
import { HostedFields } from "./components/HostedFields";
import { PaymentTokens } from "./components/PaymentTokens";
import { PayUponInvoice } from "./components/PayUponInvoice";
import { PayUponInvoiceProps } from "./types";

const CC_FRONTEND_EXTENSION_VERSION: string = "devjonathanyeboah";
const FRONTASTIC_SESSION: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiMmFkYWM1OWMtYzBlNy00NjgzLWE3YjgtODhkOTUxYzg5NjNiIiwiY2FydElkIjoiYjNiM2VmNWEtZWI4Ny00NWVjLWJiYWQtMDNkZjQzZGU5YWNlIiwiYWNjb3VudCI6eyJhY2NvdW50SWQiOiJmMjJhNGZlMy1jMmI4LTQ4MDEtODIwOC00MTRkMjA2MjBlMGIiLCJlbWFpbCI6Im1hamlkLmFiYmFzaUBtZWRpYW9wdC5kZSIsInNhbHV0YXRpb24iOiIiLCJmaXJzdE5hbWUiOiJNYWppZCIsImxhc3ROYW1lIjoiQWJiYXNpIiwiYmlydGhkYXkiOiIxOTg5LTAzLTA1VDAwOjAwOjAwLjAwMFoiLCJjb25maXJtZWQiOnRydWUsImFkZHJlc3NlcyI6W3siYWRkcmVzc0lkIjoiamJUSlhtM00iLCJmaXJzdE5hbWUiOiJNYWppZCIsImxhc3ROYW1lIjoiQWJiYXNpIiwic3RyZWV0TmFtZSI6IkhvY2hzdHJhXHUwMGRmZSAzNyIsInN0cmVldE51bWJlciI6IkhvY2hzdHJhXHUwMGRmZSAzNyIsInBvc3RhbENvZGUiOiIxMzM1NyIsImNpdHkiOiJERSIsImNvdW50cnkiOiJERSIsInBob25lIjoiNTk5MzU3NTYyIiwiaXNEZWZhdWx0QmlsbGluZ0FkZHJlc3MiOmZhbHNlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOmZhbHNlfSx7ImFkZHJlc3NJZCI6ImtyelI3bTBRIiwiZmlyc3ROYW1lIjoiTWFqaWQiLCJsYXN0TmFtZSI6IkFiYmFzaSIsInN0cmVldE5hbWUiOiJDb3VudHkgU3QuIE1pYW1pIiwic3RyZWV0TnVtYmVyIjoiNDMyIiwicG9zdGFsQ29kZSI6IjMzMDE4IiwiY2l0eSI6IlVTIiwiY291bnRyeSI6IkRFIiwicGhvbmUiOiI1OTkzNTc1NjIiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6dHJ1ZSwiaXNEZWZhdWx0U2hpcHBpbmdBZGRyZXNzIjp0cnVlfV19fQ.rlgp17YSpyxqQwdvcv3goNw0ADKO2r_xJmwsAEoeaXE";

function App() {
  const [choosenPaymentMethod, setChoosenPaymentMethod] = useState("");

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

  const requestHeader = {
    "Frontastic-Session": FRONTASTIC_SESSION,
    "Commercetools-Frontend-Extension-Version": CC_FRONTEND_EXTENSION_VERSION,
  };

  const ENDPOINT_URL: string =
    "https://poc-mediaopt2.frontastic.rocks/frontastic/action";

  const commonParams = {
    getSettingsUrl: `${ENDPOINT_URL}/settings/getPayPalSettings`,
    getClientTokenUrl: `${ENDPOINT_URL}/payment/getClientToken`,
    createPaymentUrl: `${ENDPOINT_URL}/payment/createPayment`,
    purchaseCallback: (result: any, options: any) => {
      console.log("Do something", result, options);
    },
  };

  const params = {
    ...commonParams,
    createOrderUrl: `${ENDPOINT_URL}/payment/createPayPalOrder`,
    authorizeOrderUrl: `${ENDPOINT_URL}/payment/authorizePayPalOrder`,
    onApproveUrl: `${ENDPOINT_URL}/payment/capturePayPalOrder`,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
  };

  const vaultParams = {
    getUserInfoUrl: `${ENDPOINT_URL}/payment/getUserInfo`,
    enableVaulting: true,
  };

  const vaultOnlyParams = {
    ...commonParams,
    getUserInfoUrl: `${ENDPOINT_URL}/payment/getUserInfo`,
    enableVaulting: true,
    createVaultSetupTokenUrl: `${ENDPOINT_URL}/payment/createVaultSetupToken`,
    approveVaultSetupTokenUrl: `${ENDPOINT_URL}/payment/approveVaultSetupToken`,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
  };

  const options = {
    clientId:
      "AQlyw_Usbq3XVXnbs2JfrtmDAzJ2ECVzs4WM7Nm9QkoOWb8_s_C6-bkgs0o4ggzCYp_RhJO5OLS_sEi9",
    currency: "EUR",
  };

  const payPalMessagesParams: PayPalMessagesComponentProps = {
    amount: "100.00",
    currency: "EUR",
    style: {
      layout: "text",
    },
    placement: "product",
  };

  const paypalInvoiceParams: PayUponInvoiceProps = {
    merchantId: "W3KJAHBNV5BS6",
    pageId: "checkout-page",
    minPayableAmount: 5, //euro
    maxPayableAmount: 2500, //euro
    customLocale: "de",
  };

  const AllSmartButtonsJson = {
    ...params,
    requestHeader,
    options: { ...options, enableFunding: "paylater" },
  };
  const PayPalJson = {
    ...params,
    requestHeader,
    options,
    fundingSource: "paypal" as FUNDING_SOURCE,
  };
  const PayPalVaultJson = {
    ...params,
    ...vaultParams,
    requestHeader,
    options,
    fundingSource: "paypal" as FUNDING_SOURCE,
  };
  const PayPalMessagesJson = {
    requestHeader,
    ...payPalMessagesParams,
    ...params,
    options: { ...options, components: "messages" },
  };

  const HostedFieldsJson = {
    requestHeader,
    ...params,
    options: {
      ...options,
      components: "hosted-fields,buttons",
      vault: false,
    },
  };

  const PaymentTokensJson = {
    ...params,
    ...vaultParams,
    removePaymentTokenUrl: `${ENDPOINT_URL}/payment/removePaymentToken`,
    requestHeader,
    options,
  };

  const PayUponInvoiceJson = {
    options,
    requestHeader,
    ...params,
    ...paypalInvoiceParams,
  };

  const paymentMethods: { [index: string]: React.JSX.Element } = {
    TestButton: (
      <TestButton {...params} requestHeader={requestHeader} options={options} />
    ),
    AllSmartButtons: <PayPal {...AllSmartButtonsJson} />,
    PayPal: <PayPal {...PayPalJson} />,
    PayPalVault: <PayPal {...PayPalVaultJson} />,
    PayPalVaultOnly: (
      <PayPal
        {...vaultOnlyParams}
        {...vaultParams}
        requestHeader={requestHeader}
        options={options}
        fundingSource="paypal"
      />
    ),
    Venmo: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={{
          ...options,
          components: "messages,buttons",
          buyerCountry: "US",
          enableFunding: "venmo",
        }}
        fundingSource="venmo"
      />
    ),
    VenmoVault: (
      <PayPal
        {...params}
        {...vaultParams}
        requestHeader={requestHeader}
        options={{
          ...options,
          components: "messages,buttons",
          buyerCountry: "US",
          enableFunding: "venmo",
        }}
        fundingSource="venmo"
      />
    ),
    BuyNowPayPal: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={{ ...options, commit: false }}
        fundingSource="paypal"
        onShippingChange={async (data, actions) => {
          //console.log(data, actions);
          //update order shipping information based on data.shipping_address
        }}
        style={{
          label: "buynow",
        }}
      />
    ),
    PayPalLater: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={{
          ...options,
          enableFunding: "paylater",
          components: "messages,buttons",
        }}
        fundingSource="paylater"
        paypalMessages={payPalMessagesParams}
      />
    ),
    PayPalMessages: <PayPalMessages {...PayPalMessagesJson} />,
    Card: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={{
          ...options,
          components: "messages,buttons",
          enableFunding: "card",
        }}
        fundingSource="card"
      />
    ),
    HostedFields: <HostedFields {...HostedFieldsJson} />,
    HostedFieldsVault: (
      <HostedFields
        requestHeader={requestHeader}
        {...params}
        {...vaultParams}
        options={{
          ...options,
          components: "hosted-fields,buttons",
          vault: true,
        }}
      />
    ),
    PaymentTokens: <PaymentTokens {...PaymentTokensJson} />,
    PayUponInvoice: <PayUponInvoice {...PayUponInvoiceJson} />,
  };

  const changePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    setChoosenPaymentMethod(e.target.value);
  };

  return (
    <div className="App">
      {Object.keys(paymentMethods).map((entry, index) => (
        <div key={index}>
          <label>
            <input
              onChange={changePaymentMethod}
              type="radio"
              name="paymentmethod"
              value={entry}
            />
            {entry}
          </label>
        </div>
      ))}
      <div>{paymentMethods[choosenPaymentMethod] ?? <></>}</div>
    </div>
  );
}

export default App;
