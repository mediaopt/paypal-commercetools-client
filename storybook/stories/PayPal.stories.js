import { PayPal } from "../../src/components/PayPal";
import { params, options } from "./constants";

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
    ...options,
    fundingSource: "paypal",

    createOrder: () => Promise < string > {},
    onApprove: () => void {},
    onCancel: () => void {},
    onClick: () => void {},
    onError: () => void {},
    onInit: () => void {},
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
