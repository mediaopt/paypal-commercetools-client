import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useNotifications } from "../../app/useNotifications";

import { PayUponInvoiceProps, SmartComponentsProps } from "../../types";

import { RenderTemplate } from "../RenderTemplate";
import { embeddFraudNet } from "./fraudNetIntegration";
import { PayUponInvoiceButton } from "./PayUponInvoiceButton";
import i18n from "./i18n";

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
  minPayableAmount,
  maxPayableAmount,
}) => {
  const [fraudNetSessionId, setFraudNetSessionId] = useState<string>();

  const { notify } = useNotifications();
  const { t } = useTranslation();
  const locale = navigator.language.substring(0, 2);

  useEffect(() => {
    if (i18n.language !== locale && i18n.languages.includes(locale))
      i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (!fraudNetSessionId)
      embeddFraudNet(merchantId, pageId, setFraudNetSessionId);
  }, [merchantId, pageId, fraudNetSessionId]);

  useEffect(() => {
    if (fraudNetSessionId === "") notify("Warning", t("thirdPartyIssue"));
  }, [fraudNetSessionId, notify, t]);

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
      {fraudNetSessionId ? (
        <PayUponInvoiceButton
          fraudNetSessionId={fraudNetSessionId}
          invoiceBenefitsMessage={invoiceBenefitsMessage}
          purchaseCallback={purchaseCallback}
          maxPayableAmount={maxPayableAmount}
          minPayableAmount={minPayableAmount}
        />
      ) : (
        <></>
      )}
    </RenderTemplate>
  );
};
