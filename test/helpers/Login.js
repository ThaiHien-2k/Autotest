const { By } = require("selenium-webdriver");
const { getXpath } = require("./Action");
const MoveToURL = require("../helpers/MoveToURL");

class Login {
  constructor(driver, url) {
    this.driver = driver;
    this.usernameInput = By.id("im_user");
    this.passwordInput = By.id("im_password");
    this.loginButton = getXpath("ログイン", "button");
    this.url = url;
  }
  async login(username, password) {
    await this.driver.manage().window().maximize();
    await new MoveToURL(this.driver).open(this.url);
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
    console.log(`Login with account: ${username}`);
  }
}

module.exports = Login;
