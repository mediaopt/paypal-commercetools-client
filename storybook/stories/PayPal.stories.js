import { PayPal } from "../../src/components/PayPal";
import { params, options, requestHeader } from "./constants";

export default {
  title: "Components/PayPal",
  component: PayPal,
  argTypes: {
    fundingSource: {
      table: { disable: true },
    },
  },
};

export const Main = {
  args: {
    ...params,
    requestHeader,
    options,
    fundingSource: "paypal",

    style: {
      color: "gold",
      height: 55,
      label: "pay",
      layout: "vertical",
      shape: "rect",
      tagline: false,
    },
  },
};
