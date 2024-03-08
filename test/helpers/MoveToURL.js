const { until } = require("selenium-webdriver");

class MoveToURL {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
  }
  async waitForTitle(title, seconds = 40000) {
    await this.driver.wait(until.titleIs(title), seconds);
  }
  async switchToNewWindow(title, handlesNumber) {
    await this.driver.sleep(2000);
    const handles = await this.driver.getAllWindowHandles();
    if (handlesNumber || handlesNumber == 0) {
      await this.driver.switchTo().window(handles[handlesNumber]);
    } else {
      await this.driver.switchTo().window(handles[handles.length - 1]);
    }
    if (title) {
      await this.waitForTitle(title);
    }
  }
}

module.exports = MoveToURL;
