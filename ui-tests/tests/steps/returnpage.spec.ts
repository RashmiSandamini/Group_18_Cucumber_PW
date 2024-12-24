import { When, Then, DataTable } from '@cucumber/cucumber';
import ReturnPage from '../pages/returnpage';
import { getPage } from '../corelib/corelib.spec';
import ReturnContinuePage from '../pages/returncontinuepage';
import { expect } from '@playwright/test';

let returnPage: ReturnPage;
let continuePage: ReturnContinuePage;


When('I initiate a return with the following details', async function (table: DataTable) {  
  returnPage = new ReturnPage(getPage());
  continuePage = new ReturnContinuePage(getPage());
  const tableData = table.hashes()[0];
  await returnPage.enterData(tableData);
});

When('I submit the return', async function () {
  await returnPage.submitForm();
});

Then('The return should be successful and I should be navigated to the continue page', async function () {
  expect(await continuePage.inPage()).toBeTruthy();
})

Then('I should be able to click the Continue button', async function () {
  await continuePage.clickContinue();
});
