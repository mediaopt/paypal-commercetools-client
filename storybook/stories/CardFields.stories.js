import {
  params,
  options,
  requestHeader,
  vaultParams,
  cardFieldsParams,
} from "./constants";
import { CardFields } from "../../src/components/CardFields";

export default {
  title: "Components/CardFields",
  component: CardFields,
  argTypes: {
    authorizeOrderUrl: {
      table: { disable: true },
    },
  },
};

export const Main = {
  args: {
    ...params,
    requestHeader,
    ...cardFieldsParams,
    options: {
      ...options,
      components: "card-fields,buttons",
      vault: false,
    },
    enableVaulting: false,
  },
};

export const Vault = {
  args: {
    ...params,
    requestHeader,
    ...cardFieldsParams,
    options: {
      ...options,
      components: "card-fields,buttons",
      vault: false,
    },
    ...vaultParams,
  },
};
