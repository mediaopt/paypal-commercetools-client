import React, { useRef, useState } from "react";

import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { CustomOnApproveData, HostedFieldsProps } from "../../types";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";
import HostedFieldsInvalid from "./HostedFieldsInvalid";

const CUSTOM_FIELD_STYLE = {
  border: "1px solid #606060",
  boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
};

const HOSTED_FIELDS_CARD_FIELDS: string =
  "w-full p-3 mt-1.5 mb-4 h-10 text-base bg-white text-neutral-700 border border-gray-300 rounded box-border resize-y";

const HOSTED_FIELDS_BUTTON: string =
  "float-right text-center whitespace-nowrap inline-block font-normal align-middle select-none cursor-pointer text-white text-base rounded py-1.5 px-3 bg-sky-500 border-sky-500";

const SubmitPayment = () => {
  const customStyle = {
    border: "1px solid #606060",
    boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
  };
  const { handleOnApprove } = usePayment();
  const { settings } = useSettings();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();
  const [paying, setPaying] = useState(false);
  const cardHolderName = useRef<HTMLInputElement>(null);
  const hostedField = usePayPalHostedFields();
  const threeDSAuth = settings?.threeDSOption;

  const approveTransaction = (approveData: CustomOnApproveData) => {
    handleOnApprove(approveData).catch((err) => {
      setPaying(false);
      isLoading(false);
      notify("Error", err.message);
    });
  };

  const handleClick = () => {
    if (!hostedField?.cardFields) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalHostedFieldsProvider />";

      notify("Error", childErrorMessage);
      throw new Error(childErrorMessage);
    }
    const isFormInvalid =
      Object.values(hostedField.cardFields.getState().fields).some(
        (field) => !field.isValid
      ) || !cardHolderName?.current?.value;

    if (isFormInvalid) {
      notify("Error", "The form is invalid");
      return;
    }
    setPaying(true);
    isLoading(true);

    const hostedFieldsOptions: Record<string, unknown> = {
      cardholderName: cardHolderName?.current?.value,
    };
    if (threeDSAuth) {
      hostedFieldsOptions.contingencies = [threeDSAuth];
    }
    hostedField.cardFields
      .submit(hostedFieldsOptions)
      .then((data) => {
        const approveData: CustomOnApproveData = {
          orderID: data.orderId,
        };
        if (threeDSAuth) {
          if (data.liabilityShift === "POSSIBLE") {
            approveTransaction(approveData);
          } else {
            notify("Error", "3D Secure check has failed");
            isLoading(false);
            setPaying(false);
          }
        } else {
          approveTransaction(approveData);
        }
      })
      .catch((err) => {
        notify("Error", err.message);
        isLoading(false);
        setPaying(false);
      });
  };

  return (
    <>
      <label title="This represents the full name as shown in the card">
        Card Holder Name
        <input
          id="card-holder"
          ref={cardHolderName}
          className={HOSTED_FIELDS_CARD_FIELDS}
          style={{ ...customStyle, outline: "none" }}
          type="text"
          placeholder="Full name"
        />
      </label>
      <button className={HOSTED_FIELDS_BUTTON} onClick={handleClick}>
        Pay
      </button>
    </>
  );
};

export const HostedFieldsMask: React.FC<HostedFieldsProps> = ({ options }) => {
  const { handleCreateOrder } = usePayment();
  const { settings } = useSettings();
  const { clientToken } = usePayment();

  return !settings ? (
    <></>
  ) : (
    <PayPalScriptProvider
      options={{
        clientId: options.clientId,
        dataClientToken: clientToken,
        components: options.components,
        vault: options.vault,
        dataPartnerAttributionId: settings.partnerAttributionId
          ? (settings.partnerAttributionId as string)
          : undefined,
      }}
    >
      <PayPalHostedFieldsProvider
        styles={{
          ".valid": { color: "#28a745" },
          ".invalid": { color: "#dc3545" },
          input: { "font-family": "monospace", "font-size": "16px" },
        }}
        createOrder={handleCreateOrder}
        notEligibleError={<h3>hosted fields not available</h3>}
      >
        <label htmlFor="card-number">
          Card Number
          <HostedFieldsInvalid />
        </label>
        <PayPalHostedField
          className={HOSTED_FIELDS_CARD_FIELDS}
          style={CUSTOM_FIELD_STYLE}
          id="card-number"
          hostedFieldType="number"
          options={{
            selector: "#card-number",
            placeholder: "4111 1111 1111 1111",
          }}
        />
        <label htmlFor="cvv">
          CVV
          <HostedFieldsInvalid />
        </label>
        <PayPalHostedField
          className={HOSTED_FIELDS_CARD_FIELDS}
          style={CUSTOM_FIELD_STYLE}
          id="cvv"
          hostedFieldType="cvv"
          options={{ selector: "#cvv", maskInput: true, placeholder: "123" }}
        />
        <label htmlFor="expiration-date">
          Expiration Date
          <HostedFieldsInvalid />
        </label>
        <PayPalHostedField
          className={HOSTED_FIELDS_CARD_FIELDS}
          style={CUSTOM_FIELD_STYLE}
          id="expiration-date"
          hostedFieldType="expirationDate"
          options={{ selector: "#expiration-date", placeholder: "MM/YY" }}
        />
        <SubmitPayment />
      </PayPalHostedFieldsProvider>
    </PayPalScriptProvider>
  );
};
