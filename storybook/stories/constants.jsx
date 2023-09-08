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

export const options = { clientId: "test" };

export const params = {
  createPaymentUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/createPayment`,
  sessionKey: "frontastic-session",
  sessionValue:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJjZDNiYjhmOS1jOTQzLTRmMGUtYmZiZS04Y2I5ZmUyMDExYTYiLCJ3aXNobGlzdElkIjoiZmYwODI3OGYtMzdjOC00YmJkLTgzZmItYmQ1NjFkNTQ5YTcyIn0.YefiGWoAm2sEDCth2BdbSm_K2AAETog1keX6ycoEvAk",
  cartInformation: cartInformation,
};
