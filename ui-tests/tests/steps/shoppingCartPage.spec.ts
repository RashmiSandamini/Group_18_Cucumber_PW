import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import ShoppingCartPage from '../pages/shoppingCartPage';
import { getPage } from '../corelib/corelib.spec';

let shoppingCartPage: ShoppingCartPage;

Then('I should be on the shopping cart page', async function () {
  shoppingCartPage = new ShoppingCartPage(getPage());
  await shoppingCartPage.verifyOnShoppingCartPage();
});

Then('I click the "Continue Shopping" button', async function () {
  await shoppingCartPage.clickContinueShoppingButton();
});


