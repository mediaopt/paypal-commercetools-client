import { PayPal } from "../../src/components/PayPal";
import {
  params,
  options,
  payPalMessagesParams,
  requestHeader,
} from "./constants";

export default {
  title: "Components/PayPalPayLater",
  component: PayPal,
  argTypes: {
    fundingSource: {
      table: { disable: true },
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
    options: {
      ...options,
      enableFunding: "paylater",
      components: "messages,buttons",
    },
    fundingSource: "paylater",
    paypalMessages: payPalMessagesParams,
  },
};
