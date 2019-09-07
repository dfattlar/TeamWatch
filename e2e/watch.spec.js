// import { delay } from "./testUtils";

// describe("Watch Tests", () => {
//   beforeEach(async () => {
//     await device.reloadReactNative();
//   });

//   it("should have a start button that starts time", async () => {
//     await element(by.id("StartButton")).tap();
//     await delay(1000); // force sleep so clock can run
//     await element(by.id("StartButton")).tap();
//     await expect(element(by.id("s1"))).toHaveText("0");
//     await expect(element(by.id("s2"))).toHaveText("1");
//   });

//   it("should have a start button that toggles START/STOP", async () => {
//     await expect(element(by.id("StartButton"))).toBeVisible();
//     await expect(element(by.text("START"))).toBeVisible();
//     await expect(element(by.text("STOP"))).toBeNotVisible();

//     // start button press
//     await element(by.id("StartButton")).tap();

//     await expect(element(by.text("START"))).toBeNotVisible();
//     await expect(element(by.text("STOP"))).toBeVisible();

//     // stop button press
//     await element(by.id("StartButton")).tap();

//     await expect(element(by.text("START"))).toBeVisible();
//     await expect(element(by.text("STOP"))).toBeNotVisible();
//   });

//   // it('should show hello screen after tap', async () => {
//   //   await element(by.id('hello_button')).tap();
//   //   await expect(element(by.text('Hello!!!'))).toBeVisible();
//   // });

//   // it('should show world screen after tap', async () => {
//   //   await element(by.id('world_button')).tap();
//   //   await expect(element(by.text('World!!!'))).toBeVisible();
//   // });
// });
