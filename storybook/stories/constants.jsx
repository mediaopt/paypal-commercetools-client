const cartInformation = {
  account: {
    email: "test@test.com",
  },
  billing: {
    firstName: "John",
    lastName: "Smith",
    streetName: "Hochstraße",
    streetNumber: "37",
    city: "Berlin",
    country: "DE",
    postalCode: "12045",
  },
  shipping: {
    firstName: "John",
    lastName: "Smith",
    streetName: "Hochstraße",
    streetNumber: "37",
    city: "Berlin",
    country: "DE",
    postalCode: "12045",
  },
};

export const params = {
  clientId: "test",
  createPaymentUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/createPayment`,
  sessionKey: "frontastic-session",
  sessionValue:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiMzZiNzFlYTktNzk1OC00NzY0LWJmMGYtYjQ1Y2QwMzY3YzIxIiwiY2FydElkIjoiNjE0ZDQ4ZjItY2U0ZC00NTU0LTljMmQtMDI4MWJiMTQxZjI5In0.QJ-s757kFbm_ZZ8wpt_2wqw2AZCnHj2RTxiv8aMFNgo",
  cartInformation: cartInformation,
};
