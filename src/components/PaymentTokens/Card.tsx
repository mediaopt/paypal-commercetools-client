import React from "react";

import { useSettings } from "../../app/useSettings";

import { CardPaymentSource } from "../../types";

export type CardProps = Pick<
  CardPaymentSource,
  "brand" | "last_digits" | "expiry"
> & { id: string };

export const Card: React.FC<CardProps> = ({
  id,
  brand,
  last_digits,
  expiry,
}) => {
  const { handleRemovePaymentToken } = useSettings();
  return (
    <>
      <td>
        <img src={require("./visa.png")} width={30} alt="PayPal" />
      </td>
      <td>
        {brand} ending in {last_digits}
      </td>
      <td>{expiry}</td>
      <td>
        <button onClick={() => handleRemovePaymentToken(id)}>Remove</button>
      </td>
    </>
  );
};
