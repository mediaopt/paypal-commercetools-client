import { embeddFraudNet } from "./fraudNetIntegration";
import { screen } from "@testing-library/react";

const dummyMerchantId = "123";
const dummyPage = "home-page";
const dummySetId = (id: string | undefined) => {};

test("Fraudnet script integration is called", () => {
  const result = embeddFraudNet(dummyMerchantId, dummyPage, dummySetId);
  expect(result).toBeTruthy();
});

test("Nosript is integrated immediately", async () => {
  await embeddFraudNet(dummyMerchantId, dummyPage, dummySetId);
  const noscriptImage = screen.getAllByRole("img");
  expect(noscriptImage.length).toEqual(1);
});
