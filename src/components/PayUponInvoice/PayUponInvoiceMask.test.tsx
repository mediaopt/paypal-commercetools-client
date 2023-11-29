import { PayUponInvoiceMask } from "./PayUponInvoiceMask";
import { render } from "@testing-library/react";

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

const defaultParams = { fraudNetSessionId: "123" };
test("Mask is shown", () => {
  const form = render(<PayUponInvoiceMask {...defaultParams} />);
  expect(form.getAllByRole("button").length).toEqual(1);
});
