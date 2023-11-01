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
  createInvoiceUrl,
  onApproveUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
  purchaseCallback,
  merchantId,
  pageId,
  invoiceBenefitsMessage,
}) => {
  const [fraudNetSessionId, setFraudNetSessionId] = useState<
    string | undefined
  >(undefined);

  const { notify } = useNotifications();

  const onLoad = (sessionId?: string) => {
    if (sessionId) setFraudNetSessionId(sessionId);
    else {
      setFraudNetSessionId("");
      notify("Warning", invoiceErrors["thirdPartyIssue"]);
    }
  };

  useEffect(() => {
    embeddFraudNet(merchantId, pageId, onLoad);
  }, []);

  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      getSettingsUrl={getSettingsUrl}
      createOrderUrl={createOrderUrl}
      createInvoiceUrl={createInvoiceUrl}
      getClientTokenUrl={getClientTokenUrl}
      onApproveUrl={onApproveUrl}
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
      purchaseCallback={purchaseCallback}
    >
      {fraudNetSessionId ? (
        <PayUponInvoiceButton
          fraudNetSessionId={fraudNetSessionId}
          invoiceBenefitsMessage={invoiceBenefitsMessage}
          purchaseCallback={purchaseCallback}
        />
      ) : (
        <></>
      )}
    </RenderTemplate>
  );
};
