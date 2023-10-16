import { makeRequest } from "../api";

import { CartInformation, RequestHeader } from "../types";

import { createPayment } from "./createPayment";
import { createOrder } from "./createOrder";
import { getClientToken } from "./getClientToken";
import { getSettings } from "./getSettings";
import { onApprove } from "./onApprove";

jest.mock("../api/request", () => {
  return {
    makeRequest: <ResponseType, T>(
      requestHeader: RequestHeader,
      url: string,
      method?: string,
      data?: T
    ) => {
      switch (url) {
        case "fail":
          return new Promise((resolve) => {
            process.nextTick(() => {
              try {
                throw Error("");
              } catch (e) {
                resolve(false);
              }
            });
          });
        case "createPayment":
          return new Promise<ResponseType>((resolve, reject) => {
            process.nextTick(() => {
              resolve({
                id: "",
                version: 0,
                amountPlanned: {
                  centAmount: 0,
                  currencyCode: "",
                  fractionDigits: 0,
                },
                lineItems: [],
                shippingMethod: [],
                braintreeCustomerId: "",
                customerVersion: "",
              } as ResponseType);
            });
          });
        case "createOrder":
          return new Promise<ResponseType>((resolve, reject) => {
            process.nextTick(() => {
              resolve({
                orderData: { id: "" },
                paymentVersion: "",
              } as ResponseType);
            });
          });
        case "getClientToken":
          return new Promise<ResponseType>((resolve, reject) => {
            process.nextTick(() => {
              resolve({
                clientToken: "",
                paymentVersion: "",
              } as ResponseType);
            });
          });
        case "getSettings":
          return new Promise<ResponseType>((resolve, reject) => {
            process.nextTick(() => {
              resolve({
                setting1: "",
                setting2: "",
              } as ResponseType);
            });
          });
        case "onApprove":
          return new Promise<ResponseType>((resolve, reject) => {
            process.nextTick(() => {
              resolve({
                orderData: { id: "", status: "", message: "" },
                paymentVersion: 0,
              } as ResponseType);
            });
          });

        default:
      }
    },
  };
});

test("error on make request", () => {
  expect.assertions(1);
  return makeRequest({}, "fail", "", "").then((result) => {
    expect(result).toBeFalsy();
  });
});

describe("Create payment", () => {
  test("creating payment", () => {
    const cartInformation = {} as CartInformation;
    expect.assertions(2);
    return createPayment({}, "createPayment", cartInformation, "").then(
      (result) => {
        expect(result).toHaveProperty("amountPlanned");
        expect(result).toHaveProperty("version");
      }
    );
  });
});

describe("Create order", () => {
  test("creating order", () => {
    expect.assertions(2);
    return createOrder({}, "createOrder", "", 0).then((result) => {
      expect(result).toHaveProperty("orderData");
      expect(result).toHaveProperty("paymentVersion");
    });
  });
});

describe("Client token", () => {
  test("getting clientToken", () => {
    expect.assertions(2);
    return getClientToken({}, "getClientToken", "", 0).then((result) => {
      expect(result).toHaveProperty("clientToken");
      expect(result).toHaveProperty("paymentVersion");
    });
  });
});

describe("settings", () => {
  test("getting settings", () => {
    expect.assertions(2);
    return getSettings({}, "getSettings").then((result) => {
      expect(result).toHaveProperty("setting1");
      expect(result).toHaveProperty("setting2");
    });
  });
});

describe("Approve", () => {
  test("approving order", () => {
    expect.assertions(2);
    return onApprove({}, "onApprove", "", 0, "").then((result) => {
      expect(result).toHaveProperty("orderData");
      expect(result).toHaveProperty("paymentVersion");
    });
  });
});
