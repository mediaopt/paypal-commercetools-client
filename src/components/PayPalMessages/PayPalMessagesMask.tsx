import React from "react";
import {
  PayPalMessages,
  PayPalMessagesComponentProps,
} from "@paypal/react-paypal-js";

import { useSettings } from "../../app/useSettings";

type Layout = "text" | "flex" | "custom";
type LogoType = "primary" | "alternative" | "inline" | "none";
type LogoPosition = "left" | "right" | "top";
type TextColor = "black" | "white" | "monochrome" | "grayscale";
type TextSize = 10 | 11 | 12 | 13 | 14 | 15 | 16;
type TextAlign = "left" | "center" | "right";
type FlexRatio = "1x1" | "1x4" | "8x1" | "20x1";

export const PayPalMessagesMask: React.FC<PayPalMessagesComponentProps> = (
  props
) => {
  const { settings } = useSettings();

  if (!settings) return <></>;

  const {
    payLaterMessageDetailsPage: detailsPage,
    payLaterMessageCartPage: cartPage,
    payLaterMessagePaymentPage: paymentPage,
    payLaterMessageCategoryPage: categoryPage,
    payLaterMessageHomePage: homePage,
    payLaterMessagingType: messagingType,
    payLaterMessageTextLogoType: textLogoType,
    payLaterMessageTextLogoPosition: textLogoPosition,
    payLaterMessageTextColor: textColor,
    payLaterMessageTextSize: textSize,
    payLaterMessageTextAlign: textAlign,
    payLaterMessageFlexColor: flexColor,
    payLaterMessageFlexRatio: flexRatio,
  } = settings;

  const { placement } = props;
  const isProductDisabled = placement === "product" && detailsPage === false;
  const isCartDisabled = placement === "cart" && cartPage === false;
  const isPaymentDisabled = placement === "payment" && paymentPage === false;
  const isCategoryDisabled = placement === "category" && categoryPage === false;
  const isHomeDisabled = placement === "home" && homePage === false;
  if (
    isProductDisabled ||
    isCartDisabled ||
    isPaymentDisabled ||
    isCategoryDisabled ||
    isHomeDisabled
  ) {
    return <></>;
  }

  const messageLayout: Layout = placement ? messagingType[placement] : "text";

  const newProps: PayPalMessagesComponentProps = {
    style: {
      layout: messageLayout as Layout,
      ratio: flexRatio as FlexRatio,
      color: flexColor.toString(),

      logo: {
        type: textLogoType as LogoType,
        position: textLogoPosition as LogoPosition,
      },

      text: {
        color: textColor as TextColor,
        size: parseInt(textSize.toString()) as TextSize,
        align: textAlign as TextAlign,
      },
    },
  };

  return <PayPalMessages {...{ ...props, ...newProps }} />;
};
