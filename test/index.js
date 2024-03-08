const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { day2Goal } = require("./testCase/Day2");
const { day3Goal } = require("./testCase/Day3");
const { day5Goal } = require("./testCase/Day5");
const { day6Goal } = require("./testCase/Day6");
(async function Index() {
  const option = new chrome.Options();
  option.addArguments("--log-level=3");
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(option)
    .build();
  const startTime = new Date().getTime();
  try {
    try {
      // // day 2 goal
      // await day2Goal(driver);

      // //day 3 goal
      // await day3Goal(driver);

      // //day 5 goal
      // await day5Goal(driver);

      //day 6 goal
      await day6Goal(driver);
    } catch (error) {
      console.log(error);
    }
  } finally {
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    console.log(`\nExecution Time: ${executionTime}s\n`);
    // await driver.quit();
  }
})();
