import React from "react";

import { useSettings } from "../../app/useSettings";

import { CardPaymentSource } from "../../types";
import { brandToLogo } from "../images/brandToLogo";

export type CardProps = Pick<
  CardPaymentSource,
  "brand" | "last_digits" | "expiry" | "name"
> & { id: string } & { onChange?: React.ChangeEventHandler<HTMLInputElement> };

export const Card: React.FC<CardProps> = ({
  name,
  id,
  brand,
  last_digits,
  expiry,
  onChange,
}) => {
  const { handleRemovePaymentToken } = useSettings();

  return (
    <>
      {onChange && (
        <td>
          <input
            type="radio"
            name="pay-with-vaulted-card"
            value={id}
            onChange={onChange}
          />
        </td>
      )}
      <td className="justify-center flex">{brandToLogo(brand) ?? brand}</td>
      <td>
        {name} ••• {last_digits}
      </td>
      <td>{expiry}</td>
      {!onChange && (
        <td>
          <button onClick={() => handleRemovePaymentToken(id)}>Remove</button>
        </td>
      )}
    </>
  );
};
