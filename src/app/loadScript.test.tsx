import loadScript from "./loadScript";

test("loadScript is shown", () => {
  const result = loadScript(
    "https://www.paypal.com/sdk/js?client-id=test&currency=EUR&components=messages,buttons&commit=true&enable-funding=paylater&disable-funding=sepa,card,giropay,sofort&intent=capture"
  );
  expect(result).toBeTruthy();
});
