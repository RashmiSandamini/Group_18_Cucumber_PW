import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { getPage } from "../corelib/corelib.spec";
import CheckoutPage from "../pages/checkoutpage";

let checkoutPage: CheckoutPage;

Given("I have items in the cart", async function () {
  console.log("I have items in the cart");
});

Then("I should be in the checkout page", async function () {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.verifyOnCheckoutPage();
});

When("I click on {string} radio button", async function (string) {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.clickOnNewAddressRadioButton();
});

When("I enter the following details", async function (table: DataTable) {
  checkoutPage = new CheckoutPage(getPage());
  const tableData = table.hashes()[0];
  await checkoutPage.enterData(tableData);
});

Then("I click on continue button", async function () {
  checkoutPage = new CheckoutPage(getPage());
  await checkoutPage.continueCheckout();
});
