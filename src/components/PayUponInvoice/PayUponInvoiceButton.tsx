import { FC } from "react";

import { usePayment } from "../../app/usePayment";
import { useHandleCreatePayment } from "../../app/useHandleCreatePayment";
import { useSettings } from "../../app/useSettings";

import { PayUponInvoiceButtonProps } from "../../types";

import { InvoiceError } from "./InvoiceError";
import { PayUponInvoiceMask } from "./PayUponInvoiceMask";

const minPayableAmount = 5; //euro
const maxPayableAmount = 2500; //euro

export const PayUponInvoiceButton: FC<PayUponInvoiceButtonProps> = ({
  fraudNetSessionId,
  invoiceBenefitsMessage,
  purchaseCallback,
}) => {
  const { paymentInfo, clientToken } = usePayment();
  useHandleCreatePayment();
  const { settings } = useSettings();

  const invoiceError = !(settings?.payPalIntent === "Capture")
    ? "wrongIntent"
    : paymentInfo.id && paymentInfo.amount < minPayableAmount
    ? "tooSmall"
    : paymentInfo.amount > maxPayableAmount
    ? "tooBig"
    : null;

  return invoiceError ? (
    <InvoiceError errorKind={invoiceError} />
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
