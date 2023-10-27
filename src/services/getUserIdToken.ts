import { makeRequest } from "../api";

import { GetUserIdTokenResponse, RequestHeader } from "../types";

export const getUserIdToken = async (
  requestHeader: RequestHeader,
  url: string
) => {
  try {
    const result = await makeRequest<GetUserIdTokenResponse, {}>(
      requestHeader,
      url,
      "GET"
    );

    return result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};
