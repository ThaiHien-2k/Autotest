const { Builder, By } = require("selenium-webdriver");
const MoveToURLTest = require("./testCase/MoveToURLTest");
const LoginTest = require("./testCase/LoginTest");
const { Action, getXpath } = require("./testCase/Action");

(async function HomePage() {
  const driver = await new Builder().forBrowser("chrome").build();
  const url_apl004 =
    "http://150.230.202.111/imsl/forma/normal/view/regist_application_view/sf_nim006_apl004";
  const button_apl004 = getXpath("ログイン画面へ", "button");
  const button_apl002 = getXpath("新規作業依頼", "buttonHeader");
  const title_apl002 = "S&S作業依頼 作成";
  const handlesNumber = 1;
  const username = "dev05";
  const password = "dev05";
  const elementInput = getXpath("案件名", "input");
  const value = "dev05";
  const tabName = getXpath("依頼先情報", "tab");
  try {
    const moveToURLTest = new MoveToURLTest(driver);
    const loginTest = new LoginTest(driver);
    const action = new Action(driver);

    try {
      //open url apl004
      await moveToURLTest.open(url_apl004);

      //login
      await driver.sleep(2000);
      await action.click(button_apl004);
      await loginTest.login(username, password);

      //open apl002
      await action.click(button_apl002);
      await moveToURLTest.switchToNewWindow(handlesNumber);
      await moveToURLTest.waitForTitle(title_apl002, 30000);

      //test ipnut
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

      //creeenShot
      await action.takeScreenshot();
    } catch (error) {
      console.log(error);
    }
  } finally {
    await driver.quit();
  }
})();
