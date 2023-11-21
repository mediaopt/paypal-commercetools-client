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

const CC_FRONTEND_EXTENSION_VERSION: string = "devmajidabbasi";
const FRONTASTIC_SESSION: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJiNTQzNjU3MS04MDk2LTQ3ZmUtYjkzZC1lYWExNDgxZTExYTYiLCJhY2NvdW50Ijp7ImFjY291bnRJZCI6ImYyMmE0ZmUzLWMyYjgtNDgwMS04MjA4LTQxNGQyMDYyMGUwYiIsImVtYWlsIjoibWFqaWQuYWJiYXNpQG1lZGlhb3B0LmRlIiwic2FsdXRhdGlvbiI6IiIsImZpcnN0TmFtZSI6Ik1hamlkIiwibGFzdE5hbWUiOiJBYmJhc2kiLCJiaXJ0aGRheSI6IjE5ODktMDMtMDVUMDA6MDA6MDAuMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiYWRkcmVzc2VzIjpbeyJhZGRyZXNzSWQiOiJqYlRKWG0zTSIsImZpcnN0TmFtZSI6Ik1hamlkIiwibGFzdE5hbWUiOiJBYmJhc2kiLCJzdHJlZXROYW1lIjoiSG9jaHN0cmFcdTAwZGZlIDM3Iiwic3RyZWV0TnVtYmVyIjoiSG9jaHN0cmFcdTAwZGZlIDM3IiwicG9zdGFsQ29kZSI6IjEzMzU3IiwiY2l0eSI6IkRFIiwiY291bnRyeSI6IkRFIiwicGhvbmUiOiI1OTkzNTc1NjIiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9LHsiYWRkcmVzc0lkIjoia3J6UjdtMFEiLCJmaXJzdE5hbWUiOiJNYWppZCIsImxhc3ROYW1lIjoiQWJiYXNpIiwic3RyZWV0TmFtZSI6IkNvdW50eSBTdC4gTWlhbWkiLCJzdHJlZXROdW1iZXIiOiI0MzIiLCJwb3N0YWxDb2RlIjoiMzMwMTgiLCJjaXR5IjoiVVMiLCJjb3VudHJ5IjoiREUiLCJwaG9uZSI6IjU5OTM1NzU2MiIsImlzRGVmYXVsdEJpbGxpbmdBZGRyZXNzIjp0cnVlLCJpc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MiOnRydWV9XX0sIndpc2hsaXN0SWQiOiJjZTM4MzVkMC02OWM0LTRlZWUtYTBjZC1hM2I4NjgyYTU2OTUifQ.A6UsbrTRFH1eKM6egNJQvnTckM4nBPU_N-sFIRcR9j0";

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
