import BasePage from './basepage';
import * as locs from '../locators/outofstockproductPage.json';
import { Page } from 'playwright';

export default class OutOfStockProductPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }

  async getStockStatus() {
    const stockStatus = await this.page.locator('//*[@id="entry_216826"]/ul/li[3]/span[2]');
    const statusText = await stockStatus.innerText();
    return statusText?.trim();
  }

}