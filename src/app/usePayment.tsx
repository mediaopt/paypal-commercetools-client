import { FC, createContext, useContext, useState, useMemo } from "react";
import { Result } from "../components/Result";

type PaymentContextT = {
  setSuccess: () => void;
};

const PaymentContext = createContext<PaymentContextT>({ setSuccess: () => {} });

export const PaymentProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [showResult, setShowResult] = useState(false);
  const [resultSuccess, setResultSuccess] = useState<boolean>();
  const [resultMessage, setResultMessage] = useState<string>();

  const value = useMemo(() => {
    const setSuccess = () => {
      setResultSuccess(true);
      setShowResult(true);
      setResultMessage("Test success successful");
    };

    return {
      setSuccess,
    };
  }, []);

  return (
    <PaymentContext.Provider value={value}>
      {showResult ? (
        <Result success={resultSuccess} message={resultMessage} />
      ) : (
        children
      )}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
