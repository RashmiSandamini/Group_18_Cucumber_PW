import BasePage from './basepage';
import * as locs from '../locators/returncontinuepage.json';
import { Page } from 'playwright';

export default class ReturnContinuePage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async clickContinue() {
    await this.click(locs.continueBtn, true);
  }
}
