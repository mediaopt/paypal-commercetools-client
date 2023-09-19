import { makeRequest } from "../api";

import { RequestHeader } from "../types";

export const onApprove = async (
  requestHeader: RequestHeader,
  url: string,
  orderID: string
) => {
  try {
    return await makeRequest<any, {}>(requestHeader, url, "POST", { orderID });
  } catch (error) {
    console.warn(error);
    return false;
  }
};
