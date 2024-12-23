import { Given } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import LoginPage from '../pages/loginpage';
import AccountPage from '../pages/accountpage';

let loginPage: LoginPage;
let accountPage: AccountPage;

Given('I am logged in as a valid user', async function () {
  loginPage = new LoginPage(getPage());
  accountPage = new AccountPage(getPage());
  await loginPage.navigate();
  await loginPage.login();
});
