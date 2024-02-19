import React from "react";

import { Card } from "./Card";
import { PayPal } from "./PayPal";

import { useSettings } from "../../app/useSettings";

export const PaymentTokensList: React.FC = () => {
  const { paymentTokens } = useSettings();

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
          return card ? (
            <tr key={id}>
              <Card {...card} id={id} />
            </tr>
          ) : paypal ? (
            <tr key={id}>
              <PayPal {...paypal} id={id} />
            </tr>
          ) : venmo ? (
            <tr key={id}>
              <PayPal {...venmo} id={id} />
            </tr>
          ) : (
            <></>
          );
        })}
      </tbody>
    </table>
  ) : (
    <></>
  );
};
