import { useState } from "react";
import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";

const COFE_IDENTIFIER: string = "majid";
const COFE_SESSION_VALUE: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI3MGI1MzcwMS0wYjI4LTQ2OGQtYTY4MS0zZmE2MDlmNDI5NzMiLCJ3aXNobGlzdElkIjoiN2JlYWZjNDItZTM2ZS00NjgwLWIzZGQtODkzNjMxY2I1NDUyIn0.0YRwHap7ZqpoSv_wZ3P3mm6i4uFHMybnU-DM-8QoE-c";

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
    clientId: "test",
    createPaymentUrl: `https://poc-${COFE_IDENTIFIER}-mediaopt.frontastic.dev/frontastic/action/payment/createPayment`,
    sessionKey: "frontastic-session",
    sessionValue: COFE_SESSION_VALUE,
    shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
    cartInformation: cartInformation,
  };

  const paymentMethods: { [index: string]: JSX.Element } = {
    TestButton: <TestButton {...params} />,
    PayPal: <PayPal {...params} />,
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
