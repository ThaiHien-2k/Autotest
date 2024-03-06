const { By } = require("selenium-webdriver");
const MoveToURL = require("../helpers/MoveToURL");
const { Action, getXpath } = require("../helpers/Action");

async function day5Goal(driver) {
  const title_apl002 = "S&S作業依頼 作成";
  const moveToURLTest = new MoveToURL(driver);
  const action = new Action(driver);

  await moveToURLTest.waitForTitle(title_apl002, 30000);
  await action.click(getXpath("共同編集者", "tab"));
  await driver.sleep(3000);

  //check rows
  const tableRows = await driver.findElements(
    getXpath("kyodo_hensyu", "table")
  );

  if (tableRows.length === 1) {
    await action.click(By.xpath("//*[contains(text(),'追加')]"));
  } else {
  }
  await driver.sleep(300);

  //click icon
  await action.click(By.xpath("//tr[@id='1']//td[4]"));
  await action.click(By.name("kyodo_hensyu_user_icon"));

  //select value
  await driver.sleep(3000);
  await action.input(getXpath("氏名", "inputPopup"), "dev");
  await driver.sleep(300);
  await action.click(getXpath("絞込み", "button"));
  await driver.sleep(300);
  await action.click(
    By.xpath("//table[@id='database-ds-list']//tr[@id='1']//td[2]")
  );

  //check value select
  const value1 = await await driver
    .findElement(
      By.xpath("//table[@id='database-ds-list']//tr[@id='1']//td[2]")
    )
    .getText();
  await action.click(getXpath("決定", "button"));

  const value2 = await await driver
    .findElement(By.xpath("//tr[@id='1']//td[4]"))
    .getText();

  if (value1 === value2) {
    console.log("Match");
  } else console.log("Not Match");
}
module.exports = { day5Goal };
