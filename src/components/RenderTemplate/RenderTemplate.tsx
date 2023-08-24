import { FC } from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { LoaderProvider } from "../../app/useLoader";
import { RenderPurchase } from "../RenderPurchase";

export const RenderTemplate: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NotificationsProvider>
      <LoaderProvider>
        <PaymentProvider>
          <RenderPurchase>{children}</RenderPurchase>
        </PaymentProvider>
      </LoaderProvider>
    </NotificationsProvider>
  );
};
