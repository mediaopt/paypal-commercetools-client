import { PayUponInvoiceMask } from "./PayUponInvoiceMask";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

const fraudNetSessionId = "123";
const validPhone = "+49 123456789";
const validBirthDate = "2020-05-12";

test("Mask is shown if dependencies provided", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  const form = render(
    <PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />,
  );
  expect(form.getAllByRole("button").length).toEqual(1);
});

jest.mock("../../app/usePayment");
const mockedHandler = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test("Correct input value for birthdate for invoice payments can be set", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const birthDate = screen.getByLabelText("birthDate") as HTMLInputElement;
  fireEvent.change(birthDate, {
    target: { value: validBirthDate },
  });
  expect(birthDate.value).toEqual(validBirthDate);
});

test("Correct input value for phone for invoice payments can be set", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: validPhone },
  });
  expect(phone.value).toEqual(validPhone);
});

test("Correct input value for the phone is formatted to match the requested format", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: "+49123456 789" },
  });
  expect(phone.value).toEqual(validPhone);
});

test("Too long phone number is invalid", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: "+49 123456789999999999999" },
  });
  expect(phone).toBeInvalid();
});

test("Too short phone is recognized as invalid", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const phone = screen.getByLabelText("phoneNumber") as HTMLInputElement;
  fireEvent.change(phone, {
    target: { value: "+49" },
  });
  expect(phone).toBeInvalid();
});

test("Invalid birth date in the past is recognized as invalid", async () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: jest.fn(() => {}),
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const birthDate = screen.getByLabelText("birthDate");

  fireEvent.change(birthDate, {
    target: { value: "0001-01-01" },
  });
  expect(birthDate).toBeInvalid();
});

test("Invalid birth date in the distant future is recognized as invalid", async () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: jest.fn(() => {}),
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const birthDate = screen.getByLabelText("birthDate");

  fireEvent.change(birthDate, {
    target: { value: "19999999999999999999999-01-01" },
  });
  expect(birthDate).toBeInvalid();
});
test("Form with correct input data can be submit", async () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {
      mockedHandler();
    },
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
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
