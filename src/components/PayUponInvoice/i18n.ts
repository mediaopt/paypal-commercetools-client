import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: "en",

  resources: {
    en: {
      translation: {
        wrongPhone:
          "Could not identify country code or national phone number, please check the data.",
        birthDate: "Birth date",
        phoneNumber: "Phone number",
        thirdPartyIssue:
          "Pay upon invoice is currently not available. Please try again later.",
        wrongIntent: "Pay upon invoice is not available at the moment.",
        tooSmall: "Pay upon invoice is available starting from 5 euro.",
        tooBig:
          "Pay upon invoice is available only if amount is below 2500 euro.",
        pUILegalNote:
          "By clicking on the button, you agree to the <0>terms of payment</0> and <1>performance of a risk check</1> from the payment partner, Ratepay. You also agree to PayPal’s <2>privacy statement</2>. If your request to purchase upon invoice is accepted, the purchase price claim will be assigned to Ratepay, and you may only pay Ratepay, not the merchant.",
      },
    },
    de: {
      translation: {
        wrongPhone: "",
        birthDate: "",
        phoneNumber: "",
        thirdPartyIssue:
          "Die Zahlung per Rechnung ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",
        wrongIntent: "Die Zahlung per Rechnung ist zur Zeit nicht möglich.",
        tooSmall: "Zahlung auf Rechnung ist ab 5 Euro möglich.",
        tooBig:
          "Zahlung auf Rechnung ist nur möglich, wenn der Betrag unter 2500 Euro liegt.",
        pUILegalNote:
          "Mit Klicken auf den Button akzeptieren Sie die <0>Ratepay Zahlungsbedingungen</0> und erklären sich mit der Durchführung einer <1>Risikoprüfung durch Ratepay</1>, unseren Partner, einverstanden. Sie akzeptieren auch PayPals <2>Datenschutzerklärung</2>. Falls Ihre Transaktion per Kauf auf Rechnung erfolgreich abgewickelt werden kann, wird der Kaufpreis an Ratepay abgetreten und Sie dürfen nur an Ratepay überweisen, nicht an den Händler.",
      },
    },
  },
});

export default i18n;
