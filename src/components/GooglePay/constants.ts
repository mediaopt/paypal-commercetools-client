import { testParams, testRequestHeader, testOptions } from "../../constants";
import {
  GooglePayOptionsType,
  SmartComponentsProps,
  ThreeDSVerification,
} from "../../types";

export const GooglePayTestParams: SmartComponentsProps & GooglePayOptionsType =
  {
    ...testParams,
    requestHeader: testRequestHeader,
    options: { ...testOptions, components: "googlepay" },
    environment: "TEST" as "TEST",
    allowedCardNetworks: ["MASTERCARD", "VISA"],
    allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    callbackIntents: ["PAYMENT_AUTHORIZATION"],
    verificationMethod: "SCA_ALWAYS" as ThreeDSVerification,
  };
