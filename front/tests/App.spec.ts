import { test, expect } from "@playwright/test";

const url = "http://localhost:8000";
test.beforeEach(() => {});

test("on page load, i see the expected labels", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Map Container")).toBeVisible();
  await expect(page.getByLabel("History")).toBeEmpty();
  await expect(page.getByText("Enter!")).toBeVisible();
  await expect(page.getByRole("button")).toBeVisible();
});

// test that everything shows up with real data

// search
test("search success", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
      .getByPlaceholder("Enter command here!")
      .fill('search rental units');
  await page.getByLabel("Submit Button").click();    
  await expect(page.getByLabel("History")).toContainText(
    "the areas highlighted have the target in their description"
  );
});
test("search fail", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search banana");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText(
    "no areas were found"
  );
});
// click test
test("click success", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Map Container")).toBeVisible();
  await page.getByLabel("Map Container").click();
  await expect(page.getByLabel("History")).toContainText("Broadband");
});

// broadband tests
test("broadband success", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("broadband 41.824 -71.4128");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText(
    "Broadband"
  );
  await expect(page.getByLabel("History")).toContainText("latitude");
});
test("broadband fail with more than just lat/lon", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("broadband 50 100");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("error");
});
test("broadband fail with lat/long outside of us", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("broadband 50 100 234");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("error");
});



