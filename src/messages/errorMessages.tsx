import i18n from "i18next";

type ErrorDomain = "pui" | "pp";

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

const errorDomains = { pui: connectToRatepayError, pp: connectToPaypalError };

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
