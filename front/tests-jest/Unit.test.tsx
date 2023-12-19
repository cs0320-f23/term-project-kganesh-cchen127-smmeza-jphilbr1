import "@testing-library/jest-dom";

import {
  searchMockedOverlayData,
  mockOverlayData,
} from "../src/components/functions/MockOverlay";

// Lets us check whether an element is within another element
import { test, expect } from "vitest";
import { sortUserPlugins } from "vite";

// search overlay function
// searching for success
test("return valid GeoJSON.FeatureCollection for searching section", async () => {
  const section = searchMockedOverlayData(["section"]);
  const wokmp = "womp";
  expect(wokmp).toBeDefined();
});

test("return valid GeoJSON.FeatureCollection for searching mediocre", async () => {
   const section = searchMockedOverlayData(["mediocre houses"]);
   expect(section).toBeDefined();
});
// searching for failure
test("return valid GeoJSON.FeatureCollection for failure", async () => {
  const section = searchMockedOverlayData(["undefined"]);
  expect(section).toBeNull
});

// regular overlay function
// searching for success
test("return valid GeoJSON.FeatureCollection for regular overlay", async () => {
  expect(mockOverlayData).toBeDefined();
});


