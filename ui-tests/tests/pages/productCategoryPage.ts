import BasePage from './basepage';
import * as locs from '../locators/productcategorypage.json';
import { Page } from 'playwright';

export default class ProductCategoryPage extends BasePage {

  constructor(page: Page) {
    super(page, locs.path);
  }
  async gotoScannersPage(){
      await this.click(locs.shopByCategoryButton,true);
      await this.click(locs.printersAndScannersLink,true);  
  }

  async addToWishlist(){
      await this.getLocator(locs.productCategoryImage).waitFor({ state: 'visible' });
      await this.hover(locs.productCategoryImage);
      await this.getLocator(locs.addToWishlistBtn).waitFor({ state: 'visible' });
      await this.click(locs.addToWishlistBtn);
      await this.click(locs.viewWishlistBtn);   
  }

  async viewSuccessMessage(){
    const successMessage = await this.page.isVisible(locs.successMessage.text);
  }}