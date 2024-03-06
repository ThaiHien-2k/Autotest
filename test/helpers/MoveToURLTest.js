const { By, until } = require("selenium-webdriver");

class MoveToURLTest {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
  }
  async waitForTitle(title, seconds) {
    await this.driver.wait(until.titleIs(title), seconds);
  }
  async switchToNewWindow(handlesNumber) {
    const handles = await this.driver.getAllWindowHandles();
    await this.driver.switchTo().window(handles[handlesNumber]);
  }
}

module.exports = MoveToURLTest;
