import { FC, useState } from "react";
import parsePhoneNumber from "libphonenumber-js";
import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { InvoiceLegalNote } from "./InvoiceLegalNote";
import { PayUponInvoiceMaskProps } from "../../types";
import { STYLED_PAYMENT_BUTTON, STYLED_PAYMENT_FIELDS } from "../../styles";
import { useTranslation } from "react-i18next";
import { RatepayErrorNote } from "./RatepayErrorNote";
import { useLoader } from "../../app/useLoader";

const parsePhone = (phone: string) => {
  const formattedPhone = `+${phone.replace(/\D/g, "")}`;
  const parsedPhone = parsePhoneNumber(formattedPhone);
  return parsedPhone
    ? `+${parsedPhone?.countryCallingCode ?? ""} ${
        parsedPhone?.nationalNumber ?? ""
      }`
    : formattedPhone;
};

export const PayUponInvoiceMask: FC<PayUponInvoiceMaskProps> = ({
  fraudNetSessionId,
  invoiceBenefitsMessage,
}) => {
  const { handleCreateOrder } = usePayment();
  const { notify } = useNotifications();
  const { t } = useTranslation();
  const { isLoading } = useLoader();

  const [phone, setPhone] = useState("+49 ");
  const notifyWrongPhone = () => notify("Warning", t("wrongPhone"));
  let date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  const maxDate = date.toJSON().slice(0, 10);
  const [ratepayMessage, setRatepayMessage] = useState<string>();

  const submitForm = async (formData: HTMLFormElement) => {
    isLoading(true);
    setRatepayMessage("");
    const birthDate = formData["birthDate"].value;
    const { countryCallingCode, nationalNumber } = {
      ...parsePhoneNumber(phone),
    };
    if (countryCallingCode && nationalNumber) {
      await handleCreateOrder({
        fraudNetSessionId,
        nationalNumber,
        countryCode: countryCallingCode,
        birthDate,
        setRatepayMessage,
      });
    } else notifyWrongPhone();
    isLoading(false);
  };

  return (
    <form
      className="my-4"
      onSubmit={async (event) => {
        event.preventDefault();

        await submitForm(event.target as HTMLFormElement);
      }}
    >
      <div className="my-2">
        {invoiceBenefitsMessage ?? t("invoiceBenefitsMessage")}
      </div>

      <label htmlFor="birthDate">{t("birthDate")}</label>
      <input
        id="birthDate"
        name="birthDate"
        type="date"
        className={STYLED_PAYMENT_FIELDS}
        required
        autoComplete="bday"
        min="1900-01-01"
        max={maxDate}
      />
      <label htmlFor="phone">{t("phoneNumber")}</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        pattern="^\+[0-9]{1,4} [0-9]{0,14}$$"
        placeholder="+49 1231231234"
        maxLength={18}
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
      {ratepayMessage && RatepayErrorNote(ratepayMessage)}
    </form>
  );
};
