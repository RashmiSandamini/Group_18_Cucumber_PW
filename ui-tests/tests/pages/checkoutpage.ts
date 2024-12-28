import BasePage from "./basepage";
import { Page } from "playwright";
import * as locs from "../locators/checkoutpage.json";

export default class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async verifyOnCheckoutPage(): Promise<void> {
    await this.inPage();
  }

  async clickOnNewAddressRadioButton() {
    await this.click(locs.newAddressRadioButton);
  }

  async enterData(data: { [key: string]: string }) {
    await this.getLocator(locs.newAddressArea).waitFor({ state: "visible" });

    await this.enter(locs.firstName, data.firstname);
    await this.enter(locs.lastName, data.lastname);
    await this.enter(locs.company, data.company);
    await this.enter(locs.address1, data.address_1);
    await this.enter(locs.city, data.city);
    await this.enter(locs.postcode, data.postcode);

    await this.page.waitForTimeout(5000);
  }

  async continueCheckout() {
    await this.click(locs.termsCheckbox);
    await this.click(locs.continueCheckoutButton);
  }
}
