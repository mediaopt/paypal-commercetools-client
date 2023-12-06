import i18n from "i18next";
import { TFunction } from "i18next";
import { SetStringState } from "../types";

export const handleResponseError = (
  t: TFunction<any, any>,
  errorDetails?: string,
  errorMessage?: string,
  showError?: SetStringState,
) => {
  if (!errorDetails)
    throw new Error(errorMessage ?? "", { cause: t("interface.generalError") });
  else if (showError) {
    const ratepayError = `invoice.${errorDetails}`;
    if (i18n.exists(ratepayError)) showError(t(ratepayError));
    else
      throw new Error(errorMessage ?? "", {
        cause: t("invoice.thirdPartyIssue"),
      });
  } else {
    const paypalError = `payPal.${errorDetails}`;
    throw new Error(errorMessage ?? "", {
      cause: i18n.exists(paypalError)
        ? t(paypalError)
        : t("payPal.unknownIssue"),
    });
  }
};
