const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { day2Goal } = require("./testCase/Day2");
const { day3Goal } = require("./testCase/Day3");
const { day5Goal } = require("./testCase/Day5");
const { day6Goal } = require("./testCase/Day6");
const { day7Goal } = require("./testCase/Day7");
const path = require("path");
(async function Index() {
  const insecureOriginDominURL = "http://158.101.91.74/imdi/";
  const option = new chrome.Options();
  option.addArguments("--log-level=3");
  option.setUserPreferences({
    "download.default_directory": path.join(__dirname, "../downloads"),
    "download.prompt_for_download": false,
  });

  option.addArguments(
    "--unsafely-treat-insecure-origin-as-secure=" + insecureOriginDominURL
  );
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
      // await day6Goal(driver, "1142_202402_01_20240307143930");

      //day 7 goal
      await day7Goal(driver);
    } catch (error) {
      console.log(error);
    }
  } finally {
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    console.log(`\nExecution Time: ${executionTime}s\n`);
    await driver.quit();
  }
})();
