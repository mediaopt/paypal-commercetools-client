import { PaymentTokens } from "../../src/components/PaymentTokens";
import { paymentTokensJson } from "./constants";

export default {
  title: "Components/PaymentTokens",
  component: PaymentTokens,
  argTypes: {},
};

export const Main = {
  args: {
    ...paymentTokensJson,
  },
};
