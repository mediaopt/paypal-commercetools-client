import { makeRequest } from "../api";

import {
  RequestHeader,
  createInvoiceRequest,
  CreateOrderResponse,
} from "../types";

export const createPaypalInvoice = async (
  requestHeader: RequestHeader,
  url: string,
  invoiceData: createInvoiceRequest,
) => {
  try {
    return await makeRequest<CreateOrderResponse, createInvoiceRequest>(
      requestHeader,
      url,
      "POST",
      invoiceData,
    );
  } catch (error) {
    console.warn(error);
    return false;
  }
};
