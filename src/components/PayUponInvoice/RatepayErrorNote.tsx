import { Trans } from "react-i18next";
import { ERROR_TEXT_STYLE, STYLED_LINK } from "../../styles";
import i18n from "i18next";

type RatepayErrorType = "paymentSourceNotVerified" | "paymentSourceDeclined";

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

export const relevantError = (orderErrorDetails: string) => {
  const parcedError = Object.keys(connectToRatepayError).find((key) =>
    connectToRatepayError[key as RatepayErrorType].includes(orderErrorDetails),
  );
  return parcedError && i18n.exists(parcedError) ? parcedError : undefined;
};

export const RatepayErrorNote = (errorKind: string) => {
  const isGerman = i18n.language === "de";
  const references = isGerman
    ? [
        "https://www.ratepay.com/legal-payment-dataprivacy/?lang=de",
        "https://www.ratepay.com/kontakt/",
      ]
    : [
        "https://www.ratepay.com/en/ratepay-data-privacy-statement/",
        "https://www.ratepay.com/en/contact/",
      ];

  return (
    <div className={ERROR_TEXT_STYLE}>
      <Trans
        i18nKey={errorKind}
        components={[
          <a className={STYLED_LINK} href={references[0]} />,
          <a className={STYLED_LINK} href={references[1]} />,
        ]}
      />
    </div>
  );
};
