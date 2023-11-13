import React, { useRef, useState } from "react";

import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
} from "@paypal/react-paypal-js";
import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { HostedFieldsProps } from "../../types";
import HostedFieldsInvalid from "./HostedFieldsInvalid";
import { HOSTED_FIELDS_CARD_FIELDS } from "./constants";
import { SubmitPayment } from "./SubmitPayment";

const CUSTOM_FIELD_STYLE = {
  border: "1px solid #606060",
  boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
};

export const HostedFieldsMask: React.FC<HostedFieldsProps> = ({
  options,
  enableVaulting,
}) => {
  const { handleCreateOrder } = usePayment();
  const { settings, paymentTokens } = useSettings();
  const { clientToken } = usePayment();
  const [addNew, setAddNew] = useState(false);

  let saveCard = false;

  const cardPaymentTokens = paymentTokens?.payment_tokens?.filter(
    (paymentToken) => paymentToken.payment_source.card !== undefined
  );

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
      {cardPaymentTokens &&
      cardPaymentTokens?.length > 0 &&
      addNew === false ? (
        <>
          <button onClick={() => setAddNew(true)}>Add New Card</button>
        </>
      ) : (
        <PayPalHostedFieldsProvider
          styles={{
            ".valid": { color: "#28a745" },
            ".invalid": { color: "#dc3545" },
            input: { "font-family": "monospace", "font-size": "16px" },
          }}
          createOrder={() => {
            return handleCreateOrder({
              paymentSource: "card",
              storeInVault: saveCard,
            });
          }}
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
          <SubmitPayment
            enableVaulting={enableVaulting}
            handleSaveCard={({ target }) => {
              saveCard = target.checked;
            }}
          />
        </PayPalHostedFieldsProvider>
      )}
    </PayPalScriptProvider>
  );
};
