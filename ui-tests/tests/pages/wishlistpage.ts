import BasePage from './basepage';
import * as locs from '../locators/wishlistpage.json';
import { Page } from 'playwright';
import AccountPage from './accountpage';
import * as wishlistlocs from '../locators/wishlistpage.json';

export default class WishlistPage extends BasePage {
  constructor(page: Page) {
    super(page, locs.path);
  }

  // async isWishlistEmpty(){
  //   await this.page.getByLabel('Wishlist').waitFor();
  //   await this.page.getByLabel('Wishlist').click();
  //   let a = await this.page.locator(locs.rowsSelector.xpath).isVisible();
  //   if (!a){
      
  //     console.log('Wishlist is already empty.');
  //     await this.page.locator("xpath=//a[@class='btn btn-primary']").click();
  //     return true; //results as empty
  //     //return; // Exit the function early
  // }else{
  //   return false;
  // }
    
  // }

//   async clearWishlist() {
//     await this.page.getByLabel('Wishlist').click();
    
//     let rowCount = await this.getWishlistTableRowCount();

//     // Loop through each row and click the remove button
//     for (let i=0;i<rowCount;i++) {
//       //await this.page.waitForSelector(wishlistlocs.removeFromWishlistBtn.xpath);

//         rowCount=await this.getWishlistTableRowCount();
//         await this.page.locator("xpath=//i[@class='fa fa-times']").first().click(); // Click the remove button of the first row
//         await this.page.waitForLoadState('domcontentloaded'); // Wait for the page to reload or update

//     }

//     console.log('Wishlist cleared successfully.');
//     await this.page.locator("xpath=//a[@class='btn btn-primary']").click();
// }

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
