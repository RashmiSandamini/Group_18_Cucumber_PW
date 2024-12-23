import BasePage from './basepage';
import * as locs from '../locators/loginpage.json';
import { Page } from 'playwright';

export default class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }

  async login() {
    await this.enter(locs.emailInput, process.env.web_user_email!);
    await this.enter(locs.passwordInput, process.env.web_user_password!);
    await this.click(locs.loginButton);
  }
}
