import BasePage from './basepage';
import * as locs from '../locators/wishlistpage.json';
import { Page } from 'playwright';
import AccountPage from './accountpage';
import * as wishlistlocs from '../locators/wishlistpage.json';

export default class WishlistPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  async isWishlistEmpty(){
    await this.page.getByLabel('Wishlist').waitFor();
    await this.page.getByLabel('Wishlist').click();
    await this.page.waitForLoadState('domcontentloaded');

    let wishlistTableRows = await this.page.locator(locs.rowsSelector.xpath).isVisible();
    
    if (!wishlistTableRows){

      console.log('Wishlist is already empty.');
      await this.page.locator("xpath=//a[@class='btn btn-primary']").click();
      return true; 

    } else {

      return false;

    } 
  }

  async clearWishlist() {
    await this.page.getByLabel('Wishlist').click();
    
    let rowCount = await this.getWishlistTableRowCount();
    console.log('Wishlist row count:', rowCount);

    for (let i=0;i<rowCount;i++) {

        rowCount=await this.getWishlistTableRowCount();
        await this.page.locator(locs.removeFromWishlistBtn.locator).first().click(); 
        await this.page.waitForLoadState('domcontentloaded'); 

    }

    console.log('Wishlist cleared successfully.');
    await this.page.locator("xpath=//a[@class='btn btn-primary']").click();
}

  async isProductInWishlist(){
    const productName = 'HTC Touch HD'; // Replace with the desired product name
    const productLocator = locs.productInWishlist;
    const xpath = productLocator.xpath.replace('{productName}', productName);
    const productInWishlist = await this.page.locator(xpath).textContent();
    return productInWishlist;
  }

  async getWishlistTableRowCount(){
    await this.page.waitForSelector(locs.rowsSelector.xpath);
    const rows = await this.page.locator(locs.rowsSelector.xpath).count();
    return rows;
  }
}