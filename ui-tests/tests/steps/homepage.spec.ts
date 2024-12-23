// import { Given, When, Then } from '@cucumber/cucumber';
// import { getPage } from '../../corelib/corelib.spec';
// import { expect } from '@playwright/test';
// import LoginPage from '../pages/homepage';
// import * as locs from '../locators/loginpage.json';

// let loginPage: LoginPage;

// Given('User is on login page', async function () {
//   loginPage = new LoginPage(getPage());
//   await loginPage.navigate();
// });

// When('User enter login details', async function () {
//   await loginPage.login();
// });

// Then('User should be able to logout', async function () {
//   await loginPage.waitForPageLoad();
//   expect(getPage().locator(locs.myAccount.locator)).toBeVisible();
// });
