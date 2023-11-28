// import { test, expect } from "@playwright/test";

// test("after I submit a load_file command via the input box for a valid file with headers, and I ENTER a view command, I can see the data and headers", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("view");
//     await page.keyboard.press('Enter');
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("Grant")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//     await expect(page.getByText("21")).toBeVisible();
//     await expect(page.getByText("age")).toBeVisible();
//     await expect(page.getByText("name")).toBeVisible();
//   });

//   test("after I ENTER a load_file command, and ENTER search with valid parameters, I get a correct search result", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search Ilan 0");
//     await page.keyboard.press('Enter');
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//   });

//   test("after I ENTER a load_file command, and ENTER search with valid parameters, I can tab into the results and see the results", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search Ilan 0");
//     await page.keyboard.press('Enter');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//   });

//   test("after I ENTER a load_file command, and ENTER search with valid parameters, I can tab into the results and see the results 2", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search Ilan 0");
//     await page.keyboard.press('Enter');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowUp');
//     await page.keyboard.press('ArrowUp');
//     await page.keyboard.press('ArrowUp');
//     await page.keyboard.press('ArrowUp');
//     await page.keyboard.press('ArrowUp');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//   });

//   test("after I ENTER a load_file command, and ENTER search with valid parameters, I can tab back and do another search 3", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search Ilan 0");
//     await page.keyboard.press('Enter');
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.type('search Karim 0');
//     await page.keyboard.press('Enter');
//     await expect(page.getByText("Karim")).toBeVisible();
//   });
