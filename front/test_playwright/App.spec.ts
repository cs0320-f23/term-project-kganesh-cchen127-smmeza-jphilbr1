import { test, expect } from "@playwright/test";

// /**
//   The general shapes of tests in Playwright Test are:
//     1. Navigate to a URL
//     2. Interact with the page
//     3. Assert something about the page against your expectations
//   Look for this pattern in the tests below!
//  */

test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:5173/");
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  sleep(10000)
  await expect(page.getByTestId("textbox")).toBeVisible();
});

test("on page load, i see a submit button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:5173/");
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  sleep(10000)
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

test("on page load, i see an input bar 2", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:5173/");
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  sleep(10000)
  await expect(page.getByRole('group', { name: 'Enter a command:' })).toBeVisible();
});

test("on page load, i see a map", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:5173/");
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  sleep(10000)
  await expect(page.getByLabel('Map', { exact: true })).toBeVisible();
});

test("on page load, i see a header", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:5173/");
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  sleep(10000)
  await expect(page.getByRole('heading', { name: 'Real Estate Data Viewer' })).toBeVisible();
});

test("on page load, i see a map copywright", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:5173/");
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  sleep(30000)
  await expect(page.locator('div').filter({ hasText: '© Mapbox © OpenStreetMap Improve this mapNearby Features:State/States: City/Citi' }).nth(3)).toBeVisible();
});

// test("on page load, i can click a map to have a popup", async ({ page }) => {
//   // Notice: http, not https! Our front-end is not set up for HTTPs.
//   await page.goto("http://localhost:5173/");
//   const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//   sleep(30000)
//   await page.getByLabel('Map', { exact: true }).click({
//     position: {
//       x: 248,
//       y: 156
//     }
//   });
//   await expect(page.getByText('State/States: RI')).toBeVisible();
//   await expect(page.getByRole('heading', { name: 'Nearby Features:' })).toBeVisible();
//   await expect(page.getByText('City/Cities: Providence')).toBeVisible();
//   await expect(page.getByText('Name/Names:')).toBeVisible();

// });

// // If you needed to do something before every test case...
// // test.beforeEach(() => {
// //   // ... you'd put it here.
// //   // TODO: Is there something we need to do before every test case to avoid repeating code?
// // });

// /**
//  * Don't worry about the "async" yet. We'll cover it in more detail
//  * for the next sprint. For now, just think about "await" as something
//  * you put before parts of your test that might take time to run,
//  * like any interaction with the page.
//  */
// test("on page load, i see an input bar", async ({ page }) => {
//   // Notice: http, not https! Our front-end is not set up for HTTPs.
//   await page.goto("http://localhost:8000/");
//   await expect(page.getByLabel("Command input")).toBeVisible();
// });

// test("after I type into the input box, its text changes", async ({ page }) => {
//   // Step 1: Navigate to a URL
//   await page.goto("http://localhost:8000/");

//   // Step 2: Interact with the page
//   // Locate the element you are looking for
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("Awesome command");

//   // Step 3: Assert something about the page
//   // Assertions are done by using the expect() function
//   const mock_input = `Awesome command`;
//   await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
// });

// test("on page load, i see a button", async ({ page }) => {
//   await page.goto("http://localhost:8000/");
//   await expect(page.getByRole("button")).toBeVisible();
// });