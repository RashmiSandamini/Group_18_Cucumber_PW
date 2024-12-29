import { Given, When, Then, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import { getPage } from '../corelib/corelib.spec';
import ProductCategory from '../pages/productCategoryPage';
import LoginPage from '../pages/loginpage';
import WishlistPage from '../pages/wishlistpage';
import * as locs from '../locators/wishlistpage.json';

let wishlistPage: WishlistPage;


// Given('my wishlist is empty', async function () {
//     wishlistPage = new WishlistPage(getPage());
//     await wishlistPage.clearWishlist();
    
    // // Check if the wishlist is empty
    // const isEmpty = await wishlistPage.isWishlistEmpty();

    // // Clear wishlist only if it's not empty
    // if (isEmpty===false) {
    //     await wishlistPage.clearWishlist();
    // }
// });


Then('the product should appear in the wishlist page',async function () {
    wishlistPage = new WishlistPage(getPage());
    const product = await wishlistPage.isProductInWishlist();
    const productName = 'HTC Touch HD';
    expect(product).toEqual(productName);
});

Then('the wishlist count should increase by 1',async function () {
    wishlistPage = new WishlistPage(getPage());
    expect(await wishlistPage.getWishlistTableRowCount()).toEqual(1);

});
