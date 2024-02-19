import React from "react";

const masterCardImage = require("./masterCard.png");
const visaImage = require("./visa.png");
const paypalImage = require("./PP.png");

export const brandToLogo = (brand: string) => {
  //h*4+my*8=40
  switch (brand.toLowerCase()) {
    case "visa":
      return <img src={visaImage} alt={"Visa"} className="mx-2 h-4 my-3" />;
    case "mastercard":
      return (
        <img
          src={masterCardImage}
          alt={"MasterCard"}
          className="mx-2 h-8 my-1"
        />
      );
    case "paypal":
      return <img src={paypalImage} alt={"PayPal"} className="mx-2 h-6 my-2" />;
  }
};
