const STYLED_LINK = "text-blue-500 cursor-pointer";

export const InvoiceLegalNote = (
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
