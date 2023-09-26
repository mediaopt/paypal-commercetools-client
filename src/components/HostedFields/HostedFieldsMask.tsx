import React, { useRef, useState } from "react";

import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import { usePayment } from "../../app/usePayment";
import { HostedFieldsProps } from "../../types";
import { useNotifications } from "../../app/useNotifications";
import "./styles.css";

const CUSTOM_FIELD_STYLE = {
  border: "1px solid #606060",
  boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
};
const INVALID_COLOR = {
  color: "#dc3545",
};

// Example of custom component to handle form submit

const SubmitPayment = ({ threeDSAuth }: { threeDSAuth?: string }) => {
  const customStyle = {
    border: "1px solid #606060",
    boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.1)",
  };
  const { notify } = useNotifications();
  const [paying, setPaying] = useState(false);
  const cardHolderName = useRef<HTMLInputElement>(null);
  const hostedField = usePayPalHostedFields();

  const handleClick = () => {
    if (!hostedField?.cardFields) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalHostedFieldsProvider />";

      notify("Error", childErrorMessage);
      throw new Error(childErrorMessage);
    }
    const isFormInvalid =
      Object.values(hostedField.cardFields.getState().fields).some(
        (field) => !field.isValid
      ) || !cardHolderName?.current?.value;

    if (isFormInvalid) {
      return alert("The payment form is invalid");
    }
    setPaying(true);
    hostedField.cardFields
      .submit({
        cardholderName: cardHolderName?.current?.value,
        contingencies: [threeDSAuth],
      })
      .then((data) => {
        // Needed only when 3D Secure contingency applied
        if (threeDSAuth) {
          if (data.liabilityShift === "POSSIBLE") {
            // 3D Secure passed successfully
          }

          if (data.liabilityShift) {
            // Handle buyer confirmed 3D Secure successfully
          }
        } else {
          // Your logic to capture the transaction
          fetch("url_to_capture_transaction", {
            method: "POST",
          })
            .then((response) => response.json())
            .then((data) => {
              // Here use the captured info
            })
            .catch((err) => {
              // Here handle error
            })
            .finally(() => {
              setPaying(false);
            });
        }
      })
      .catch((err) => {
        // Here handle error
        setPaying(false);
      });
  };

  return (
    <>
      <label title="This represents the full name as shown in the card">
        Card Holder Name
        <input
          id="card-holder"
          ref={cardHolderName}
          className="card-field"
          style={{ ...customStyle, outline: "none" }}
          type="text"
          placeholder="Full name"
        />
      </label>
      <button
        className={`btn${paying ? "" : " btn-primary"}`}
        style={{ float: "right" }}
        onClick={handleClick}
      >
        {paying ? <div className="spinner tiny" /> : "Pay"}
      </button>
    </>
  );
};

/*
* createOrder={function () {
							return fetch(
								"your_custom_server_to_create_orders",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										purchase_units: [
											{
												amount: {
													value: "2", // Here change the amount if needed
													currency_code: "USD", // Here change the currency if needed
												},
											},
										],
										intent: "capture",
									}),
								}
							)
								.then((response) => response.json())
								.then((order) => {
									// Your code here after create the order
									return order.id;
								})
								.catch((err) => {
									alert(err);
								});
						}}
*
* */

export const HostedFieldsMask: React.FC<HostedFieldsProps> = ({
  options,
  threeDSAuth,
}) => {
  const { clientToken } = usePayment();
  return (
    <PayPalScriptProvider
      options={{
        clientId: options.clientId,
        dataClientToken: clientToken,
        components: options.components,
        vault: options.vault,
      }}
    >
      <PayPalHostedFieldsProvider
        styles={{
          ".valid": { color: "#28a745" },
          ".invalid": { color: "#dc3545" },
          input: { "font-family": "monospace", "font-size": "16px" },
        }}
        createOrder={() => {
          return new Promise(() => {
            console.log("test");
          });
        }}
        notEligibleError={<h3>problem</h3>}
      >
        <label htmlFor="card-number">
          Card Number
          <span style={INVALID_COLOR}>*</span>
        </label>
        <PayPalHostedField
          className={"card-field"}
          style={CUSTOM_FIELD_STYLE}
          id={"card-number"}
          hostedFieldType={"number"}
          options={{
            selector: "#card-number",
            placeholder: "4111 1111 1111 1111",
          }}
        />
        <label htmlFor="cvv">
          CVV<span style={INVALID_COLOR}>*</span>
        </label>
        <PayPalHostedField
          className={"card-field"}
          style={CUSTOM_FIELD_STYLE}
          id={"cvv"}
          hostedFieldType={"cvv"}
          options={{ selector: "#cvv", maskInput: true, placeholder: "123" }}
        />
        <label htmlFor="expiration-date">
          Expiration Date
          <span style={INVALID_COLOR}>*</span>
        </label>
        <PayPalHostedField
          className={"card-field"}
          style={CUSTOM_FIELD_STYLE}
          id={"expiration-date"}
          hostedFieldType={"expirationDate"}
          options={{ selector: "#expiration-date", placeholder: "MM/YY" }}
        />
        <SubmitPayment threeDSAuth={threeDSAuth} />
      </PayPalHostedFieldsProvider>
    </PayPalScriptProvider>
  );
};
