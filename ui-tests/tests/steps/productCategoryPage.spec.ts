import { Given, When, Then, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import { getPage } from '../corelib/corelib.spec';;
import ProductCategory from '../pages/productCategoryPage';
import LoginPage from '../pages/loginpage';
import WishlistPage from '../pages/wishlistpage';

let loginPage:LoginPage;
let productCategoryPage: ProductCategory;
let wishlistPage: WishlistPage;

When('I navigate to a Headphones category',async function () {
    productCategoryPage = new ProductCategory(getPage());
    await productCategoryPage.navigate();
});

When('I select a product and click "Add to Wishlist" icon', async function () {
    await productCategoryPage.addToWishlist();
});

Then('success message should be displayed',async function () {
    expect(productCategoryPage.viewSuccessMessage).toBeTruthy();
});
