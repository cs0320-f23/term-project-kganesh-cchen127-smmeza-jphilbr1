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