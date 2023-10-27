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
  GetUserIdTokenResponse,
} from "../types";
import { getSettings, getUserIdToken } from "../services";

type SettingsContextT = {
  handleGetSettings: () => void;
  settings?: GetSettingsResponse;
};

const SettingsContext = createContext<SettingsContextT>({
  handleGetSettings: () => {},
  settings: {},
});

export const SettingsProvider: FC<
  React.PropsWithChildren<SettingsProviderProps>
> = ({
  getUserIdTokenUrl,
  getSettingsUrl,
  requestHeader,
  options,
  children,
}) => {
  const [settings, setSettings] = useState<GetSettingsResponse>();
  const [userIdToken, setUserIdToken] = useState<string>();

  const value = useMemo(() => {
    const handleGetSettings = async () => {
      if (getUserIdTokenUrl && !userIdToken) {
        const { userIdToken } = (await getUserIdToken(
          requestHeader,
          getUserIdTokenUrl
        )) as GetUserIdTokenResponse;

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

    return {
      settings,
      handleGetSettings,
    };
  }, [settings, getSettingsUrl]);

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
