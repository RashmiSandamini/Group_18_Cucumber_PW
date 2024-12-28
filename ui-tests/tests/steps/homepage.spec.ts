import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import HomePage from '../pages/homepage';
import { getPage } from '../corelib/corelib.spec';


let homePage: HomePage;

Then('I should be navigated to the home page', async function () {
  homePage = new HomePage(getPage());
  expect(await homePage.inPage()).toBeTruthy();
});

Then('I should be redirected to the home page', async function () {
  homePage = new HomePage(getPage());
  await homePage.verifyOnHomePage();
});






