import React, { useMemo, useEffect, useState } from "react";

import {
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { HostedFieldsProps } from "../../types";
import HostedFieldsInvalid from "./HostedFieldsInvalid";
import { HOSTED_FIELDS_CARD_FIELDS, HOSTED_FIELDS_BUTTON } from "./constants";
import { SubmitPayment } from "./SubmitPayment";
import { PARTNER_ATTRIBUTION_ID } from "../../constants";

const CUSTOM_FIELD_STYLE = {
  border: "1px solid #606060",
  boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
};

export const HostedFieldsMask: React.FC<HostedFieldsProps> = ({
  options,
  enableVaulting,
}) => {
  const {
    handleCreateOrder,
    oderDataLinks,
    handleOnApprove,
    orderId,
    clientToken,
  } = usePayment();
  const { settings, paymentTokens } = useSettings();

  const [addNew, setAddNew] = useState(false);
  const [vaultId, setVaultId] = useState<string>();

  let saveCard = false;

  const cardPaymentTokens = paymentTokens?.payment_tokens?.filter(
    (paymentToken) => paymentToken.payment_source.card !== undefined,
  );

  const hostedFieldClasses = useMemo(() => {
    const hostedFieldsPayButtonClasses =
      settings?.hostedFieldsPayButtonClasses || HOSTED_FIELDS_BUTTON;
    const hostedFieldsInputFieldClasses =
      settings?.hostedFieldsInputFieldClasses || HOSTED_FIELDS_CARD_FIELDS;
    return { hostedFieldsPayButtonClasses, hostedFieldsInputFieldClasses };
  }, [settings]);

  useEffect(() => {
    let oderDataPayerAction = oderDataLinks?.filter(
      (oderDataLink) => oderDataLink.rel === "payer-action",
    );

    if (oderDataPayerAction && oderDataPayerAction[0]) {
      const newWindow = window.open(
        oderDataPayerAction[0].href,
        "3D Secure Check",
        "width=300,height=500",
      );
      let fireOderDataGetInterval: NodeJS.Timer;
      const fireOderDataGet = async () => {
        if (newWindow?.closed) {
          clearInterval(fireOderDataGetInterval);
          if (orderId) {
            await handleOnApprove({ orderID: orderId });
          }
        }
      };

      if (newWindow) {
        fireOderDataGetInterval = setInterval(fireOderDataGet, 1000);
      }
    }
  }, [oderDataLinks, orderId]);

  return !settings ? (
    <></>
  ) : (
    <PayPalScriptProvider
      options={{
        clientId: options.clientId,
        dataClientToken: clientToken,
        components: options.components,
        vault: options.vault,
        dataPartnerAttributionId: PARTNER_ATTRIBUTION_ID,
      }}
    >
      {cardPaymentTokens && cardPaymentTokens?.length > 0 && !addNew ? (
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
            <div>
              <p>
                If the 3D secure popup appears, you need to do the verification
                and then close the window.
              </p>
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
            <HostedFieldsInvalid />
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
            <HostedFieldsInvalid />
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
            <HostedFieldsInvalid />
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
    </PayPalScriptProvider>
  );
};
