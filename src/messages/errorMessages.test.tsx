import { handleResponseError } from "./errorMessages";
import { cleanup } from "@testing-library/react";

const mockedT = jest.fn((str: string) => str);
const mockedNotify = jest.fn((str: string) => str);
const mockedShowError = jest.fn();

jest.mock("react-i18next", () => ({
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  useTranslation: () => {
    return {
      t: mockedT,
    };
  },
}));

jest.mock("i18next", () => ({
  __esModule: true,
  default: {
    exists: (str: string) => (str === "invoice.valid" ? true : false),
  },
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  cleanup();
});

test("if only message and details are provided - error with message is thrown", () => {
  expect(() =>
    handleResponseError(
      () => {},
      (type, text) => {},
      "details",
      "message",
    ),
  ).toThrowError("message");
});

test("if only details are provided - error with details as message is thrown", () => {
  expect(() =>
    handleResponseError(
      () => {},
      (type, text) => {},
      "details",
    ),
  ).toThrowError("details");
});

test("if show error is provided translation is called", () => {
  handleResponseError(mockedT, mockedNotify, "details", "message", jest.fn());
  expect(mockedT).toBeCalled();
});

test("if show error is provided and error is not recognized by i18n notification is called", () => {
  handleResponseError(mockedT, mockedNotify, "details", "message", jest.fn());
  expect(mockedNotify).toBeCalled();
});

test("if show error is provided and error is recognized in i18n showError is called", () => {
  handleResponseError(
    mockedT,
    mockedNotify,
    "details",
    "valid",
    mockedShowError,
  );
  expect(mockedShowError).toBeCalled();
});
