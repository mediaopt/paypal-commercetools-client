import { PayPal } from "../../src/components/PayPal";
import {
  params,
  options,
  requestHeader,
  vaultParams,
  vaultOnlyParams,
} from "./constants";

export default {
  title: "Components/PayPal",
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
    options,
    fundingSource: "paypal",

    style: {
      color: "gold",
      height: 55,
      label: "pay",
      layout: "vertical",
      shape: "rect",
      tagline: false,
    },
  },
};

export const Vault = {
  args: {
    ...params,
    ...vaultParams,
    requestHeader,
    options,
    fundingSource: "paypal",

    style: {
      color: "gold",
      height: 55,
      label: "pay",
      layout: "vertical",
      shape: "rect",
      tagline: false,
    },
  },
};

export const VaultOnly = {
  args: {
    ...vaultOnlyParams,
    requestHeader,
    options,
    fundingSource: "paypal",

    style: {
      color: "gold",
      height: 55,
      label: "pay",
      layout: "vertical",
      shape: "rect",
      tagline: false,
    },
  },
};

export const BuyNow = {
  args: {
    ...params,
    requestHeader,
    options: { ...options, commit: false },
    onShippingChange: (data, actions) => {
      console.log(data, actions);
    },
    fundingSource: "paypal",

    style: {
      color: "gold",
      height: 55,
      label: "buynow",
      layout: "vertical",
      shape: "rect",
      tagline: false,
    },
  },
};
