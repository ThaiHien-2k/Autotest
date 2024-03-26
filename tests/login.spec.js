import { test, expect } from "@playwright/test";

const username = "dev051";
const password = "dev051";
test("test", async ({ page }) => {
  await page.goto("http://158.101.91.74/imdi/login");
  await page.getByLabel("User code").click();
  await page.getByLabel("User code").fill(username);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator("#header_title_8frqnxmotfv22m0")).toContainText(
    "Important notice"
  );
  await page.goto("http://158.101.91.74/imdi/bloommaker/export");
  await page.getByLabel("Select").check();
  await page.getByPlaceholder("Search Keyword").first().click();
  await page.getByPlaceholder("Search Keyword").first().fill("nim059");
  await page
    .getByRole("row", { name: "Reference Content ID Category" })
    .getByRole("checkbox")
    .check();
  await page.getByPlaceholder("Search Keyword").nth(1).click();
  await page.getByPlaceholder("Search Keyword").nth(1).fill("nim059");
  await page
    .getByRole("row", { name: "Reference Template ID" })
    .getByRole("checkbox")
    .check();
  await page.getByPlaceholder("Search Keyword").nth(2).click();
  await page.getByPlaceholder("Search Keyword").nth(2).fill("nim059");
  await page
    .getByRole("row", { name: "Reference Element set ID" })
    .getByRole("checkbox")
    .check();
  await page.getByPlaceholder("Search Keyword").nth(3).click();
  await page.getByPlaceholder("Search Keyword").nth(3).fill("nim059");
  await page
    .getByRole("row", { name: "Reference Routing ID Category" })
    .getByRole("checkbox")
    .check();
});
