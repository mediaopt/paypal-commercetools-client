import { PayPalMessages } from "../../src/components/PayPalMessages";
import {
  params,
  options,
  payPalMessagesParams,
  requestHeader,
} from "./constants";

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
    requestHeader,
    options: { ...options, components: "messages" },
    ...payPalMessagesParams,
  },
};
