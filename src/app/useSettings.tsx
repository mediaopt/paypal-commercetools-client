import React, {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import {
  GetSettingsResponse,
  SettingsProviderProps,
  GetUserInfoResponse,
  PaymentTokens,
} from "../types";
import { getSettings, getUserInfo, removePaymentToken } from "../services";

type SettingsContextT = {
  handleGetSettings: () => void;
  handleRemovePaymentToken: (paymentTokenId: string) => void;
  settings?: GetSettingsResponse;
  paymentTokens?: PaymentTokens;
};

const SettingsContext = createContext<SettingsContextT>({
  handleGetSettings: () => {},
  handleRemovePaymentToken: () => {},
  settings: undefined,
  paymentTokens: {},
});

export const SettingsProvider: FC<
  React.PropsWithChildren<SettingsProviderProps>
> = ({
  getUserInfoUrl,
  getSettingsUrl,
  requestHeader,
  options,
  children,
  removePaymentTokenUrl,
}) => {
  const [settings, setSettings] = useState<GetSettingsResponse>();
  const [userIdToken, setUserIdToken] = useState<string>();
  const [paymentTokens, setPaymentTokens] = useState<PaymentTokens>();

  const value = useMemo(() => {
    const handleGetSettings = async () => {
      if (getUserInfoUrl && !userIdToken) {
        const { userIdToken, paymentTokens } = (await getUserInfo(
          requestHeader,
          getUserInfoUrl
        )) as GetUserInfoResponse;

        setPaymentTokens(paymentTokens);
        setUserIdToken(userIdToken);
      }

      if (getSettingsUrl && !settings) {
        const getSettingsResult = (await getSettings(
          requestHeader,
          getSettingsUrl
        )) as GetSettingsResponse;

        setSettings(getSettingsResult);
      }
    };
    const handleRemovePaymentToken = async (paymentTokenId: string) => {
      if (removePaymentTokenUrl) {
        await removePaymentToken(
          requestHeader,
          removePaymentTokenUrl,
          paymentTokenId
        );

        if (paymentTokens) {
          const filterPaymentTokens = paymentTokens.payment_tokens?.filter(
            (paymentToken) => paymentToken.id !== paymentTokenId
          );
          paymentTokens.payment_tokens = filterPaymentTokens;
          setPaymentTokens({ ...paymentTokens });
        }
      }
    };

    return {
      settings,
      handleGetSettings,
      handleRemovePaymentToken,
      paymentTokens,
    };
  }, [settings, getSettingsUrl, paymentTokens]);

  useEffect(() => {
    if (!settings) {
      value.handleGetSettings();
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {settings ? (
        <PayPalScriptProvider
          options={{
            ...options,
            intent: settings.payPalIntent.toString().toLowerCase(),
            dataUserIdToken: userIdToken,
            dataPartnerAttributionId: settings.partnerAttributionId
              ? (settings.partnerAttributionId as string)
              : undefined,
          }}
        >
          {children}
        </PayPalScriptProvider>
      ) : (
        <></>
      )}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
