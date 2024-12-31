import { Given, When,Then, DataTable } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import RegisterPage from '../pages/registerpage';
import HomePage from '../pages/homepage';
import { expect } from 'playwright/test';
import AccountSuccessPage from '../pages/accountsuccesspage';
import locs from '../locators/accountsuccesspage.json';

let registerPage: RegisterPage;
let accountsuccesspage: AccountSuccessPage;
let homePage:HomePage;
let dynamicEmail: string;

Given('I am on the register page', async function () {
  registerPage = new RegisterPage(getPage());
  await registerPage.navigate();
  expect(registerPage.inPage()).toBeTruthy();
});

When('I fill in the registration form with valid details', async function (table: DataTable) {
  dynamicEmail = `user_${Date.now()}@testmail.com`;
  const tableData = table.hashes();
  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];
    if (row.email === 'dynamic_email') {
      row.email = dynamicEmail; // Assign dynamic email
    }
    await registerPage.enterData(row);
  }
});

When('I submit the registration form', async function () {
  await registerPage.register();
});


Then('I should be navigated to the account success page', async function () {
  accountsuccesspage = new AccountSuccessPage(getPage());
  await accountsuccesspage.waitForPageLoad();
  expect(accountsuccesspage.inPage()).toBeTruthy();
});


Then('The register should be successful', async function () {
  const successMessage = await getPage().locator(locs.successMessage.locator).innerText();
  expect(successMessage).toBe(" Your Account Has Been Created!");
});


Then('I should be able to click the "Continue" button', async function () {
  await accountsuccesspage.continueRegistration();
});
