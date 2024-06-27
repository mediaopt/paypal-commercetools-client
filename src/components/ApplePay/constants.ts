import {
  testParams,
  testRequestHeader,
  testOptions,
  testVaultParams,
} from "../../constants";

export const applePayTestParams = {
  ...testParams,
  requestHeader: testRequestHeader,
  options: {
    ...testOptions,
    components: "applepay,buttons",
    buyerCountry: "US",
  },
  ...testVaultParams,
  applePayDisplayName: "My Store",
};
export const DEVICE_ERROR = "This device does not support Apple Pay";
