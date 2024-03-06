const { By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

class Action {
  constructor(driver) {
    this.driver = driver;
  }

  async click(button) {
    await this.driver.findElement(button).click();
  }
  async input(element, value) {
    await this.driver.findElement(element).sendKeys(value);
  }
  async waitForElement(element) {
    await this.driver.wait(until.elementLocated(element), 30000);
  }
  async takeScreenshot() {
    const screenshot = await this.driver.takeScreenshot();

    // Generate the filename with the current date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
    const dateString = `${year}${month}${day}${hour}${minute}${second}`;
    const filename = `screenShoot_${dateString}.png`;

    // Specify the folder path
    const folderPath = path.join(__dirname, "../../screenShots");

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Save the screenshot to the specified folder with the generated filename
    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, screenshot, "base64");

    console.log(`Screenshot saved to: ${filePath}`);
  }
}

function getXpath(label, type) {
  switch (type) {
    case "input":
      return By.xpath(`//*[contains(text(),"${label}")]/../input`);
    case "icon":
      return By.xpath(`//*[contains(text(),"${label}")]/../a`);
    case "tab":
      return By.xpath(`//*[contains(text(),"${label}")]/../../a`);
    case "button":
      return By.xpath(`//input[@value="${label}"]`);
    case "buttonHeader":
      return By.xpath(`//*[contains(text(),"${label}")]/../../../a`);
    case "inputPopup":
      return By.xpath(`//*[contains(text(),"${label}")]/../../td/input`);
    case "table":
      return By.xpath(`//table[@id="${label}"]`);
    default:
      throw new Error("Invalid type: " + type);
  }
}

module.exports = { Action, getXpath };
