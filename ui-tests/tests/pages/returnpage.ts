import BasePage from './basepage';
import * as locs from '../locators/returnpage.json';
import { Page } from 'playwright';

export default class ReturnPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }

  async enterData(row: { [key: string]: string }) {
    await this.enter(locs.orderIdInput, row.order_id);
    await this.page.waitForTimeout(2000);
    // await this.enter(locs.emailInput, row['Email']);
    // await this.enter(locs.phoneNumberInput, row['Phone Number']);
    // await this.enter(locs.reasonInput, row['Reason']);
    // await this.click(locs.submitButton);

  }
}
