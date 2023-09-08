import { useState } from "react";

import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";

const COFE_IDENTIFIER: string = "majid";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJjZDNiYjhmOS1jOTQzLTRmMGUtYmZiZS04Y2I5ZmUyMDExYTYiLCJ3aXNobGlzdElkIjoiZmYwODI3OGYtMzdjOC00YmJkLTgzZmItYmQ1NjFkNTQ5YTcyIn0.YefiGWoAm2sEDCth2BdbSm_K2AAETog1keX6ycoEvAk";

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

  const params = {
    createPaymentUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPayment`,
    sessionKey: "frontastic-session",
    sessionValue: COFE_SESSION_VALUE,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
  };

  const options = { clientId: "test" };

  const paymentMethods: { [index: string]: JSX.Element } = {
    TestButton: <TestButton {...params} options={options} />,
    AllSmartButtons: (
      <PayPal {...params} options={{ ...options, enableFunding: "paylater" }} />
    ),
    PayPal: <PayPal {...params} options={options} fundingSource="paypal" />,
    PayPalLater: (
      <PayPal
        {...params}
        options={{ ...options, enableFunding: "paylater" }}
        fundingSource="paylater"
      />
    ),
    PayPalMessages: (
      <PayPalMessages
        {...params}
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
