import BasePage from './basepage';
import * as locs from '../locators/shoppingCartPage.json';
import { Page } from 'playwright';

export default class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async verifyOnShoppingCartPage(): Promise<void> {
    await this.inPage();
    console.log("Navigated to shopping cart page")
  }

  async isProductInCart(){
    const productName = 'MacBook'; // Replace with the desired product name
    const productLocator = locs.productInCart;
    const xpath = productLocator.locator.replace('{productName}', productName);
    const productInCart = await this.page.locator(xpath).textContent();
    console.log("Product is successfully added to the cart")
    await this.page.waitForTimeout(5000); // 5 seconds
    return productInCart;
  }

async clickContinuetoHome() {
  await this.click(locs.continueBtn);
}

}
