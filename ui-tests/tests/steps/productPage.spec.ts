import { Given, When } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import ProductPage from '../pages/productPage';

let productPage: ProductPage;

Given('I should be on the product page', async function () {
  productPage = new ProductPage(getPage());
  await productPage.verifyOnProductPage();
});

When('I add the first product to the cart', async function () {
  await productPage.addFirstProductToCart();
});

When('I click the "View Cart" button', async function (){
await productPage.clickViewCartButton();
});
