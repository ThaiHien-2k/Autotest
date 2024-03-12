const { By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

class Action {
  constructor(driver) {
    this.driver = driver;
  }

  async click(element) {
    await this.waitForElement(element);
    await this.driver.findElement(element).click();
  }
  async input(element, value) {
    await this.waitForElement(element);
    await this.driver.findElement(element).sendKeys(value);
  }
  async waitForElement(element) {
    await this.driver.wait(until.elementLocated(element), 20000);
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

const TYPE = {
  input: "../input",
  icon: "../a",
  tab: "../../a",
  buttonHeader: "../../../a",
  inputPopup: "../../td/input",
};

function getXpath(label, type = "default") {
  switch (type) {
    case "input":
    case "icon":
    case "tab":
    case "buttonHeader":
    case "inputPopup":
      return By.xpath(`//*[contains(text(),"${label}")]/${TYPE[type]}`);
    case "button":
      return By.xpath(`//input[@value="${label}"]`);
    case "table":
      return By.xpath(`//table[@id="${label}"]`);
    case "default":
      return By.xpath(label);
    default:
      throw new Error("Invalid type: " + type);
  }
}

function getNewestFile(downloadPath) {
  const fileList = fs.readdirSync(downloadPath);

  let newestFile = null;
  let newestFileTime = 0;
  let birthtime = null;
  fileList.forEach((file) => {
    const filePath = path.join(downloadPath, file);

    const filename = fs.statSync(filePath);

    if (filename.birthtimeMs > newestFileTime) {
      newestFile = file;
      newestFileTime = filename.birthtimeMs;
      birthtime = new Date(filename.birthtime);
    }
  });

  const formattedBirthtime = birthtime;
  return formattedBirthtime;
}

module.exports = { Action, getXpath, getNewestFile };
