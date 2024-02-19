import React from "react";

import { useSettings } from "../../app/useSettings";

import { CardPaymentSource } from "../../types";

const masterCardImage = require("../../images/masterCard.png");
const visaImage = require("../../images/visa.png");

export type CardProps = Pick<
  CardPaymentSource,
  "brand" | "last_digits" | "expiry" | "name"
> & { id: string };

const brandToLogo = (brand: string) => {
  switch (brand.toLowerCase()) {
    case "visa":
      return <img src={visaImage} alt={"Visa"} className="h-9 m-2" />;
    case "mastercard":
      return (
        <img src={masterCardImage} alt={"MasterCard"} className="h-9 m-2" />
      );
  }
};

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
      <td>{brandToLogo(brand) ?? brand}</td>
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
