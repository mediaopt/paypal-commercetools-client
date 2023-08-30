import { FC } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { LoaderProvider } from "../../app/useLoader";
import { RenderPurchase } from "../RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const RenderTemplate: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({ clientId, children }) => {
  return (
    <PayPalScriptProvider options={{ clientId }}>
      <NotificationsProvider>
        <LoaderProvider>
          <PaymentProvider>
            <RenderPurchase>{children}</RenderPurchase>
          </PaymentProvider>
        </LoaderProvider>
      </NotificationsProvider>
    </PayPalScriptProvider>
  );
};
