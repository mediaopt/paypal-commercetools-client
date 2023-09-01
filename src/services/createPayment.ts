import { makeRequest } from "../api";

import { CreatePaymentResponse, CartInformation } from "../types";

export const createPayment = async (
  sessionKey: string,
  sessionValue: string,
  url: string,
  cartInformation: CartInformation,
  shippingMethodId?: string
) => {
  try {
    const result = await makeRequest<CreatePaymentResponse, {}>(
      sessionKey,
      sessionValue,
      url,
      "POST",
      { ...cartInformation, shippingMethodId: shippingMethodId }
    );

    return result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};
