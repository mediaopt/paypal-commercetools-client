import { FC, useState } from "react";
import parsePhoneNumber from "libphonenumber-js";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { InvoiceLegalNote } from "./InvoiceLegalNote";
import { PayUponInvoiceButtonProps } from "../../types";
import { STYLED_PAYMENT_BUTTON, STYLED_PAYMENT_FIELDS } from "../../styles";

const parsePhone = (phone: string) => {
  const parsedPhone = parsePhoneNumber(phone.replaceAll(" ", ""));
  return parsedPhone
    ? `+${parsedPhone?.countryCallingCode ?? ""} ${
        parsedPhone?.nationalNumber ?? ""
      }`
    : phone;
};

export const PayUponInvoiceMask: FC<PayUponInvoiceButtonProps> = ({
  fraudNetSessionId,
  invoiceBenefitsMessage,
  purchaseCallback,
}) => {
  //useHandleGetClientToken(false);
  const { handleCreateInvoice } = usePayment();
  const { notify } = useNotifications();
  const [phone, setPhone] = useState("+49 ");
  const notifyWrongPhone = () =>
    notify(
      "Warning",
      "Could not identify country code or national phone number, please check the data.",
    );

  return (
    <form
      className="my-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = event.target as HTMLFormElement;
        const birthDate = formData["birthDate"].value;
        const actualPhone = parsePhoneNumber(phone);
        if (actualPhone) {
          const { countryCallingCode, nationalNumber } = actualPhone;
          if (countryCallingCode && nationalNumber) {
            const orderStatus = await handleCreateInvoice({
              fraudNetSessionId,
              nationalNumber,
              countryCode: countryCallingCode,
              birthDate,
            });
            if (orderStatus && purchaseCallback) purchaseCallback(orderStatus);
            else notify("Warning", "Something went wrong");
          } else notifyWrongPhone();
        } else notifyWrongPhone();
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
        pattern="^\+[0-9]{1,4} [0-9]{0,13}$$"
        placeholder="+49 1231231234"
        value={phone}
        onChange={({ target }) => setPhone(parsePhone(target.value))}
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
