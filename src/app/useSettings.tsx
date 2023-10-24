import React, {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { GetSettingsResponse, SettingsProviderProps } from "../types";
import { getSettings } from "../services";

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
> = ({ getSettingsUrl, requestHeader, options, children }) => {
  const [settings, setSettings] = useState<GetSettingsResponse>();

  const value = useMemo(() => {
    const handleGetSettings = async () => {
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
            dataPartnerAttributionId: settings.partnerAttributionId as string,
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
