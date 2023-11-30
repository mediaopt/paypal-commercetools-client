import React, { useMemo, useRef } from "react";
import { PayPalButtons, PayPalMessages } from "@paypal/react-paypal-js";
import { CustomPayPalButtonsComponentProps } from "../../types";

import { usePayment } from "../../app/usePayment";
import { useSettings } from "../../app/useSettings";
import { useLoader } from "../../app/useLoader";
import { useNotifications } from "../../app/useNotifications";

export const PayPalMask: React.FC<CustomPayPalButtonsComponentProps> = (
  props,
) => {
  const {
    handleCreateOrder,
    handleOnApprove,
    vaultOnly,
    handleCreateVaultSetupToken,
    handleApproveVaultSetupToken,
  } = usePayment();
  const { settings } = useSettings();
  const { isLoading } = useLoader();
  const { notify } = useNotifications();
  const { enableVaulting, paypalMessages, ...restprops } = props;
  const save = useRef<HTMLInputElement>(null);

  const storeInVaultOnSuccess = settings?.storeInVaultOnSuccess;

  const style = useMemo(() => {
    if (restprops.style || !settings) {
      return restprops.style;
    }
    if (
      settings.paypalButtonConfig &&
      settings.buttonTagline &&
      settings.buttonShape
    ) {
      return {
        color: settings.paypalButtonConfig.buttonColor,
        label: settings.paypalButtonConfig.buttonLabel,
        shape: settings.buttonShape,
      };
    }
    return restprops.style;
  }, [settings, restprops]);

  const errorFunc = (err: Record<string, unknown>) => {
    isLoading(false);
    notify("Error", (err.message as string) ?? "an error occurred");
    console.error(err);
  };

  let actions: any;

  if (vaultOnly) {
    actions = {
      createVaultSetupToken: () => handleCreateVaultSetupToken("paypal"),
      onApprove: handleApproveVaultSetupToken,
    };
  } else {
    actions = {
      createOrder: () => {
        return handleCreateOrder({
          storeInVault: save.current?.checked,
          paymentSource: "paypal",
        });
      },
      onApprove: handleOnApprove,
    };
  }

  return (
    <>
      <PayPalButtons
        {...restprops}
        style={style}
        {...actions}
        onError={errorFunc}
      />
      {(enableVaulting || storeInVaultOnSuccess) && (
        <label>
          <input
            type="checkbox"
            id="save"
            name="save"
            ref={save}
            className="mr-1"
          />
          Save for future purchases
        </label>
      )}

      {paypalMessages && <PayPalMessages {...paypalMessages} />}
    </>
  );
};
