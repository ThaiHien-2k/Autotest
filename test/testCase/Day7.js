const MoveToURL = require("../helpers/MoveToURL");
const Login = require("../helpers/Login");
const { Action, getXpath } = require("../helpers/Action");
const fs = require("fs");
const path = require("path");

async function day7Goal(driver) {
  const url_export = "http://158.101.91.74/imdi/bloommaker/export";
  const username = "dev05";
  const password = "dev05";
  const url = "http://158.101.91.74/imdi/login?";

  const moveToURLTest = new MoveToURL(driver);
  const loginTest = new Login(driver, url);
  const action = new Action(driver);

  // Login
  await loginTest.login(username, password);

  // Open url export
  await moveToURLTest.open(url_export);
  await driver.sleep(6000);
  await action.click(getXpath("//*[@id='export-select-radio']"));
  const elements = await driver.findElements(
    getXpath("//input[@placeholder='Search Keyword']")
  );

  //search
  const data = "nim059";
  for (const element of elements) {
    await element.sendKeys(data);
  }

  //select data
  const elements_checkbox = await driver.findElements(
    getXpath("//th[@class='center']//input")
  );

  for (const element of elements_checkbox) {
    await element.click();
  }

  await action.click(getXpath("//input[@value='Execute export']"));
  await driver.sleep(1000);

  //click submit
  const items = await driver.findElements(
    getXpath("//*[@class='accordion-header']//span//span/strong")
  );

  for (const item of items) {
    const value = await item.getText();
    if (value != "0 Item") {
      item.click();
      await driver.sleep(1000);
    }
  }

  await action.click(getXpath("//input[@value='Submit']"));
  await driver.sleep(10000);

  //check file download
  async function isFileDownloaded(filePath) {
    return fs.existsSync(filePath);
  }

  const downloadFilePath = path.join(
    "C:\\Users\\User\\Downloads",
    "im_bloommaker-data.zip"
  );

  const isDownloaded = await isFileDownloaded(downloadFilePath);
  if (isDownloaded) {
    console.log("Download successful");
  } else {
    console.log("Download failed");
  }
}
module.exports = { day7Goal };
