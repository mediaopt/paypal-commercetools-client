import { FC } from "react";

import { NotificationsProvider } from "../../app/useNotifications";
import { PaymentProvider } from "../../app/usePayment";
import { SettingsProvider } from "../../app/useSettings";
import { LoaderProvider } from "../../app/useLoader";
import { RenderPurchase } from "../RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const RenderTemplate: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  options,
  requestHeader,
  purchaseCallback,

  createPaymentUrl,
  getSettingsUrl,
  getClientTokenUrl,
  createOrderUrl,
  onApproveUrl,
  authorizeOrderUrl,
  getUserIdTokenUrl,
  removePaymentTokenUrl,

  shippingMethodId,
  cartInformation,
  enableVaulting,

  children,
}) => {
  return (
    <SettingsProvider
      options={options}
      getSettingsUrl={getSettingsUrl}
      requestHeader={requestHeader}
      getUserIdTokenUrl={getUserIdTokenUrl}
      removePaymentTokenUrl={removePaymentTokenUrl}
    >
      <NotificationsProvider>
        <LoaderProvider>
          <PaymentProvider
            options={options}
            createPaymentUrl={createPaymentUrl}
            getClientTokenUrl={getClientTokenUrl}
            getSettingsUrl={getSettingsUrl}
            createOrderUrl={createOrderUrl}
            onApproveUrl={onApproveUrl}
            requestHeader={requestHeader}
            shippingMethodId={shippingMethodId}
            cartInformation={cartInformation}
            purchaseCallback={purchaseCallback}
            authorizeOrderUrl={authorizeOrderUrl}
            enableVaulting={enableVaulting}
          >
            <RenderPurchase>{children}</RenderPurchase>
          </PaymentProvider>
        </LoaderProvider>
      </NotificationsProvider>
    </SettingsProvider>
  );
};
