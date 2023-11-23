import React, { useEffect, useMemo, useRef, useState } from "react";

import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { CardFieldsProps, CustomOnApproveData } from "../../types";
import { CARD_FIELDS_INPUTS, CARD_FIELDS_BUTTON } from "./constants";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";

export const CardFieldsMask: React.FC<CardFieldsProps> = ({
  enableVaulting,
}) => {
  const { handleCreateOrder, handleOnApprove, handleAuthenticateThreeDSOrder } =
    usePayment();
  const { settings, paymentTokens } = useSettings();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  const [addNew, setAddNew] = useState(false);
  const [vaultId, setVaultId] = useState<string>();
  const [paying, setPaying] = useState(false);

  const nameField = useRef<HTMLDivElement>(null);
  const numberField = useRef<HTMLDivElement>(null);
  const cvvField = useRef<HTMLDivElement>(null);
  const expiryField = useRef<HTMLDivElement>(null);
  const save = useRef<HTMLInputElement>(null);

  const threeDSAuth = settings?.threeDSOption;

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

  const approveTransaction = (approveData: CustomOnApproveData) => {
    handleOnApprove(approveData).catch((err) => {
      console.log("ERROR 1");
      setPaying(false);
      isLoading(false);
      notify("Error", err.message);
    });
  };

  const cardField = useMemo(() => {
    // @ts-ignore
    return window.paypal!.CardFields({
      createOrder: () => {
        return handleCreateOrder({
          paymentSource: "card",
          storeInVault: saveCard,
          verificationMethod: threeDSAuth || undefined,
        });
      },
      onApprove: (data: CustomOnApproveData) => {
        console.log(data);
        const approveData: CustomOnApproveData = {
          orderID: data.orderID,
          saveCard: save.current?.checked,
        };

        if (threeDSAuth) {
          handleAuthenticateThreeDSOrder(data.orderID).then((result) => {
            console.log(result);
          });
          /*if (data.liabilityShift === "POSSIBLE") {
            console.log("approve from click func");
            approveTransaction(approveData);
          } else {
            notify("Error", "3D Secure check has failed");
            console.log("ERROR 2");
            isLoading(false);
            setPaying(false);
          }*/
        } else {
          console.log("approve from click func");
          approveTransaction(approveData);
        }
      },
      onError: function (error: Record<string, never>) {
        setPaying(false);
        isLoading(false);
        notify("Error", error.message);
        console.log("ERROR 4");
      },
    });
  }, []);

  const handleClick = () => {
    setPaying(true);
    isLoading(true);

    cardField
      .submit()
      .then(() => {
        console.log("success");
      })
      .catch((err: Record<string, never>) => {
        notify("Error", err.message);
        console.log("ERROR 3");
        isLoading(false);
        setPaying(false);
      });
  };

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

  if (!settings) return <></>;

  if (cardPaymentTokens && cardPaymentTokens?.length > 0 && !addNew) {
    return (
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
    );
  }

  return (
    <div id="checkout-form">
      <div ref={nameField} id="card-name-field-container"></div>

      <div ref={numberField} id="card-number-field-container"></div>

      <div ref={expiryField} id="card-expiry-field-container"></div>

      <div ref={cvvField} id="card-cvv-field-container"></div>

      {enableVaulting && (
        <label>
          <input
            type="checkbox"
            id="save"
            name="save"
            ref={save}
            className="mr-1"
            onChange={({ target }) => {
              saveCard = target.checked;
            }}
          />
          Save this card for future purchases
        </label>
      )}

      <button
        className={hostedFieldClasses.hostedFieldsPayButtonClasses}
        onClick={handleClick}
        disabled={paying}
      >
        Pay
      </button>
    </div>
  );
};
