import { HostedFields } from "../../src/components/HostedFields";
import { params, options, requestHeader } from "./constants";

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
  },
};
