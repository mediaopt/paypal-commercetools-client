import i18n from "i18next";
import { TFunction } from "i18next";
import { SetStringState } from "../types";

type ErrorDomain = "invoice" | "payPal";

interface Messages {
  [name: string]: string[];
}

const connectToRatepayError: Messages = {
  paymentSourceNotVerified: [
    "PAYMENT_SOURCE_INFO_CANNOT_BE_VERIFIED",
    "BILLING_ADDRESS_INVALID",
    "SHIPPING_ADDRESS_INVALID",
  ],
  paymentSourceDeclined: [
    "PAYMENT_SOURCE_DECLINED_BY_PROCESSOR",
    "PAYMENT_SOURCE_CANNOT_BE_USED",
  ],
};

const connectToPaypalError: Messages = {
  invalidAddress: [
    "SHIPPING_ADDRESS_INVALID",
    "INVALID_COUNTRY_CODE",
    "POSTAL_CODE_REQUIRED",
  ],
  invalidCurrency: ["INVALID_CURRENCY_CODE"],
};

const errorDomains = {
  invoice: connectToRatepayError,
  payPal: connectToPaypalError,
};

const findStringInArray = (errorsList: Messages, error: string) => {
  return Object.keys(errorsList).find((key) => errorsList[key].includes(error));
};

export const relevantError = (
  orderErrorDetails: string,
  errorDomain: ErrorDomain,
) => {
  const formattedError = orderErrorDetails.replace(/\W/g, "");
  const parsedError = findStringInArray(
    errorDomains[errorDomain],
    formattedError,
  );
  return parsedError && i18n.exists(`${errorDomain}.${parsedError}`)
    ? `${errorDomain}.${parsedError}`
    : undefined;
};

export const handleResponseError = (
  t: TFunction<any, any>,
  errorDetails?: string,
  errorMessage?: string,
  showError?: SetStringState,
) => {
  if (!errorDetails)
    throw new Error(errorMessage ?? "", { cause: t("interface.generalError") });
  else if (showError) {
    const ratepayError = relevantError(errorDetails, "invoice");
    if (ratepayError && showError) showError(ratepayError);
    else
      throw new Error(errorMessage ?? "", {
        cause: ratepayError ?? t("invoice.thirdPartyIssue"),
      });
  } else {
    const paypalError = relevantError(errorDetails, "payPal");
    throw new Error(errorMessage ?? "", {
      cause: paypalError ? t(paypalError) : t("payPal.unknownIssue"),
    });
  }
};
