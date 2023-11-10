import React from "react";

import { useSettings } from "../../app/useSettings";

import { PayPalPaymentSource } from "../../types";

export const PayPal: React.FC<PayPalPaymentSource & { id: string }> = ({
  id,
  email_address,
}) => {
  const { handleRemovePaymentToken } = useSettings();
  return (
    <>
      <td>
        <img src={require("./PP.png")} width={30} alt="PayPal" />
      </td>
      <td>{email_address}</td>
      <td>N/A</td>
      <td>
        <button onClick={() => handleRemovePaymentToken(id)}>Remove</button>
      </td>
    </>
  );
};
