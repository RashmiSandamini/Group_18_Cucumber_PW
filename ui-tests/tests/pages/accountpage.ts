import BasePage from "./basepage";
import * as locs from "../locators/accountpage.json";
import { Page } from "playwright";
import { expect } from "@playwright/test";

export default class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async navigageToReturnPage() {
    await this.getLocator(locs.myAccount).waitFor({ state: "visible" });
    await this.hover(locs.myAccount);
    await this.getLocator(locs.returnPageButton).waitFor({ state: "visible" });
    await this.click(locs.returnPageButton);
  }

  async clickCartButton() {
    await this.click(locs.cartButton);
  }

  async proceedToCheckout() {
    await this.getLocator(locs.cartSideDrawer).waitFor({ state: "visible" });
    await this.hover(locs.checkoutButton);
    await this.click(locs.checkoutButton);
  }
}
