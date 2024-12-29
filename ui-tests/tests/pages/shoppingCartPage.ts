import BasePage from './basepage';
import * as locs from '../locators/shoppingCartPage.json';
import { Page } from 'playwright';

export default class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async verifyOnShoppingCartPage(): Promise<void> {
    await this.inPage();
  }

  async clickContinueShoppingButton() {
    await this.click(locs.continueShoppingButton, true);
  }
}
