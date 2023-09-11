import { PayPal } from "../../src/components/PayPal";
import { params, options } from "./constants";

export default {
  title: "Components/All",
  component: PayPal,
  argTypes: {
    fundingSource: {
      options: [
        "paypal",
        "venmo",
        "applepay",
        "itau",
        "credit",
        "paylater",
        "card",
        "ideal",
        "sepa",
        "bancontact",
        "giropay",
        "sofort",
        "eps",
        "mybank",
        "p24",
        "verkkopankki",
        "payu",
        "blik",
        "trustly",
        "zimpler",
        "maxima",
        "oxxo",
        "boletobancario",
        "wechatpay",
        "mercadopago",
        "multibanco",
      ],
      control: { type: "select" },
    },
  },
};

export const Main = {
  args: {
    ...params,
    options: { ...options, enableFunding: "paylater" },
  },
};
