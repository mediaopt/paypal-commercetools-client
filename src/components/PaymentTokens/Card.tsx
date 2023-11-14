import React from "react";

import { useSettings } from "../../app/useSettings";

import { CardPaymentSource } from "../../types";

export const Card: React.FC<CardPaymentSource & { id: string }> = ({
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
