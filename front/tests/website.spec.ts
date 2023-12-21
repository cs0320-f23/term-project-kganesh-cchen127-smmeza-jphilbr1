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
  await page.getByLabel("state").selectOption("Utah");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("notification")).toContainText(
    "highlighted!"
  );
});

test("wrong county input with state", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("Command input").fill("asldfj");
  await page.getByLabel("state").selectOption("Utah");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("notification")).toContainText("not found!");
});

test("county input with no state", async ({ page }) => {
   await page.goto(url);
   await page.getByLabel("Command input").fill("asldfj");
   await page.getByLabel("Submit Button").click();
   await expect(page.getByLabel("notification")).toContainText("Please select a state!");
});

test("wrong state input with a correct county", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("Command input").fill("Orange");
  await page.getByLabel("state").selectOption("Utah");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("notification")).toContainText("not found!");
});

test("state input with no county", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("state").selectOption("Utah");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("notification")).toContainText("not found!");
});


test("recommendation button", async ({ page }) => {
  await page.goto(url);
});

test("unemployment data button", async ({ page }) => {
  await page.goto(url);
});

