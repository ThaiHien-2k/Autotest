const { By } = require("selenium-webdriver");
const { getXpath } = require("./Action");

class Login {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id("im_user");
    this.passwordInput = By.id("im_password");
    this.loginButton = getXpath("ログイン", "button");
  }
  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }
}

module.exports = Login;
