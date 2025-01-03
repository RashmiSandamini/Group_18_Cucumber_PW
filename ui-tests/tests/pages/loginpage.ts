import BasePage from './basepage';
import * as locs from '../locators/loginpage.json';
import { Page } from 'playwright';

export default class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }

  async login() {
    await this.enter(locs.emailInput, process.env.WEB_USER_EMAIL!);
    await this.enter(locs.passwordInput, process.env.WEB_USER_PASSWORD!);
    await this.click(locs.loginButton);
  }
}
