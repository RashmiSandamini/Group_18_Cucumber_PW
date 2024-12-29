import BasePage from './basepage';
import * as locs from '../locators/accountpage.json';
import { Page } from 'playwright';

export default class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async navigageToReturnPage() {
    await this.getLocator(locs.myAccount).waitFor({ state: 'visible' });
    await this.hover(locs.myAccount);
    await this.getLocator(locs.returnPageButton).waitFor({ state: 'visible' });
    await this.click(locs.returnPageButton);
  }

  

}
