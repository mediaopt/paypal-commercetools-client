import i18n from "i18next";

type RatepayErrorType = "paymentSourceNotVerified" | "paymentSourceDeclined";
type ErrorDomain = "pui" | "pp";

const connectToRatepayError = {
  paymentSourceNotVerified: [
    "PAYMENT_SOURCE_INFO_CANNOT_BE_VERIFIED",
    "BILLING_ADDRESS_INVALID",
    "SHIPPING_ADDRESS_INVALID",
  ],
  paymentSourceDeclined: [
    "PAYMENT_SOURCE_DECLINED_BY_PROCESSOR",
    "PAYMENT_SOURCE_CANNOT_BE_USED",
  ],
  merchantIssue: ["INVALID_STRING_LENGTH"],
};

const connectToPaypalError = {
  invalidAddress: [
    "SHIPPING_ADDRESS_INVALID",
    "INVALID_COUNTRY_CODE",
    "POSTAL_CODE_REQUIRED",
  ],
  invalidCurrency: ["INVALID_CURRENCY_CODE"],
};

const errorDomains = { pui: connectToRatepayError, pp: connectToPaypalError };

export const relevantError = (
  orderErrorDetails: string,
  errorDomain: ErrorDomain,
) => {
  const formattedError = orderErrorDetails.replace(/\W/g, "");
  const parcedError = Object.keys(errorDomains[errorDomain]).find((key) =>
    connectToRatepayError[key as RatepayErrorType].includes(formattedError),
  );
  return parcedError && i18n.exists(`pui.${parcedError}`)
    ? parcedError
    : undefined;
};
