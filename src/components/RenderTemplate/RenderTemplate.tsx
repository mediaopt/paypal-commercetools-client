import { FC } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { LoaderProvider } from "../../app/useLoader";
import { RenderPurchase } from "../RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const RenderTemplate: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  options,

  createPaymentUrl,
  sessionKey,
  sessionValue,
  shippingMethodId,
  cartInformation,

  children,
}) => {
  return (
    <PayPalScriptProvider options={options}>
      <NotificationsProvider>
        <LoaderProvider>
          <PaymentProvider
            options={options}
            createPaymentUrl={createPaymentUrl}
            sessionKey={sessionKey}
            sessionValue={sessionValue}
            shippingMethodId={shippingMethodId}
            cartInformation={cartInformation}
          >
            <RenderPurchase>{children}</RenderPurchase>
          </PaymentProvider>
        </LoaderProvider>
      </NotificationsProvider>
    </PayPalScriptProvider>
  );
};
