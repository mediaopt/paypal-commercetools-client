import { PayPal } from "../../src/components/PayPal";
import { params, options } from "./constants";

export default {
  title: "Components/PayPalPayLater",
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
    options: { ...options, enableFunding: "paylater" },
    fundingSource: "paylater",
  },
};
