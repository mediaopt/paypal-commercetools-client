import { PayUponInvoiceMask } from "./PayUponInvoiceMask";
import { fireEvent, render, screen } from "@testing-library/react";
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

test("Mask is shown", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {
      console.log("creating order");
    },
  });
  const form = render(
    <PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />,
  );
  expect(form.getAllByRole("button").length).toEqual(1);
});

jest.mock("../../app/usePayment");

test("Mask is shown", () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: () => {},
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const birthDate = screen.getByLabelText("birthDate") as HTMLInputElement;
  fireEvent.change(birthDate, {
    target: { value: "2020-05-12" },
  });
  expect(birthDate.value).toEqual("2020-05-12");
});

test("Ratepay message is shown if received in handleCreateOrder", async () => {
  (usePayment as jest.Mock).mockReturnValue({
    handleCreateOrder: jest.fn(() => {}),
  });
  render(<PayUponInvoiceMask fraudNetSessionId={fraudNetSessionId} />);
  const handleOnSubmitMock = jest.fn();
  screen.getByRole("form").onsubmit = handleOnSubmitMock;
  fireEvent.submit(screen.getByText("Pay"), {
    target: {
      birthDate: { value: validBirthDate },
      phone: { value: validPhone },
    },
  });

  expect(handleOnSubmitMock).toHaveBeenCalled();
});
