import { PayUponInvoiceMask } from "./PayUponInvoiceMask";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { usePayment } from "../../app/usePayment";

jest.mock("react-i18next", () => ({
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
jest.mock("../../app/usePayment");

const fraudNetSessionId = "123";

const validPhone = "+49 123456789";
const wrongFormatPhone = "+49123456 789";
const tooLongPhone = "+49 123456789999999999999";
const tooShortPhone = "+49";

const validBirthDate = "2020-05-12";
const tooEarlyBirthDate = "0001-05-12";
const tooLateBirthDate = "9999-05-12";

const mockedHandler = jest.fn();
beforeEach(() => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {
      mockedHandler();
    },
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  cleanup();
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test("Mask is shown if dependencies provided", () => {
  expect(screen.getAllByRole("button").length).toEqual(1);
  expect(screen.getAllByLabelText("phoneNumber").length).toEqual(1);
  expect(screen.getAllByLabelText("birthDate").length).toEqual(1);
});

test(`${validBirthDate} input value for birthdate for invoice payments is valid`, () => {
  const birthDate = screen.getByLabelText("birthDate") as HTMLInputElement;
  fireEvent.change(birthDate, {
    target: { value: validBirthDate },
  });
  expect(birthDate).toBeValid();
});

test(`${validPhone} value for phone for invoice payment is valid`, () => {
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: validPhone },
  });
  expect(phone).toBeValid();
});

test(`${wrongFormatPhone} input value for the phone is formatted to ${validPhone}`, () => {
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: "+49123456 789" },
  });
  expect(phone.value).toEqual(validPhone);
});

test(`${tooLongPhone} is invalid`, () => {
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: "+49 123456789999999999999" },
  });
  expect(phone).toBeInvalid();
});

test(`${tooShortPhone} is invalid`, () => {
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: "+49" },
  });
  expect(phone).toBeInvalid();
});

test(`${tooEarlyBirthDate} birth date is invalid`, async () => {
  const birthDate = screen.getByLabelText("birthDate");
  fireEvent.change(birthDate, {
    target: { value: "0001-01-01" },
  });
  expect(birthDate).toBeInvalid();
});

test(`${tooLateBirthDate} birth date is invalid`, async () => {
  const birthDate = screen.getByLabelText("birthDate");
  fireEvent.change(birthDate, {
    target: { value: "19999999999999999999999-01-01" },
  });
  expect(birthDate).toBeInvalid();
});

test("Form with vailid input data is submitted", async () => {
  const phone = screen.getByLabelText("phoneNumber");
  fireEvent.change(phone, {
    target: { value: validPhone },
  });
  const birthDate = screen.getByLabelText("birthDate");
  fireEvent.change(birthDate, {
    target: { value: validBirthDate },
  });
  fireEvent.submit(screen.getByText("Pay"));
  await waitFor(() => expect(mockedHandler).toHaveBeenCalled());
});

test("Form with invailid phone is not submitted", async () => {
  const phone = screen.getByLabelText("phoneNumber");
  fireEvent.change(phone, {
    target: { value: tooShortPhone },
  });
  fireEvent.submit(screen.getByText("Pay"));
  await waitFor(() => expect(mockedHandler).not.toHaveBeenCalled());
});
