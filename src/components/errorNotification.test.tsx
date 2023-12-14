import { errorFunc } from "./errorNotification";
import { cleanup } from "@testing-library/react";

const mockedNotify = jest.fn((type: string, str: string) => str);
const mockedConsole = jest.fn((err: Record<string, unknown>) => {});
const t = (str: string) => str;
const isLoading = (active: boolean) => {};

jest.mock("i18next", () => ({
  __esModule: true,
  default: {
    exists: (str: string) => (str === "payPal.valid" ? true : false),
  },
}));

console.error = mockedConsole;

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  cleanup();
});

test("If paypal error kind is recognised notify with recognized error is called and error is logged in console", () => {
  errorFunc({ message: "valid" }, isLoading, mockedNotify, t);
  expect(mockedNotify).toBeCalledWith("Error", "payPal.valid");
  expect(mockedConsole).toBeCalledWith({ message: "valid" });
});

test("If paypal error kind is not recognised notify with general error is called and error is logged in console", () => {
  errorFunc({ message: "message" }, isLoading, mockedNotify, t);
  expect(mockedNotify).toBeCalledWith("Error", "interface.generalError");
  expect(mockedConsole).toBeCalledWith({ message: "message" });
});
