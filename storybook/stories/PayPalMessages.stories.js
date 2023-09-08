import { PayPalMessages } from "../../src/components/PayPalMessages";
import { params, options } from "./constants";

export default {
  title: "Components/PayPalMessages",
  component: PayPalMessages,
  argTypes: {
    fundingSource: {
      table: { disable: true },
    },
  },
};

export const Main = {
  args: {
    ...params,
    options: { ...options, components: "messages" },
    fundingSource: "paylater",
    amount: "100.00",
    currency: "USD",
    style: {
      layout: "text",
    },
  },
};
