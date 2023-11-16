import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { HostedFieldsProps } from "../../types";
import CardFieldsInvalid from "./CardFieldsInvalid";
import { CARD_FIELDS_INPUTS, CARD_FIELDS_BUTTON } from "./constants";
import { SubmitPayment } from "./SubmitPayment";

const CUSTOM_FIELD_STYLE = {
  border: "1px solid #606060",
  boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
};

export const CardFieldsMask: React.FC<HostedFieldsProps> = ({
  options,
  enableVaulting,
}) => {
  const { handleCreateOrder } = usePayment();
  const { settings, paymentTokens } = useSettings();
  const { clientToken } = usePayment();
  const [addNew, setAddNew] = useState(false);
  const [vaultId, setVaultId] = useState<string>();
  const nameField = useRef<HTMLDivElement>(null);
  const numberField = useRef<HTMLDivElement>(null);
  const cvvField = useRef<HTMLDivElement>(null);
  const expiryField = useRef<HTMLDivElement>(null);

  let saveCard = false;

  const cardPaymentTokens = paymentTokens?.payment_tokens?.filter(
    (paymentToken) => paymentToken.payment_source.card !== undefined
  );

  const hostedFieldClasses = useMemo(() => {
    const hostedFieldsPayButtonClasses =
      settings?.hostedFieldsPayButtonClasses || CARD_FIELDS_BUTTON;
    const hostedFieldsInputFieldClasses =
      settings?.hostedFieldsInputFieldClasses || CARD_FIELDS_INPUTS;
    return { hostedFieldsPayButtonClasses, hostedFieldsInputFieldClasses };
  }, [settings]);

  const cardField = useMemo(() => {
    // @ts-ignore
    return window.paypal!.CardFields({
      createOrder: function (data: Record<string, unknown>) {
        return fetch("myserver.com/api/orders", {
          method: "post",

          body: {
            // @ts-ignore
            paymentSource: data.paymentSource,
          },
        })
          .then((res) => {
            return res.json();
          })

          .then((orderData) => {
            return orderData.id;
          });
      },
      onApprove: function (data: Record<string, unknown>) {
        const { orderID } = data;

        return fetch(`myserver.com/api/orders/${orderID}/capture`, {
          method: "post",
        })
          .then((res) => {
            return res.json();
          })

          .then((orderData) => {
            // Redirect to success page
          });
      },
      onError: function (error: Record<string, unknown>) {
        // Do something with the error from the SDK
      },
    });
  }, []);

  useEffect(() => {
    if (!settings) return;
    if (cardField && cardField.isEligible()) {
      const cardNameField = cardField.NameField();
      cardNameField.render(nameField.current);

      const cardNumberField = cardField.NumberField();
      cardNumberField.render(numberField.current);

      const cardCvvField = cardField.CVVField();
      cardCvvField.render(cvvField.current);

      const cardExpiryField = cardField.ExpiryField();
      cardExpiryField.render(expiryField.current);
    }
  }, [cardField, settings]);

  return !settings ? (
    <></>
  ) : (
    <div id="checkout-form">
      <div ref={nameField} id="card-name-field-container"></div>

      <div ref={numberField} id="card-number-field-container"></div>

      <div ref={expiryField} id="card-expiry-field-container"></div>

      <div ref={cvvField} id="card-cvv-field-container"></div>

      <button
        onClick={() => {
          cardField.submit().then(() => {
            console.log("submitted");
          });
        }}
        id="card-field-submit-button"
        type="button"
      >
        Pay now with Card Fields
      </button>
    </div>
    /*    <PayPalScriptProvider
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
          {cardPaymentTokens.map((paymentToken) => {
            const { id, payment_source } = paymentToken;
            const { brand, last_digits } = payment_source.card;

            return (
              <div key={id}>
                <span>
                  <input
                    type="radio"
                    name="pay-with-vaulted-card"
                    value={id}
                    onChange={(e) => {
                      setVaultId(e.target.value);
                    }}
                  />
                  {brand} ending in {last_digits}
                </span>
              </div>
            );
          })}
          {vaultId && (
            <div className="h-9">
              <button
                className={`${hostedFieldClasses.hostedFieldsPayButtonClasses} float-left`}
                onClick={() =>
                  handleCreateOrder({
                    paymentSource: "card",
                    storeInVault: saveCard,
                    vaultId: vaultId,
                  })
                }
              >
                Pay
              </button>
            </div>
          )}

          <button onClick={() => setAddNew(true)}>Add A New Card</button>
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
            <CardFieldsInvalid />
          </label>
          <PayPalHostedField
            className={hostedFieldClasses.hostedFieldsInputFieldClasses}
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
            <CardFieldsInvalid />
          </label>
          <PayPalHostedField
            className={hostedFieldClasses.hostedFieldsInputFieldClasses}
            style={CUSTOM_FIELD_STYLE}
            id="cvv"
            hostedFieldType="cvv"
            options={{ selector: "#cvv", maskInput: true, placeholder: "123" }}
          />
          <label htmlFor="expiration-date">
            Expiration Date
            <CardFieldsInvalid />
          </label>
          <PayPalHostedField
            className={hostedFieldClasses.hostedFieldsInputFieldClasses}
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
    </PayPalScriptProvider>*/
  );
};
