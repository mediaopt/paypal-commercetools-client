import React from "react";

import { useSettings } from "../../app/useSettings";

import { CardPaymentSource } from "../../types";
import { brandToLogo } from "../../images/brandToLogo";

export type CardProps = Pick<
  CardPaymentSource,
  "brand" | "last_digits" | "expiry" | "name"
> & { id: string };

export const Card: React.FC<CardProps> = ({
  name,
  id,
  brand,
  last_digits,
  expiry,
}) => {
  const { handleRemovePaymentToken } = useSettings();

  return (
    <>
      <td className="justify-center flex">{brandToLogo(brand) ?? brand}</td>
      <td>
        {name} ••• {last_digits}
      </td>
      <td>{expiry}</td>
      <td>
        <button onClick={() => handleRemovePaymentToken(id)}>Remove</button>
      </td>
    </>
  );
};
