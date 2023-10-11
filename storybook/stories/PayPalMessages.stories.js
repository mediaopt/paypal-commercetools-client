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
    onApproveUrl: {
      table: { disable: true },
    },
    authorizeOrderUrl: {
      table: { disable: true },
    },
    getClientTokenUrl: {
      table: { disable: true },
    },
    shippingMethodId: {
      table: { disable: true },
    },
    cartInformation: {
      table: { disable: true },
    },
    purchaseCallback: {
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
