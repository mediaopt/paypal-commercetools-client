import {
  params,
  options,
  requestHeader,
  paypalInvoiceParams,
} from "./constants";
import { PayUponInvoice } from "../../src/components/PayUponInvoice";

export default {
  title: "Components/PayUponInvoice",
  component: PayUponInvoice,
  argTypes: {
    authorizeOrderUrl: {
      table: { disable: true },
    },
  },
};

export const Main = {
  args: {
    options,
    requestHeader,
    ...params,
    paypalInvoiceParams,
  },
};
