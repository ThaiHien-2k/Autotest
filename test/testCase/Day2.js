const MoveToURL = require("../helpers/MoveToURL");
const Login = require("../helpers/Login");
const { Action, getXpath } = require("../helpers/Action");

async function day2Goal(driver) {
  const url_apl004 =
    "http://150.230.202.111/imsl/forma/normal/view/regist_application_view/sf_nim006_apl004";
  const username = "dev05";
  const password = "dev05";
  const button_apl002 = getXpath("新規作業依頼", "buttonHeader");
  const title_apl002 = "S&S作業依頼 作成";
  const url = "http://150.230.202.111/imsl";

  const moveToURLTest = new MoveToURL(driver);
  const loginTest = new Login(driver, url);
  const action = new Action(driver);

  // Login
  await loginTest.login(username, password);

  // Open url apl004
  await moveToURLTest.open(url_apl004);

  // Open apl002
  await action.click(button_apl002);
  await moveToURLTest.switchToNewWindow(title_apl002);
}
module.exports = { day2Goal };
