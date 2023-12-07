import i18n from "i18next";
import { TFunction } from "i18next";
import { SetStringState } from "../types";

export const handleResponseError = (
  t: TFunction<any, any>,
  errorDetails?: string,
  errorMessage?: string,
  showError?: SetStringState,
) => {
  const errorDomain = showError ? "invoice" : "payPal";
  const parcedError = i18n.exists(`${errorDomain}.${errorDetails}`)
    ? `${errorDomain}.${errorDetails}`
    : i18n.exists(`${errorDomain}.${errorMessage}`)
    ? `${errorDomain}.${errorMessage}`
    : undefined;
  if (!parcedError)
    throw new Error(errorMessage ?? errorDetails, {
      cause: t(
        showError ? "invoice.thirdPartyIssue" : "interface.generalError",
      ),
    });
  else if (showError) {
    showError(t(parcedError));
  } else {
    throw new Error(errorMessage ?? "", {
      cause: t(parcedError),
    });
  }
};
