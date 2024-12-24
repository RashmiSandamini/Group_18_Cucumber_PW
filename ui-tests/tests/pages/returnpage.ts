import BasePage from './basepage';
import * as locs from '../locators/returnpage.json';
import { Page } from 'playwright';

export default class ReturnPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }

  async enterData(data: { [key: string]: string }) {
    await this.enter(locs.orderIdInput, data.order_id);
    await this.enter(locs.orderDateInput, data.order_date);
    await this.enter(locs.productNameInput, data.product_name);
    await this.enter(locs.productCodeInput, data.product_code);
    await this.enter(locs.qtyInput, data.qty);
    await this.clickRadio(locs.reasonForReturnInput, data.reason);
    await this.clickRadio(locs.productIsOpenedInput, data.opened);
    await this.enter(locs.otherDetailsInput, data.other_details);
  }

  async submitForm() {
    await this.click(locs.submitReturnButton);
  }

}
