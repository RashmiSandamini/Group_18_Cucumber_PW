import { Page } from "playwright/test";
import BasePage from "./basepage";
import * as locs from "../locators/ordersuccesspage.json";

export class OrderSuccessPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async verifyOrderSuccessPage() {
    await this.inPage();
    await this.page.waitForTimeout(5000);
  }

  async clickContinue() {
    await this.getLocator(locs.continueButton).waitFor({
      state: "visible",
    });
    await this.click(locs.continueButton);
  }
}
