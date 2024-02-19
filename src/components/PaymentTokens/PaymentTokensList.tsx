import React from "react";

import { Card } from "./Card";
import { PayPal } from "./PayPal";

import { useSettings } from "../../app/useSettings";

export const PaymentTokensList: React.FC = () => {
  const { paymentTokens, handleRemovePaymentToken } = useSettings();

  return paymentTokens && paymentTokens.payment_tokens ? (
    <table cellPadding={5}>
      <thead>
        <tr>
          <th>Method</th>
          <th></th>
          <th>Expires</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {paymentTokens.payment_tokens.map((paymentToken) => {
          const { id, payment_source } = paymentToken;
          const { card, paypal, venmo } = payment_source;
          return (
            <tr key={id}>
              {card ? (
                <Card {...card} id={id} />
              ) : paypal ? (
                <PayPal {...paypal} />
              ) : venmo ? (
                <PayPal {...venmo} />
              ) : (
                <></>
              )}
              <td>
                <button onClick={() => handleRemovePaymentToken(id)}>
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <></>
  );
};
