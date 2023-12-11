import { embeddFraudNet } from "./fraudNetIntegration";
import { cleanup, screen } from "@testing-library/react";
import loadScript from "../../app/loadScript";

const dummyMerchantId = "123";
const dummyPage = "home-page";
const dummySetId = (id: string | undefined) => {};

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  cleanup();
});

test("Fraudnet script integration is called", () => {
  const result = embeddFraudNet(dummyMerchantId, dummyPage, dummySetId);
  expect(result).toBeTruthy();
});

test("Nosript is integrated immediately", async () => {
  await embeddFraudNet(dummyMerchantId, dummyPage, dummySetId);
  const noscriptImage = screen.getAllByRole("img");
  expect(noscriptImage.length).toEqual(1);
});

jest.mock("../../app/loadScript");
test("Load script is called", async () => {
  (loadScript as jest.Mock).mockReturnValue(Promise.resolve());
  await embeddFraudNet(dummyMerchantId, dummyPage, dummySetId);
  expect(loadScript).toBeCalled();
});
