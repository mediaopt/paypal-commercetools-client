import { FC } from "react";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { InvoiceLegalNote } from "./InvoiceLegalNote";
import { PayUponInvoiceButtonProps } from "../../types";
import { STYLED_PAYMENT_BUTTON, STYLED_PAYMENT_FIELDS } from "../../styles";

export const PayUponInvoiceMask: FC<PayUponInvoiceButtonProps> = ({
  fraudnetSessionId,
  invoiceBenefitsMessage,
  purchaseCallback,
}) => {
  useHandleGetClientToken(false);
  const { handleCreateOrder } = usePayment();

  const { notify } = useNotifications();

  const paypalInvoiceRequest = async () => {
    const additionalInvoiceHeader = {
      "PAYPAL-CLIENT-METADATA-ID": fraudnetSessionId,
    };
    //const res = await handleCreateOrder();
    const res = true;
    return res;
  };

  return (
    <form
      className="my-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const birthDate = (
          document.getElementById("birthDate") as HTMLInputElement
        ).value;
        const phone = (document.getElementById("phone") as HTMLInputElement)
          .value;
        const orderStatus = await paypalInvoiceRequest();
        if (orderStatus && purchaseCallback) purchaseCallback(orderStatus);
        else notify("Warning", "Something went wrong");
      }}
    >
      {invoiceBenefitsMessage && (
        <div className="my-2">{invoiceBenefitsMessage}</div>
      )}
      <label htmlFor="birthDate">Birth date</label>
      <input
        id="birthDate"
        name="birthDate"
        type="date"
        className={STYLED_PAYMENT_FIELDS}
        required
        autoComplete="bday"
      />
      <label htmlFor="phone">Phone number</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        //pattern="^\+(?:[0-9]●?){6,14}[0-9]$"
        placeholder="+49 123 123 1234"
        className={STYLED_PAYMENT_FIELDS}
        autoComplete="tel"
        required
      />
      {InvoiceLegalNote}
      <button className={STYLED_PAYMENT_BUTTON} type="submit">
        Pay
      </button>
    </form>
  );
};
