import BasePage from './basepage';
import * as locs from '../locators/homepage.json';
import { Page } from 'playwright';

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }
}
