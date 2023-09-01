import { useEffect } from "react";
import { usePayment } from "./usePayment";

export const useHandleCreatePayment = () => {
  const { handleCreatePayment } = usePayment();

  useEffect(() => {
    handleCreatePayment();
  }, []);
};
