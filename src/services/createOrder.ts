import { makeRequest } from "../api";

import { RequestHeader } from "../types";

export const createOrder = async (
  requestHeader: RequestHeader,
  url: string
) => {
  try {
    return await makeRequest<any, {}>(requestHeader, url, "GET");
  } catch (error) {
    console.warn(error);
    return false;
  }
};
