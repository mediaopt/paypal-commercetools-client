import React, { useEffect, useMemo, useRef, useState } from "react";

import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import {
  ApproveVaultSetupTokenData,
  CardFieldsProps,
  CustomOnApproveData,
} from "../../types";
import { CARD_FIELDS_INPUTS, CARD_FIELDS_BUTTON } from "./constants";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";
import { errorFunc } from "../errorNotification";
import { useTranslation } from "react-i18next";

export const CardFieldsMask: React.FC<CardFieldsProps> = ({
  enableVaulting,
}) => {
  const {
    handleCreateOrder,
    handleOnApprove,
    handleAuthenticateThreeDSOrder,
    vaultOnly,
    handleApproveVaultSetupToken,
    handleCreateVaultSetupToken,
    orderDataLinks,
    orderId,
  } = usePayment();
  const { settings, paymentTokens } = useSettings();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();
  const { t } = useTranslation();

  const [vaultId, setVaultId] = useState<string>();
  const [paying, setPaying] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const cardFieldDiv = useRef<HTMLDivElement>(null);
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

  const approveTransaction = (approveData: any) => {
    if (vaultOnly) {
      handleApproveVaultSetupToken(
        approveData as ApproveVaultSetupTokenData
      ).catch((err) => {
        setPaying(false);
        errorFunc(err, isLoading, notify, t);
      });
    } else {
      handleOnApprove(approveData as CustomOnApproveData).catch((err) => {
        setPaying(false);
        errorFunc(err, isLoading, notify, t);
      });
    }
  };
  useEffect(() => {
    let oderDataPayerAction = orderDataLinks?.filter(
      (orderDataLink) => orderDataLink.rel === "payer-action"
    );

    if (oderDataPayerAction && oderDataPayerAction[0]) {
      window.location.href = oderDataPayerAction[0].href;
    }
  }, [orderDataLinks, orderId]);

  const cardFieldMethods = vaultOnly
    ? { createVaultSetupToken: () => handleCreateVaultSetupToken("card") }
    : {
        createOrder: () => {
          return handleCreateOrder({
            paymentSource: "card",
            storeInVault: saveCard,
            verificationMethod: threeDSAuth || undefined,
          });
        },
      };

  const cardField = useMemo(() => {
    // @ts-ignore
    return window.paypal!.CardFields({
      ...cardFieldMethods,
      onApprove: (data: CustomOnApproveData) => {
        if (vaultOnly) {
          approveTransaction(data);
          return;
        }
        const approveData: CustomOnApproveData = {
          orderID: data.orderID,
          saveCard: save.current?.checked,
        };

        if (threeDSAuth) {
          handleAuthenticateThreeDSOrder(data.orderID).then((result) => {
            switch (result.toString(10)) {
              case "2":
                approveTransaction(approveData);
                break;
              case "1":
                notify("Warning", "Try again");
                isLoading(false);
                setPaying(false);
                break;
              case "0":
              default:
                notify("Error", "Please select different payment method");
                isLoading(false);
                setPaying(false);
                break;
            }
          });
        } else {
          approveTransaction(approveData);
        }
      },
      onError: function (error: Record<string, never>) {
        setPaying(false);
        errorFunc(error, isLoading, notify, t);
      },
    });
  }, []);

  const handleClick = () => {
    setPaying(true);
    isLoading(true);

    cardField.submit().catch((err: Record<string, never>) => {
      errorFunc(err, isLoading, notify, t);
      setPaying(false);
    });
  };

  useEffect(() => {
    if (!settings || !cardFieldDiv.current) return;
    if (cardField && cardField.isEligible()) {
      const cardNameField = cardField.NameField();
      cardNameField.render(nameField.current);

      const cardNumberField = cardField.NumberField();
      cardNumberField.render(numberField.current);

      const cardCvvField = cardField.CVVField();
      cardCvvField.render(cvvField.current);

      const cardExpiryField = cardField.ExpiryField();
      cardExpiryField.render(expiryField.current);
    } else if (!cardField.isEligible()) {
      notify("Error", "Card payment currently not supported");
    }
  }, [cardField, settings, cardFieldDiv, addNew]);

  if (!settings) return <></>;

  return (
    <>
      {!vaultOnly &&
      cardPaymentTokens &&
      cardPaymentTokens?.length > 0 &&
      !addNew ? (
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
                className={`${hostedFieldClasses.hostedFieldsPayButtonClasses} float-right`}
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
        <div ref={cardFieldDiv} id="checkout-form">
          <div ref={nameField} id="card-name-field-container"></div>

          <div ref={numberField} id="card-number-field-container"></div>

          <div ref={expiryField} id="card-expiry-field-container"></div>

          <div ref={cvvField} id="card-cvv-field-container"></div>

          {enableVaulting && !vaultOnly && (
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
          <div className="py-2">
            <button
              className={hostedFieldClasses.hostedFieldsPayButtonClasses}
              onClick={handleClick}
              disabled={paying}
            >
              Pay
            </button>
          </div>
        </div>
      )}
    </>
  );
};
