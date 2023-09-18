import { useState } from "react";

import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";
import { PayPalMessages } from "./components/PayPalMessages";
import { HostedFields } from "./components/HostedFields";

const COFE_IDENTIFIER: string = "jye";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI5ZTA0ZjMwOS1lYWU1LTQ2ZjItYWIwNC1hN2QxYTgzMGM2YTcifQ.SEvxi_9RonH_kxKR6cHo26YucSkal3B3yg61RFmpFyo";

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
    //createPaymentUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPayment`,
    createPaymentUrl:
      "https://poc-mediaopt2.frontastic.rocks/frontastic/action/payment/createPayment",
    sessionKey: "frontastic-session",
    sessionValue: COFE_SESSION_VALUE,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
  };

  const options = {
    clientId:
      "AQlyw_Usbq3XVXnbs2JfrtmDAzJ2ECVzs4WM7Nm9QkoOWb8_s_C6-bkgs0o4ggzCYp_RhJO5OLS_sEi9",
  };

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
    HostedFields: (
      <HostedFields
        {...params}
        options={{
          ...options,
          components: "hosted-fields,buttons",
          vault: false,
        }}
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
