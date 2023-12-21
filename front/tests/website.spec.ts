import { test, expect } from "@playwright/test";

const url = "http://localhost:8000";
test.beforeEach(() => {});

test("navbar navigation works on clicks", async ({ page }) => {
    await page.goto(url);

    await expect(page.getByLabel("Info")).toBeVisible();
    await expect(page.getByLabel("Map").nth(0)).toBeVisible();

    await page.getByLabel("Info").click();
    await page.getByLabel("Map").nth(0).click();
})

test("dark mode toggling works", async ({ page }) => {
    await page.goto(url);

})
test("submit button works", async ({ page }) => {
  await page.goto(url);
  await page
    .getByLabel("Command input")
    .fill("Summit");
  await page.locator("Select a state!").selectOption("Utah");
  await page.getByLabel("Submit Button").click();
  await expect(page.locator("botom")).toContainText(
    "highlighted!"
  );
});

test("wrong county input", async ({ page }) => {
  await page.goto(url);
});

test("wrong state input", async ({ page }) => {
  await page.goto(url);
});


test("recommendation button", async ({ page }) => {
  await page.goto(url);
});

test("unemployment data button", async ({ page }) => {
  await page.goto(url);
});

