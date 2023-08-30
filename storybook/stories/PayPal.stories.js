import { PayPal } from "../../src/components/PayPal";
import { params } from "./constants";

export default {
  title: "Components/PayPal",
  component: PayPal,
};

export const Main = {
  args: {
    ...params,
  },
};
