import { Given } from '@cucumber/cucumber';
import { getPage } from '../corelib/corelib.spec';
import LoginPage from '../pages/loginpage';

let loginPage: LoginPage;

Given('I am logged in as a valid user', async function () {
  loginPage = new LoginPage(getPage());
  await loginPage.navigate();
  await loginPage.login();
});
