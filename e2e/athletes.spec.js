import { delay } from "./testUtils";

describe("Athlete Tests", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should add an athlete to athlete list", async () => {
    await element(
      by.id("ATHLETES_TAB_BUTTON").and(by.trait("TouchableText"))
    ).tap();
  });
});
