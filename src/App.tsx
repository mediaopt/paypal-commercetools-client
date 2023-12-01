import React, { useState } from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";

import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";
import { HostedFields } from "./components/HostedFields";
import { PaymentTokens } from "./components/PaymentTokens";
import { CardFields } from "./components/CardFields";

const CC_FRONTEND_EXTENSION_VERSION: string = "devjonathanyeboah";
const FRONTASTIC_SESSION: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI3OGMxODdmZC03OWU4LTQ3ZmMtYjJhOS1jZTI1NTYyNTVjNTYiLCJhY2NvdW50Ijp7ImFjY291bnRJZCI6Ijk2ZmM1YzE2LTg5OWEtNGYwNS1hMWU5LTkyMjY3NmY3MDU1MCIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJiaXJ0aGRheSI6IjE5NDMtMTItMThUMDA6MDA6MDAuMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiYWRkcmVzc2VzIjpbeyJhZGRyZXNzSWQiOiI0MXU5VlozeCIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInN0cmVldE5hbWUiOiJTZWNvbmQgU3RyZWV0Iiwic3RyZWV0TnVtYmVyIjoiMTMiLCJwb3N0YWxDb2RlIjoiMTIzNDUiLCJjaXR5IjoiRXhhbXBsZSBDaXR5IiwiY291bnRyeSI6Ik5MIiwicGhvbmUiOiIrMzExMjM0NTY3ODAiLCJpc0RlZmF1bHRCaWxsaW5nQWRkcmVzcyI6ZmFsc2UsImlzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcyI6ZmFsc2V9XX0sIndpc2hsaXN0SWQiOiJlNzFhYTEyNC1kZGZmLTQxYzktYmYxOC0wZDk2ZjNhODI0Y2QifQ.ZIYl_YDppcyf27xmCqAF8yUf2wrbmr46nbqw1qmX9Qo";

function App() {
  const [choosenPaymentMethod, setChoosenPaymentMethod] = useState("");

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

  const requestHeader = {
    "Frontastic-Session": FRONTASTIC_SESSION,
    "Commercetools-Frontend-Extension-Version": CC_FRONTEND_EXTENSION_VERSION,
  };

  const ENDPOINT_URL: string =
    "https://poc-mediaopt2.frontastic.rocks/frontastic/action";

  const params = {
    createPaymentUrl: `${ENDPOINT_URL}/payment/createPayment`,
    authenticateThreeDSOrderUrl: `${ENDPOINT_URL}/payment/authenticateThreeDSOrder`,
    getSettingsUrl: `${ENDPOINT_URL}/settings/getPayPalSettings`,
    /*getClientTokenUrl: `${ENDPOINT_URL}/payment/getClientToken`,*/
    createOrderUrl: `${ENDPOINT_URL}/payment/createPayPalOrder`,
    authorizeOrderUrl: `${ENDPOINT_URL}/payment/authorizePayPalOrder`,
    onApproveUrl: `${ENDPOINT_URL}/payment/capturePayPalOrder`,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
    purchaseCallback: (result: any, options: any) => {
      console.log("Do something", result, options);
    },
  };

  const vaultParams = {
    getUserInfoUrl: `${ENDPOINT_URL}/payment/getUserInfo`,
    enableVaulting: true,
  };

  const vaultOnlyParams = {
    getUserInfoUrl: `${ENDPOINT_URL}/payment/getUserInfo`,
    enableVaulting: true,
    createPaymentUrl: `${ENDPOINT_URL}/payment/createPayment`,
    getSettingsUrl: `${ENDPOINT_URL}/settings/getPayPalSettings`,
    getClientTokenUrl: `${ENDPOINT_URL}/payment/getClientToken`,

    createVaultSetupTokenUrl: `${ENDPOINT_URL}/payment/createVaultSetupToken`,
    approveVaultSetupTokenUrl: `${ENDPOINT_URL}/payment/approveVaultSetupToken`,

    purchaseCallback: (result: any, options: any) => {
      console.log("Do something", result, options);
    },
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

  const paymentMethods: { [index: string]: React.JSX.Element } = {
    TestButton: (
      <TestButton {...params} requestHeader={requestHeader} options={options} />
    ),
    AllSmartButtons: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={{ ...options, enableFunding: "paylater" }}
      />
    ),
    PayPal: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={options}
        fundingSource="paypal"
      />
    ),
    PayPalVault: (
      <PayPal
        {...params}
        {...vaultParams}
        requestHeader={requestHeader}
        options={options}
        fundingSource="paypal"
      />
    ),
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
    PayPalMessages: (
      <PayPalMessages
        requestHeader={requestHeader}
        {...payPalMessagesParams}
        {...params}
        options={{ ...options, components: "messages" }}
      />
    ),
    CardFields: (
      <CardFields
        requestHeader={requestHeader}
        {...params}
        options={{
          ...options,
          components: "card-fields,buttons",
          vault: true,
        }}
        {...vaultParams}
      />
    ),
    CardFieldsVaultOnly: (
      <CardFields
        requestHeader={requestHeader}
        options={{
          ...options,
          components: "card-fields,buttons",
          vault: true,
        }}
        {...vaultParams}
        {...vaultOnlyParams}
      />
    ),
    HostedFields: (
      <HostedFields
        requestHeader={requestHeader}
        {...params}
        options={{
          ...options,
          components: "hosted-fields,buttons",
          vault: false,
        }}
      />
    ),
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
    PaymentTokens: (
      <PaymentTokens
        {...params}
        {...vaultParams}
        removePaymentTokenUrl={`${ENDPOINT_URL}/payment/removePaymentToken`}
        requestHeader={requestHeader}
        options={options}
      />
    ),
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
