import { HostedFields } from "../../src/components/HostedFields";
import { params, options, requestHeader, vaultParams } from "./constants";

export default {
  title: "Components/HostedFields",
  component: HostedFields,
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
    options: {
      ...options,
      components: "hosted-fields,buttons",
      vault: false,
    },
    enableVaulting: false,
  },
};

export const Vault = {
  args: {
    ...params,
    requestHeader,
    options: {
      ...options,
      components: "hosted-fields,buttons",
      vault: false,
    },
    ...vaultParams,
  },
};
