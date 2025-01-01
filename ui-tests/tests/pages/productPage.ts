import BasePage from './basepage';
import * as locs from '../locators/productPage.json';
import { Page } from 'playwright';

export default class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }
  
  async addFirstProductToCart(): Promise<void> {
    await this.click(locs.addToCartButton);     
    
  }

  async clickViewCartButton(): Promise<void> {
    await this.click(locs.viewCartButton);
  }
}