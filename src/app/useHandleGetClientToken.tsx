import { useEffect } from "react";
import { usePayment } from "./usePayment";
import { useLoader } from "./useLoader";

export const useHandleGetClientToken = (disabled: boolean) => {
  const { handleCreatePayment } = usePayment();
  const { isLoading } = useLoader();

  useEffect(() => {
    if (disabled) return;

    handleCreatePayment().finally(() => isLoading(false));
  }, [disabled]);
};
