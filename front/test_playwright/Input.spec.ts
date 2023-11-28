// import { test, expect } from "@playwright/test";

// /**
//   The general shapes of tests in Playwright Test are:
//     1. Navigate to a URL
//     2. Interact with the page
//     3. Assert something about the page against your expectations
//   Look for this pattern in the tests below!
//  */

// // If you needed to do something before every test case...
// // test.beforeEach(() => {
// //   // ... you'd put it here.
// //   // TODO: Is there something we need to do before every test case to avoid repeating code?
// // });

// test("after I click the button, its label increments", async ({ page }) => {
//     await page.goto("http://localhost:8000/");
//     await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
//   });
  
//   test("after I submit a nonsense command via the input box, it gives me an error message", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("Awesome command");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByText("Command not recognized")).toBeVisible();
//   });
  
//   test("after I submit a view command with no file loaded, I get an error", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("view");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByText("There is no file loaded")).toBeVisible();
//   });

//   test("after I submit a load_file command via the input box for a valid file with headers, and I submit a view command, I can see the data and headers", async ({
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
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("Grant")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//     await expect(page.getByText("21")).toBeVisible();
//     await expect(page.getByText("age")).toBeVisible();
//     await expect(page.getByText("name")).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for a valid file with headers, it gives me an success message about the file and headers", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("successfully loaded file with headers")
//     ).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for a valid file without headers, it gives me an success message about the file and no headers", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/noheaders.csv false");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("successfully loaded file without headers")
//     ).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for a valid file with unspecified headers, it gives me an success message about the file and no headers", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("load_file back/data/census/dol_ri_earnings_disparity.csv");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("successfully loaded file without headers")
//     ).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for an invalid file without headers, it gives me an error message", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("load_file jasfhajksf false");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("failed to load file: no such filename")
//     ).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for an invalid file with headers, it gives me an error message", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("load_file jasfhajksf true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("failed to load file: no such filename")
//     ).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for an invalid file with unspecified headers, it gives me an error message", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("load_file jasfhajksf");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("failed to load file: no such filename")
//     ).toBeVisible();
//   });
  
//   test("after I submit a mode command via the input box, it gives me a success message", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("mode");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("Application has been set to verbose mode")
//     ).toBeVisible();
//   });
  
//   test("after I submit a mode command twice via the input box, it gives me a second success message", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("mode");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("mode");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("Application has been set to brief mode")
//     ).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for a valid file without headers arg false, and I submit a view command, I can see the data wihitout headers", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv false");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("view");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("Grant")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//     await expect(page.getByText("21")).toBeVisible();
//     // await expect(page.getByText("age")).toBeVisible();
//     // await expect(page.getByText("name")).toBeVisible();
//   });
  
//   test("after I submit a load_file command via the input box for a valid file without headers arg, and I submit a view command, I can see the data without headers", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("load_file back/data/custom/header.csv");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("view");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("Grant")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//     await expect(page.getByText("21")).toBeVisible();
//     // await expect(page.getByText("age")).toBeVisible();
//     // await expect(page.getByText("name")).toBeVisible();
//   });
  
  
  
//   test("after I submit a load_file command, and search with valid parameters, I get a correct search result", async ({
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
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(page.getByText("Ilan")).toBeVisible();
//     await expect(page.getByText("19")).toBeVisible();
//   });
  
//   test("after I submit a load_file command, and view that file, I can then submit a new load_file command, and view that file", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:3232/");
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/custom/header.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("successfully loaded file with headers")
//     ).toBeVisible();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("view");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/census/dol_ri_earnings_disparity.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByRole('cell', { name: 'successfully loaded file with headers' }).nth(1)).toBeVisible();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("view");
//     await page.getByRole("button", { name: "Submit" }).click();
//   });
  
//   test("after I submit a load_file command, and search for something that isn't in the file, I get a failure message", async ({
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
//     await page.getByLabel("Command input").fill("search 40 1");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("No result found for given search parameters")
//     ).toBeVisible();
//   });
  
  
//   test("after I submit a load_file command, and search for something that returns multiple rows, it returns multiple rows", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file back/data/census/dol_ri_earnings_disparity.csv true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search RI");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("White")
//     ).toBeVisible();
//     await expect(
//       page.getByText("Black")
//     ).toBeVisible();
//   });
  
  
//   test("after I submit a load_file command, and search for a row with a hole, it should not return data in the hole", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file test_with_headers_with_hole true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search 0 Blake");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("Blake")
//     ).toBeVisible();
//     await expect(
//       page.getByText("20")
//     ).not.toBeVisible();
//   });
  
//   test("after I submit a load_file command, and search for something that isn't in the file, I get a failure message part 2", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("load_file test_with_headers true");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await page.getByLabel("Command input").click();
//     await page.getByLabel("Command input").fill("search 0 21");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("No result found for given search parameters")
//     ).toBeVisible();
//   });


//   test("after I submit a broadband command for a valid request, I get the value", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Command input").click();
//     await page
//       .getByLabel("Command input")
//       .fill("broadband Louisiana Jefferson%20Parish,%20Louisiana");
//     await page.getByRole("button", { name: "Submit" }).click();
//     await expect(
//       page.getByText("81.6%")
//     ).toBeVisible();
//   });
  
