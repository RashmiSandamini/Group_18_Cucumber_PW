import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import { expect } from '@playwright/test';
import AccountPage from '../pages/accountpage';

let accountPage: AccountPage;


Then('I am on the account page', async function () {  
  accountPage = new AccountPage(getPage());
  expect(await accountPage.inPage()).toBeTruthy();
});

When('I navigate to the returns page', async function () {
  await accountPage.navigageToReturnPage();
});
