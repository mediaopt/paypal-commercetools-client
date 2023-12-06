import { PayPal } from "../../src/components/PayPal";
import { params, options, requestHeader } from "./constants";

export default {
  title: "Components/All",
  component: PayPal,
  argTypes: {
    fundingSource: {
      options: [
        "",
        "paypal",
        "venmo",
        "applepay",
        "itau",
        "credit",
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
    getClientTokenUrl: {
      table: { disable: true },
    },
  },
};

export const Main = {
  args: {
    ...params,
    requestHeader,
    options: { ...options, enableFunding: "paylater" },
    style: {
      label: "pay",
    },
  },
};
