import { FC, useEffect, useState } from "react";
import loadScript from "../../app/loadScript";
import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { SmartComponentsProps } from "../../types";
import { RenderTemplate } from "../RenderTemplate";
import { useHandleGetClientToken } from "../../app/useHandleGetClientToken";
import { v4 as uuidv4 } from "uuid";
import { useSettings } from "../../app/useSettings";

const STYLED_PAYMENT_FIELDS =
  "w-full p-3 mt-1.5 mb-4 h-10 text-base bg-white text-neutral-700 border border-gray-300 rounded box-border resize-y";

const STYLED_PAYMENT_BUTTON =
  "float-right text-center whitespace-nowrap inline-block font-normal align-middle select-none cursor-pointer text-white text-base rounded py-1.5 px-3 bg-sky-500 border-sky-500";

const STYLED_LINK = "text-blue-500 cursor-pointer";

const fraudnetFncls = "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99";
const fraudnetUrl = "https://c.paypal.com/da/r/fb.js";
const fraudnetParams = (
  fraudnetSessionId: string,
  pageId = "checkout-page",
) => {
  return {
    f: fraudnetSessionId.substring(0, 32),
    s: `W3KJAHBNV5BS6 ${pageId}`.substring(0, 32), //merchant id page id //Should merchant ID move to env variables?
    sandbox: true,
  };
};

const invoiceLegalNote = (
  <div className="w-full text-sm te">
    By clicking on the button, you agree to the{" "}
    <a
      className={STYLED_LINK}
      href="https://www.ratepay.com/legal-payment-terms"
    >
      terms of payment
    </a>{" "}
    and{" "}
    <a
      className={STYLED_LINK}
      href="https://www.ratepay.com/legal-payment-dataprivacy"
    >
      performance of a risk check
    </a>{" "}
    from the payment partner, Ratepay. You also agree to PayPal’s{" "}
    <a
      className={STYLED_LINK}
      href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full"
    >
      privacy statement
    </a>
    . If your request to purchase upon invoice is accepted, the purchase price
    claim will be assigned to Ratepay, and you may only pay Ratepay, not the
    merchant.
  </div>
);

const invoiceRequestBody = {
  intent: "CAPTURE",
  processing_instruction: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
  purchase_units: [
    {
      amount: {
        currency_code: "EUR",
        value: "100.00",
        breakdown: {
          item_total: {
            currency_code: "EUR",
            value: "81.00",
          },
          tax_total: {
            currency_code: "EUR",
            value: "19.00",
          },
        },
      },
      shipping: {
        name: {
          full_name: "John Doe",
        },
        address: {
          address_line_1: "Taunusanlage 12",
          admin_area_2: "FRANKFURT AM MAIN",
          postal_code: "60325",
          country_code: "DE",
        },
      },

      items: [
        {
          name: "Air Jordan Shoe",
          category: "PHYSICAL_GOODS",
          unit_amount: {
            currency_code: "EUR",
            value: "81.00",
          },

          tax: {
            currency_code: "EUR",
            value: "19.00",
          },
          tax_rate: "19.00",
          quantity: "1",
        },
      ],
      invoice_id: "MERCHANT_INVOICE_ID",
      custom_id: "MERCHANT_CUSTOM_ID",
    },
  ],
  payment_source: {
    pay_upon_invoice: {
      name: {
        given_name: "John",
        surname: "Doe",
      },
      email: "buyer@example.com",
      birth_date: "1990-01-01",
      phone: {
        national_number: "6912345678",
        country_code: "49",
      },
      billing_address: {
        address_line_1: "Schönhauser Allee 84",
        admin_area_2: "Berlin",
        postal_code: "10439",
        country_code: "DE",
      },
      experience_context: {
        locale: "en-DE",
        brand_name: "EXAMPLE INC",
        logo_url: "https://example.com/logoUrl.svg",
        customer_service_instructions: [
          "Customer service phone is +49 6912345678.",
        ],
      },
    },
  },
};

const PaypalInvoice: FC<{
  fraudnetSessionId: string;
  invoiceBenefitsNote?: string;
}> = ({ fraudnetSessionId, invoiceBenefitsNote }) => {
  const { settings } = useSettings();
  useHandleGetClientToken(false);
  const { handleCreateOrder } = usePayment();
  const invoiceAllowed = settings?.payPalIntent === "Capture";

  const paypalInvoiceRequest = async () => {
    const additionalInvoiceHeader = {
      "PAYPAL-CLIENT-METADATA-ID": fraudnetSessionId,
    };
    const res = await handleCreateOrder();
    console.log(res);
  };

  return invoiceAllowed ? (
    <form
      className="my-4"
      onSubmit={(event) => {
        event.preventDefault();
        console.log("submitting");
        //paypalInvoiceRequest()
      }}
    >
      {invoiceBenefitsNote && <div className="my-2">{invoiceBenefitsNote}</div>}
      <label htmlFor="birthDate">Birth date</label>
      <input
        type="date"
        className={STYLED_PAYMENT_FIELDS}
        required
        autoComplete="bday"
      />
      <label htmlFor="phone">Phone number</label>
      <input
        type="tel"
        //pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="049-123-123-1234"
        className={STYLED_PAYMENT_FIELDS}
        autoComplete="tel"
        required
      />
      {invoiceLegalNote}
      <button className={STYLED_PAYMENT_BUTTON} type="submit">
        Buy now
      </button>
    </form>
  ) : (
    <>Payment upon invoice is not supported at the moment</>
  );
};

export const PayUponInvoice: FC<
  SmartComponentsProps & { invoiceBenefitsNote?: string }
> = ({
  options,
  createPaymentUrl,
  getSettingsUrl,
  getClientTokenUrl,
  createOrderUrl,
  onApproveUrl,
  requestHeader,
  shippingMethodId,
  cartInformation,
  purchaseCallback,
  invoiceBenefitsNote,
}) => {
  const [fraudnetSessionId, setFraudnetSessionId] = useState<
    string | undefined
  >(undefined);

  const { notify } = useNotifications();

  const onLoad = (sessionId: string) => {
    if (sessionId) setFraudnetSessionId(sessionId);
    else {
      setFraudnetSessionId("");
      notify("Warning", invoiceErrors["noFraudNet"]);
    }
  };

  useEffect(() => {
    embeddFraudNet(merchantId, pageId, setFraudnetSessionId);
  }, []);

  return (
    <RenderTemplate
      options={options}
      createPaymentUrl={createPaymentUrl}
      getSettingsUrl={getSettingsUrl}
      createOrderUrl={createOrderUrl}
      getClientTokenUrl={getClientTokenUrl}
      onApproveUrl={onApproveUrl}
      requestHeader={requestHeader}
      shippingMethodId={shippingMethodId}
      cartInformation={cartInformation}
      purchaseCallback={purchaseCallback}
    >
      <PaypalInvoice
        fraudnetSessionId={fraudnetSessionId}
        invoiceBenefitsNote={invoiceBenefitsNote}
      />
    </RenderTemplate>
  ) : (
    <>Loading FraudNet</>
  );
};
