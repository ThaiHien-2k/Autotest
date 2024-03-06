const { Builder } = require("selenium-webdriver");

const { day2Goal } = require("./testCase/Day2");
const { day3Goal } = require("./testCase/Day3");
const { day5Goal } = require("./testCase/Day5");
(async function HomePage() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    try {
      //day 2 goal
      await day2Goal(driver);

      //day 3 goal
      await day3Goal(driver);

      //day 5 goal
      await day5Goal(driver);
    } catch (error) {
      console.log(error);
    }
  } finally {
    // await driver.quit();
  }
})();
