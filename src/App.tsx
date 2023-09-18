import { useState } from "react";

import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";

const CC_FRONTEND_EXTENSION_VERSION: string = "devmajidabbasi";
const FRONTASTIC_SESSION: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJhMDBkZjRlMy1kZmZlLTRkODQtYTVjNy0xZjE3ZTg4NmE2YzQiLCJ3aXNobGlzdElkIjoiOWJmZTI5NGYtYjdkMC00NTQzLWJhYjEtNzg1MDhlN2NhN2Q1In0._71Asf9PEMQw0T2uy9GAdOsYq7dmc8D0Aoe9X-7n1Vk";

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

  const params = {
    createPaymentUrl:
      "https://poc-mediaopt2.frontastic.rocks/frontastic/action/payment/createPayment",
    getSettingsUrl:
      "https://poc-mediaopt2.frontastic.rocks/frontastic/action/settings/getSettings",
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
  };

  const options = { clientId: "test" };

  const paymentMethods: { [index: string]: JSX.Element } = {
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
    PayPalLater: (
      <PayPal
        {...params}
        requestHeader={requestHeader}
        options={{ ...options, enableFunding: "paylater" }}
        fundingSource="paylater"
      />
    ),
    PayPalMessages: (
      <PayPalMessages
        {...params}
        requestHeader={requestHeader}
        amount="100.00"
        currency="USD"
        style={{
          layout: "text",
        }}
        placement="product"
        options={{ ...options, components: "messages" }}
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
