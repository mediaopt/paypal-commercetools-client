import { FC, useEffect, useState } from "react";

import { useNotifications } from "../../app/useNotifications";

import { PayUponInvoiceProps, SmartComponentsProps } from "../../types";

import { RenderTemplate } from "../RenderTemplate";
import { embeddFraudNet } from "./fraudNetIntegration";
import { PayUponInvoiceButton } from "./PayUponInvoiceButton";
import { invoiceErrors } from "./InvoiceError";

export const PayUponInvoice: FC<SmartComponentsProps & PayUponInvoiceProps> = ({
  options,
  createPaymentUrl,
  getSettingsUrl,
  getClientTokenUrl,
  createOrderUrl,
  onApproveUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
  purchaseCallback,
  merchantId,
  pageId,
  invoiceBenefitsMessage,
}) => {
  const [fraudnetSessionId, setFraudnetSessionId] = useState<
    string | undefined
  >(undefined);

  const { notify } = useNotifications();

  const onLoad = (sessionId: string) => {
    if (sessionId) setFraudnetSessionId(sessionId);
    else {
      setFraudnetSessionId("");
      notify("Warning", invoiceErrors["noFraudNet"]);
    }
  };

  useEffect(() => {
    embeddFraudNet(merchantId, pageId, setFraudnetSessionId);
  }, []);

  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      getSettingsUrl={getSettingsUrl}
      createOrderUrl={createOrderUrl}
      getClientTokenUrl={getClientTokenUrl}
      onApproveUrl={onApproveUrl}
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
      purchaseCallback={purchaseCallback}
    >
      {fraudnetSessionId ? (
        <PayUponInvoiceButton
          fraudnetSessionId={fraudnetSessionId}
          invoiceBenefitsMessage={invoiceBenefitsMessage}
          purchaseCallback={purchaseCallback}
        />
      ) : (
        <></>
      )}
    </RenderTemplate>
  );
};
