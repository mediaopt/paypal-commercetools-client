import React from "react";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

import { Card } from "./Card";
import { PayPal } from "./PayPal";

import { useSettings } from "../../app/useSettings";

export const PaymentTokensList: React.FC<PayPalButtonsComponentProps> = (
  props
) => {
  const { paymentTokens } = useSettings();

  if (paymentTokens && paymentTokens.payment_tokens) {
  }

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

          if (card) {
            return (
              <tr key={id}>
                <Card {...card} id={id} />
              </tr>
            );
          }

          if (paypal) {
            return (
              <tr key={id}>
                <PayPal {...paypal} id={id} />
              </tr>
            );
          }

          if (venmo) {
            return (
              <tr key={id}>
                <PayPal {...venmo} id={id} />
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  ) : (
    <></>
  );
};
