import { Given, When, Then, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import { getPage } from '../corelib/corelib.spec';;
import ProductCategory from '../pages/productCategoryPage';
import LoginPage from '../pages/loginpage';
import WishlistPage from '../pages/wishlistpage';
import OutOfStockProductPage from '../pages/outofstockproductpage';

let loginPage:LoginPage;
let productCategoryPage: ProductCategory;
let wishlistPage: WishlistPage;
let outofstockproductPage: OutOfStockProductPage;

When('I navigate to a Printers and Scanners category',async function () {
    productCategoryPage = new ProductCategory(getPage());
    await productCategoryPage.navigate();
});

When('I select a product and click "Add to Wishlist" icon', async function () {
    await productCategoryPage.addToWishlist();
});

Then('success message should be displayed',async function () {
    expect(productCategoryPage.viewSuccessMessage).toBeTruthy();
});

// Out of stock bug test
Given('There is an out-of-stock product', async () => {
    outofstockproductPage = new OutOfStockProductPage(getPage());
    await outofstockproductPage.navigate();
    const statusText = await outofstockproductPage.getStockStatus();
    expect(statusText).toContain('Out Of Stock');
});

  
When('The user tries to add the product to the cart', async () => {
    productCategoryPage = new ProductCategory(getPage());
    await productCategoryPage.navigate();
    await productCategoryPage.addTocart();
});

Then('The product should not be added to the cart', async () => {
    const itemCount = await productCategoryPage.getCartItemCount();
    expect(itemCount).toBe("0");
});
