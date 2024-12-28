import BasePage from './basepage';
import * as locs from '../locators/shoppingCartPage.json';
import { Page } from 'playwright';

export default class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path || '/cart'); // Use '/cart' as default
  }

  async verifyOnShoppingCartPage(): Promise<void> {
    await this.inPage();
  }

  async clickContinueShoppingButton(): Promise<void> {
    await this.page.locator("xpath=//a[contains(text(),'Continue Shopping')]").click
    //await this.click("xpath=//a[contains(text(),'Continue Shopping')]", true);
  }
}
