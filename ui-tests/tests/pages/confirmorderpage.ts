import { Page } from 'playwright/test';
import BasePage from './basepage';
import * as locs from '../locators/confirmorderpage.json';

export class ConfirmOrderPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async confirmOrder() {
    await this.getLocator(locs.confirmOrderButton).waitFor({
      state: 'visible',
    });
    await this.click(locs.confirmOrderButton);
  }
}
