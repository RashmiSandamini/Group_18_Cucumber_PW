import BasePage from './basepage';
import * as locs from '../locators/registerpage.json';
import { Page } from 'playwright';

export default class RegisterPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }

  async enterData(row: { [key: string]: string }) {
    await this.enter(locs.firstnameInput, row.first_name);
    await this.enter(locs.lastnameInput, row.last_name);
    await this.enter(locs.emailInput, row.email);
    await this.enter(locs.telephoneInput, row.phone);
    await this.enter(locs.passwordInput, row.password);
    await this.enter(locs.confirmPasswordInput, row.confirm_password);
    await this.click(locs.newsletterInput);
    await this.click(locs.privacyAgree);
  }

  async register() {
    await this.click(locs.continueButton);
  }

}