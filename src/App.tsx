import React, { useState } from "react";
import { PayPalMessagesComponentProps } from "@paypal/react-paypal-js";
import { FUNDING_SOURCE } from "@paypal/paypal-js";

import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";
import { HostedFields } from "./components/HostedFields";
import { PaymentTokens } from "./components/PaymentTokens";
import { CardFields } from "./components/CardFields";
import { PayUponInvoice } from "./components/PayUponInvoice";
import {
  GooglePayOptionsType,
  PayUponInvoiceProps,
  SmartComponentsProps,
  ThreeDSVerification,
} from "./types";
import { GooglePay } from "./components/GooglePay";

const CC_FRONTEND_EXTENSION_VERSION: string = "devjonathanyeboah";
//const CC_FRONTEND_EXTENSION_VERSION: string = "devliudmylamasliuk";
const FRONTASTIC_SESSION: string =
  //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiNzQ0NTUxY2YtMWVjMS00OWJmLWIwOTMtM2I1YTEzMGU3MTE0IiwiY2FydElkIjoiZWFmZWVkNmQtZGI4Mi00ODk3LTg0MzUtNmNiYTc0YzI0YzcxIn0.NheVsGS4gqwGdxKDU4GouDKfT3cuS6NIyK8rwcDpQeY";
  //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI4OWVhYmFjYS0wM2VmLTRmNWMtYmU2MC0yMTFkY2U2ZDIxMzEifQ.fpwkrtAp796VwjQb8mIHKi4NuqOpAzrfKiJRvfEqsJ0";
  //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiOGUzM2E4YmMtODAyNy00MjYxLWI0ZGMtYWM0YTQ3ZTIzZTE1IiwiY2FydElkIjoiN2I2NjM4MTYtYzk0Yi00MzIzLWI0ZTgtMmVjZmU1ZTJiNWJhIn0.rkW35uUhEGyaQopayLceH-YoHuEuw26Kd5690t6L_EY";
  //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiMTYwYzFkM2EtZDZlNC00ZTc3LWJlZWMtZTg5OThkM2JiMjEwIiwiY2FydElkIjoiYWFjMGVhZTEtNDg4ZC00YTZjLTgzMWMtYjE3ZjRmMWE1NzllIn0.03vHCrgCfgmp4jC1g1w7yFaQCLYnF1pDVnirqxIxP1c";
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJhMGFkZjllNy00YmJlLTRiMzgtYmZjZS1mMTdlMWFiZDM0OTcifQ.dFSz1WocjOFGUkHqjQYdkT1DEebN63vp0MrZzIXXoIM";
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
    getOrderUrl: `${ENDPOINT_URL}/payment/getPayPalOrder`,
    authorizeOrderUrl: `${ENDPOINT_URL}/payment/authorizePayPalOrder`,
    onApproveUrl: `${ENDPOINT_URL}/payment/capturePayPalOrder`,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
    authenticateThreeDSOrderUrl: `${ENDPOINT_URL}/payment/authenticateThreeDSOrder`,
  };

  const vaultParams = {
    getUserInfoUrl: `${ENDPOINT_URL}/payment/getUserInfo`,
    enableVaulting: true,
  };

  const vaultOnlyParams = {
    ...commonParams,
    ...vaultParams,
    createVaultSetupTokenUrl: `${ENDPOINT_URL}/payment/createVaultSetupToken`,
    approveVaultSetupTokenUrl: `${ENDPOINT_URL}/payment/approveVaultSetupToken`,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
  };

  const options = {
    clientId:
      //"ATUW0KT0pNdyWys2AzvohAWPhmo6zx6OH25SP8RtPRZFW60fiizfnywDJVekwddhHlxw1ac3ApQwUoQ8", //prod
      //"ASIX4GwxjaJ8t603IAUySrbFPTDijGxtNigDRxbuO4E4HVsUzpYYzfVq99MhIZ6dS0AAKjPpeHNj5tyS", //test
      "AQlyw_Usbq3XVXnbs2JfrtmDAzJ2ECVzs4WM7Nm9QkoOWb8_s_C6-bkgs0o4ggzCYp_RhJO5OLS_sEi9", //g pay
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

  const GooglePayParams = {
    requestHeader,
    ...params,
    options: { ...options, components: "googlepay" },
    environment: "TEST" as "TEST",
    allowedCardNetworks: ["MASTERCARD", "VISA"],
    allowedCardAuthMethods: ["PAN_ONLY"],
    callbackIntents: ["PAYMENT_AUTHORIZATION"],
    verificationMethod: "SCA_ALWAYS" as ThreeDSVerification,
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
        onApproveRedirectionUrl="https://poc-mediaopt2.frontend.site/cart"
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
    GooglePay: <GooglePay {...GooglePayParams} />,
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
