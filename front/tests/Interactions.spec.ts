import { test, expect } from "@playwright/test";

const url = "http://localhost:8000";
test.beforeEach(() => {});

// test that click and then search and then search works
test("click and then search and then search", async ({ page }) => {
  await page.goto(url);
  
  // clicks the map
  await expect(page.getByLabel("Map Container")).toBeVisible();
  await page.getByLabel("Map Container").click();
  await expect(page.getByLabel("History")).toContainText("Broadband");

  // searches with input
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search rental units");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("Highlight");

  await expect(page.getByLabel("History")).toContainText("Broadband");  
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
      .getByPlaceholder("Enter command here!")
      .fill("search mediocre");
    await page.getByLabel("Submit Button").click();
    await expect(page.getByLabel("History")).toContainText("mediocre");
   await expect(page.getByLabel("History")).toContainText("Broadband");


  const table = await page.locator(`table`);
  const rowCount = await table.locator("tr").count();
  await expect(rowCount).toEqual(8);
});

// test that broadband and then search and then broadband works
test("broadband and then search and then broadband", async ({ page }) => {
  await page.goto(url);

  // searches broadband
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("broadband 41.80819176760133 -71.41720522640999");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("Broadband");

  // searches with input
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search rental units");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("Highlight");

  // searches broadband
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("broadband 41.84361165486351 -71.39472603560672");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("41.84361165486351");

  const table = await page.locator(`table`);
  const rowCount = await table.locator("tr").count();
  await expect(rowCount).toEqual(14);
});
// test that s and then c and then s work
test("search and then broadband and then search", async ({ page }) => {
  await page.goto(url);

  // searches with input
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search rental units");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("Highlight");

  // searches broadband
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("broadband 41.80819176760133 -71.41720522640999");
  await page.getByLabel("Submit Button").click();
  await expect(page.getByLabel("History")).toContainText("Broadband");

  // searches with input
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search mediocre");
  await page.getByLabel("Submit Button").click();
  await page.getByLabel("Submit Button").click();
  

  const table = await page.locator(`table`);
  const rowCount = await table.locator("tr").count();
  await expect(rowCount).toEqual(10);
});
