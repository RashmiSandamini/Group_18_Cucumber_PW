import { setDefaultTimeout, Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import dotenv from "dotenv";

setDefaultTimeout(60 * 1000 * 2);

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

// Before all scenarios
BeforeAll(async function() {
  dotenv.config();
  browser = await chromium.launch({ headless: process.env.headless == "true", channel: 'chrome' });
});

// For each scenario
Before({ tags: "@ui" }, async function () {
  bCtx = await browser.newContext({ javaScriptEnabled: true });
  page = await bCtx.newPage();
  await page.goto(process.env.web_url!);
});

// After each scenario
After({ tags: "@ui" }, async function () {
  await page.close();
  await bCtx.close();
});

// After all scenarios
AfterAll(async function() {
  await browser.close();
})

function getPage():Page {
  return page;
}

export { getPage }