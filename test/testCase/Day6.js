const { By } = require("selenium-webdriver");
const MoveToURL = require("../helpers/MoveToURL");
const { Action, getXpath } = require("../helpers/Action");
const Login = require("../helpers/Login");
const { get } = require("selenium-webdriver/http");

async function day6Goal(driver) {
  const url = "http://150.230.202.111/imsl";
  const url_apl006 =
    "http://150.230.202.111/imsl/forma/normal/view/regist_application_view/sf_nim006_apl006";
  const searchBox = getXpath("案件名", "input");
  const valueSearch = "1142_202402_01_20240307144756";
  const buttonSearch = getXpath("検索", "button");
  const editButton = getXpath("//table[@id='itiran_frozen']//tr[2]/td[4]/a");
  const table = getXpath("itiran", "table");
  const status = getXpath("//*[@id='jotai']/label/select/option[@selected]");
  const title_apl002 =
    "販売事業本部/香川支社/香川Ｓ＆Ｓ部/香川西サービスステーション";
  const username = "dev06";
  const password = "dev06";

  const login = new Login(driver, url);
  const moveToURL = new MoveToURL(driver);
  const action = new Action(driver);
  const table2 = getXpath("ce_detail", "table");
  const buttonAdd = By.xpath("//*[contains(text(),'追加')]");
  const selectValue2 = By.xpath("//tr[@id='1']//td[4]");
  const icon = By.name("ce_detail_user_icon");
  const selectValue1 = By.xpath(
    "//table[@id='ce_detail_user_list']//tr[@id='1']//td[2]"
  );
  //login
  await login.login(username, password);

  // Open url apl006
  await moveToURL.open(url_apl006);

  // Search
  await action.input(searchBox, valueSearch);
  await action.click(buttonSearch);
  const tableRows = await driver.findElements(table);

  if (tableRows.length >= 1) {
    await action.click(editButton);
  } else {
    console.log("No data !!!");
  }

  await moveToURL.switchToNewWindow(title_apl002);

  //set CE
  //switch tab
  await action.click(getXpath("訪問CE情報", "tab"));
  await action.waitForElement(table2);

  //check rows
  const tableRows2 = await driver.findElements(table2);
  if (tableRows2.length === 1) {
    await action.click(buttonAdd);
  } else {
  }

  //click icon
  await action.click(selectValue2);
  await action.click(icon);
  await action.click(selectValue1);
  const button = getXpath("決定", "button");
  await action.click(button);

  //keep
  await action.click(getXpath("受領処理", "buttonHeader"));

  //confirm
  const confirm = await driver.findElements(
    getXpath("//*[contains(text(),'決定')]")
  );
  await confirm[1].click();
  await driver.sleep(20000);
  console.log("set CE success");

  //set work cost
  //switch tab
  await action.click(getXpath("作業費用", "tab"));
  await action.input(getXpath("問合せ番号", "input"), "23-4567-8901");

  //set value 統合ID
  await action.click(getXpath("統合ID", "icon"));
  await action.input(getXpath("統合ID", "inputPopup"), "a");
  await action.click(getXpath("検索", "button"));
  await action.click(getXpath("//*[@id='1']/td[1]"));

  //keep
  await action.click(getXpath("保存", "buttonHeader"));
  await driver.sleep(3000);

  //check なし
  await action.click(
    getXpath("//input[@name='item_ffm_renkei' and @value = '2']")
  );

  //keep
  await action.click(getXpath("作業完了", "buttonHeader"));

  //confirm
  const confirm2 = await driver.findElements(
    getXpath("//*[contains(text(),'決定')]")
  );
  await confirm2[1].click();
  await driver.sleep(20000);
  console.log("set work cost");

  const status1 = await driver.findElement(status).getAttribute("value");
  if (status1 === "06") {
    console.log("success");
  } else {
    console.log("false");
  }
}
module.exports = { day6Goal };
