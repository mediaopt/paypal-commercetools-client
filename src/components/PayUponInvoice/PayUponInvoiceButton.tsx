import { FC } from "react";

import { usePayment } from "../../app/usePayment";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";
import { useSettings } from "../../app/useSettings";

import { PayUponInvoiceButtonProps } from "../../types";

import { PayUponInvoiceMask } from "./PayUponInvoiceMask";
import { useTranslation } from "react-i18next";

const minPayableAmount = 5; //euro
const maxPayableAmount = 2500; //euro

export const PayUponInvoiceButton: FC<PayUponInvoiceButtonProps> = ({
  fraudNetSessionId,
  invoiceBenefitsMessage,
  purchaseCallback,
}) => {
  const { paymentInfo, clientToken } = usePayment();
  const { t } = useTranslation();
  useHandleCreatePayment();
  const { settings } = useSettings();

  const invoiceError = !(settings?.payPalIntent === "Capture")
    ? "wrongIntent"
    : paymentInfo.id && paymentInfo.amount < minPayableAmount
    ? "tooSmall"
    : paymentInfo.amount > maxPayableAmount
    ? "tooBig"
    : paymentInfo.id && !clientToken
    ? "thirdPartyIssue"
    : null;

  return invoiceError ? (
    <div>{t(invoiceError)}</div>
  ) : paymentInfo.id && clientToken ? (
    <PayUponInvoiceMask
      fraudNetSessionId={fraudNetSessionId}
      invoiceBenefitsMessage={invoiceBenefitsMessage}
      purchaseCallback={purchaseCallback}
    />
  ) : (
    <></>
  );
};