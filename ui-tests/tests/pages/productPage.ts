import BasePage from './basepage';
import * as locs from '../locators/productPage.json';
import { Page } from 'playwright';

export default class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async verifyOnProductPage(): Promise<void> {
    await this.inPage();
  }

  async addFirstProductToCart(): Promise<void> {
    // await this.click(locs.addToCartButton);
    await this.page.locator("xpath=//button/i[contains(@class,'btn btn-cart cart-43')]").click
    
  }

  async clickViewCartButton(): Promise<void> {
    await this.page.locator("xpath=//a[@href='https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart']").click
  }
}
