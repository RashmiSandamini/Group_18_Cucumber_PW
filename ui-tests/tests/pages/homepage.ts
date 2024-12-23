// import BasePage from './basepage';
// import * as locs from '../locators/loginpage.json';
// import { Page } from 'playwright';

// export default class LoginPage extends BasePage {
//   constructor(page: Page) {
//     super(page);
//   }

//   async navigate() {
//     await this.click(locs.loginLink);
//   }

//   async login() {
//     await this.enter(locs.emailInput, process.env.username!);
//     await this.enter(locs.passwordInput, process.env.password!);
//     await this.click(locs.loginButton);
//   }

//   async waitForPageLoad() {
//     await this.page.locator(locs.myAccount.locator).waitFor({ timeout: 5000 });
//   }
// }
