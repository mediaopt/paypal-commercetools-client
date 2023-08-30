import { useState } from "react";
import "./App.css";

import { TestButton } from "./components/TestButton";
import { PayPal } from "./components/PayPal";

function App() {
  const [choosenPaymentMethod, setChoosenPaymentMethod] = useState("");

  const params = {
    clientId: "test",
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
