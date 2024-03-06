const { By } = require("selenium-webdriver");
const { Action, getXpath } = require("../helpers/Action");

async function day3Goal(driver) {
  const elementInput = getXpath("案件名", "input");
  const value = "dev05";
  const tabName = getXpath("依頼先情報", "tab");

  const action = new Action(driver);

  //test input
  await action.input(elementInput, value);

  //test search
  await action.click(tabName);
  await driver.sleep(7000);
  await action.click(getXpath("作業依頼先部署長名", "icon"));
  await driver.sleep(3000);
  await action.input(getXpath("メール", "inputPopup"), "dev");
  await action.click(getXpath("検索", "button"));
  await driver.sleep(3000);
  await action.click(By.xpath("//*[@id='1']/td[5]"));

  //screenShot
  await action.takeScreenshot();
}

module.exports = { day3Goal };
