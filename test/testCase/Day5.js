const { By } = require("selenium-webdriver");
const MoveToURL = require("../helpers/MoveToURL");
const { Action, getXpath } = require("../helpers/Action");

async function day5Goal(driver) {
  const title_apl002 = "S&S作業依頼 作成";
  const moveToURL = new MoveToURL(driver);
  const action = new Action(driver);
  const selectValue1 = By.xpath(
    "//table[@id='database-ds-list']//tr[@id='1']//td[2]"
  );
  const selectValue2 = By.xpath("//tr[@id='1']//td[4]");
  const selectTable = By.xpath("//*[contains(text(),'追加')]");
  const icon = By.name("kyodo_hensyu_user_icon");

  await moveToURL.waitForTitle(title_apl002, 30000);
  await action.click(getXpath("共同編集者", "tab"));
  await driver.sleep(3000);

  //check rows
  const tableRows = await driver.findElements(
    getXpath("kyodo_hensyu", "table")
  );

  if (tableRows.length === 1) {
    await action.click(selectTable);
  } else {
  }
  await driver.sleep(300);

  //click icon
  await action.click(selectValue2);
  await action.click(icon);

  //select value
  await driver.sleep(3000);
  await action.input(getXpath("氏名", "inputPopup"), "dev");
  await driver.sleep(300);
  await action.click(getXpath("絞込み", "button"));
  await driver.sleep(300);
  await action.click(selectValue1);

  //check value select
  const value1 = await await driver.findElement(selectValue1).getText();
  await action.click(getXpath("決定", "button"));

  const value2 = await await driver.findElement(selectValue2).getText();

  if (value1 === value2) {
    console.log("Match");
  } else console.log("Not Match");
}
module.exports = { day5Goal };
