import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import CheckoutPage from '../pages/checkoutpage';

let checkoutPage: CheckoutPage;

Then('I should be on the checkout page', async function () {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.verifyOnCheckoutPage();
});

When('I click on {string} radio button', async function (string) {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.clickOnNewAddressRadioButton();
});

When('I enter the following details', async function (table: DataTable) {
  const tableData = table.hashes()[0];
  await checkoutPage.enterData(tableData);
});

Then('I click on continue button', async function () {
  await checkoutPage.continueCheckout();
});

When('I click the cart button and proceed to edit cart', async function () {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.gotoCheckout();
});

When('I click the cart button and proceed to checkout', async function () {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.gotoCheckout();
});
