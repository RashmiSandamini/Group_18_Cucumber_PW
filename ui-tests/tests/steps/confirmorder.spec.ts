import { Then } from "@cucumber/cucumber";
import { getPage } from "../corelib/corelib.spec";
import { ConfirmOrderPage } from "../pages/confirmorderpage";

let confirmOrderPage: ConfirmOrderPage;

Then("I should be in the confirm order page", async function () {
  confirmOrderPage = new ConfirmOrderPage(getPage());
  await confirmOrderPage.verifyOnConfirmPage();
});

Then("I confirm the order", async function () {
  await confirmOrderPage.confirmOrder();
});
