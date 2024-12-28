import {
  setDefaultTimeout,
  Before,
  After,
  BeforeAll,
  AfterAll,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import dotenv from "dotenv";

setDefaultTimeout(60 * 1000 * 2);

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

// Before all scenarios
BeforeAll(async function () {
  dotenv.config();
  if (!process.env.WEB_URL) {
    throw new Error("WEB_URL is not defined in the environment variables.");
  }
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false",
    channel: "chrome",
  });
  console.log("Browser initialized.");
});

// For each scenario
Before({ tags: "@ui" }, async function () {
  console.log("Setting up browser context and page...");
  bCtx = await browser.newContext({ javaScriptEnabled: true });
  page = await bCtx.newPage();
  console.log("Navigating to:", process.env.WEB_URL);
  await page.goto(process.env.WEB_URL!);
});

// After each scenario
After({ tags: "@ui" }, async function () {
  console.log("Closing page and context...");
  await page.close();
  await bCtx.close();
});

// After all scenarios
AfterAll(async function () {
  console.log("Closing browser...");
  await browser.close();
});

// Utility function to get the current page
function getPage(): Page {
  if (!page) {
    throw new Error(
      "Page is not initialized. Ensure @ui scenarios are properly tagged."
    );
  }
  return page;
}

export function setPage(page: Page): void {
  page = page;
}

export { getPage };
