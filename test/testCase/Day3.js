const { By, until } = require("selenium-webdriver");
const { Action, getXpath } = require("../helpers/Action");

async function day3Goal(driver) {
  const elementInput = getXpath("案件名", "input");
  const value = "dev05";
  const tabName = getXpath("依頼先情報", "tab");
  const icon = getXpath("作業依頼先部署長名", "icon");
  const button = getXpath("検索", "button");
  const inputPopup = getXpath("メール", "inputPopup");
  const selectValue = By.xpath("//*[@id='1']/td[5]");

  const action = new Action(driver);

  //test input
  await action.input(elementInput, value);

  //test search
  await action.click(tabName);
  await action.click(icon);
  await action.input(inputPopup, "dev");
  await action.click(button);
  await action.click(selectValue);

  //screenShot
  await action.takeScreenshot();
}

module.exports = { day3Goal };
