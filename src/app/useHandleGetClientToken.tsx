import { useEffect } from "react";
import { usePayment } from "./usePayment";

export const useHandleGetClientToken = (disabled: boolean) => {
  const { handleCreatePayment } = usePayment();

  useEffect(() => {
    if (disabled) return;

    handleCreatePayment();
  }, [disabled]);
};
