import { Then } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import { OrderSuccessPage } from '../pages/ordersuccesspage';
import { expect } from '@playwright/test';

let orderSuccessPage: OrderSuccessPage;

Then('I should be on the order success page', async function () {
  orderSuccessPage = new OrderSuccessPage(getPage());
  // await orderSuccessPage.verifyOrderSuccessPage();
  expect(await orderSuccessPage.inPage()).toBeTruthy();
});

Then('I click on continue button in success page', async function () {
  orderSuccessPage = new OrderSuccessPage(getPage());
  await orderSuccessPage.clickContinue();
});
