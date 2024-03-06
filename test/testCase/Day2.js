const MoveToURL = require("../helpers/MoveToURL");
const Login = require("../helpers/Login");
const { Action, getXpath } = require("../helpers/Action");

async function day2Goal(driver) {
  const url_apl004 =
    "http://150.230.202.111/imsl/forma/normal/view/regist_application_view/sf_nim006_apl004";
  const button_apl004 = getXpath("ログイン画面へ", "button");
  const username = "dev05";
  const password = "dev05";
  const button_apl002 = getXpath("新規作業依頼", "buttonHeader");
  const title_apl002 = "S&S作業依頼 作成";
  const handlesNumber = 1;

  const moveToURLTest = new MoveToURL(driver);
  const loginTest = new Login(driver);
  const action = new Action(driver);

  // Open url apl004
  await moveToURLTest.open(url_apl004);

  // Login
  await action.click(button_apl004);
  await loginTest.login(username, password);

  // Open apl002
  await action.click(button_apl002);
  await moveToURLTest.switchToNewWindow(handlesNumber);
  await moveToURLTest.waitForTitle(title_apl002, 30000);
}
module.exports = { day2Goal };
