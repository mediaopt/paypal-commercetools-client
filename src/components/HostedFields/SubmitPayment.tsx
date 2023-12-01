import { ChangeEvent, useRef, useState, useMemo } from "react";

import { usePayPalHostedFields } from "@paypal/react-paypal-js";
import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { CustomOnApproveData } from "../../types";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";
import { HOSTED_FIELDS_CARD_FIELDS, HOSTED_FIELDS_BUTTON } from "./constants";
import { errorFunc } from "../errorNotification";

type SubmitPaymentProps = {
  enableVaulting?: boolean;
  handleSaveCard: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SubmitPayment: React.FC<SubmitPaymentProps> = ({
  enableVaulting,
  handleSaveCard,
}) => {
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

  const storeInVaultOnSuccess = settings?.storeInVaultOnSuccess;
  const save = useRef<HTMLInputElement>(null);
  const hostedField = usePayPalHostedFields();
  const threeDSAuth = settings?.threeDSOption;
  const hostedFieldClasses = useMemo(() => {
    const hostedFieldsPayButtonClasses =
      settings?.hostedFieldsPayButtonClasses || HOSTED_FIELDS_BUTTON;
    const hostedFieldsInputFieldClasses =
      settings?.hostedFieldsInputFieldClasses || HOSTED_FIELDS_CARD_FIELDS;
    return { hostedFieldsPayButtonClasses, hostedFieldsInputFieldClasses };
  }, [settings]);

  const approveTransaction = (approveData: CustomOnApproveData) => {
    handleOnApprove(approveData).catch((err) => {
      setPaying(false);
      errorFunc(err, isLoading, notify);
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
        (field) => !field.isValid,
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
          saveCard: save.current?.checked,
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
          {
            approveTransaction(approveData);
          }
        }
      })
      .catch((err) => {
        setPaying(false);
        errorFunc(err, isLoading, notify);
      });
  };

  return (
    <>
      <label title="This represents the full name as shown in the card">
        Card Holder Name
        <input
          id="card-holder"
          ref={cardHolderName}
          className={hostedFieldClasses.hostedFieldsInputFieldClasses}
          style={{ ...customStyle, outline: "none" }}
          type="text"
          placeholder="Full name"
        />
      </label>
      {(enableVaulting || storeInVaultOnSuccess) && (
        <label>
          <input
            type="checkbox"
            id="save"
            name="save"
            ref={save}
            className="mr-1"
            onChange={handleSaveCard}
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
    </>
  );
};
