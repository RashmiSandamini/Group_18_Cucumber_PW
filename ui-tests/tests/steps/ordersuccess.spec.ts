import { Then } from "@cucumber/cucumber";
import { getPage } from "../corelib/corelib.spec";
import { OrderSuccessPage } from "../pages/ordersuccesspage";

let orderSuccessPage: OrderSuccessPage;

Then("I should be in the order success page", async function () {
  orderSuccessPage = new OrderSuccessPage(getPage());
  await orderSuccessPage.verifyOrderSuccessPage();
});

Then("I click on continue button in success page", async function () {
  orderSuccessPage = new OrderSuccessPage(getPage());
  await orderSuccessPage.clickContinue();
});
