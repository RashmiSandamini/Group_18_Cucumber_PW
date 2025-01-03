import { Then, When } from '@cucumber/cucumber';
import ShoppingCartPage from '../pages/shoppingCartPage';
import { getPage } from '../corelib/corelib.spec';
import { expect } from 'playwright/test';

let shoppingCartPage: ShoppingCartPage;

Then('I should be on the shopping cart page', async function () {
  shoppingCartPage = new ShoppingCartPage(getPage());
  await shoppingCartPage.verifyOnShoppingCartPage();
});

Then('Product should appear in cart page', async function () {
  const product = await shoppingCartPage.isProductInCart();
  const productName = 'MacBook';
  expect(product).toEqual(productName);
});

Then('I should be able to click the ContinueShopping button', async function () {
  await shoppingCartPage.clickContinuetoHome();
});

Then('Items in the cart are not out-of-stock', async function () {
  shoppingCartPage = new ShoppingCartPage(getPage());
  await shoppingCartPage.removeOutofStockItems();
});

Then('I click the checkout button', async function () {
  await shoppingCartPage.clickCheckoutButton();
});
