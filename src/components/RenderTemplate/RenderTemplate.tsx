import { FC } from "react";

import { NotificationsProvider } from "../../app/useNotifications";
// import { PaymentProvider } from "../../app/usePayment";
import { LoaderProvider } from "../../app/useLoader";
import { RenderPurchase } from "../RenderPurchase";

import { GeneralComponentsProps } from "../../types";

export const RenderTemplate: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  children,
  getClientTokenUrl,
  createPaymentUrl,
  createPaymentForVault,
  purchaseUrl,
  vaultPaymentMethodUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  cartInformation,
  taxAmount,
  shippingAmount,
  discountAmount,
  shippingMethodId,
}) => {
  return (
    <NotificationsProvider>
      <LoaderProvider>
{/*        <PaymentProvider
          getClientTokenUrl={getClientTokenUrl}
          createPaymentUrl={createPaymentUrl}
          createPaymentForVault={createPaymentForVault}
          purchaseUrl={purchaseUrl}
          vaultPaymentMethodUrl={vaultPaymentMethodUrl}
          sessionKey={sessionKey}
          sessionValue={sessionValue}
          purchaseCallback={purchaseCallback}
          cartInformation={cartInformation}
          taxAmount={taxAmount}
          shippingAmount={shippingAmount}
          discountAmount={discountAmount}
          shippingMethodId={shippingMethodId}
        >
          <RenderPurchase>{children}</RenderPurchase>
        </PaymentProvider>*/}
        <RenderPurchase>{children}</RenderPurchase>
      </LoaderProvider>
    </NotificationsProvider>
  );
};
