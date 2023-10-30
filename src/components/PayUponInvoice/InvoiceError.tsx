import { FC } from "react";

export const invoiceErrors = {
  noFraudNet:
    "Pay by invoice is currently not available. Please try again later.",
  wrongIntent: "Pay upon invoice is not available at the moment",
  tooSmall: "Pay upon invoice is available starting from 5 euro",
  tooBig: "Pay upon invoice is available only if amount is below 2500 euro",
};

type InvoiceErrorProps = {
  errorKind: "noFraudNet" | "wrongIntent" | "tooSmall" | "tooBig";
};

export const InvoiceError: FC<InvoiceErrorProps> = ({ errorKind }) => (
  <div>{invoiceErrors[errorKind]}</div>
);
