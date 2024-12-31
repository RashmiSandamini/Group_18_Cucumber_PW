import BasePage from './basepage';
import * as locs from '../locators/accountsuccesspage.json';
import { Page } from 'playwright';

export default class AccountSuccessPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }
  
  async continueRegistration() {
    await this.click(locs.continueButton);
  }

  async waitForPageLoad() {
    await this.page.locator(locs.successMessage.locator).waitFor({ timeout: 5000 });
  }

}