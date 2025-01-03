// blogpage.ts
import BasePage from './basepage';
import * as locs from '../locators/blogpage.json';
import { Page } from 'playwright';

export default class BlogPage extends BasePage {
  getPage() {
    throw new Error('Method not implemented.');
  }
  private readonly BASE_URL: string;
  
  constructor(page: Page) {
    super(page, locs.path);
    this.BASE_URL = 'https://ecommerce-playground.lambdatest.io';
  }

  async navigate() {
    await this.page.goto(this.BASE_URL);
    await this.page.waitForLoadState('networkidle');
    await this.page.click('//ul[@class="navbar-nav horizontal"]//span[@class="title"][normalize-space()="Blog"]')
  }

  async openBlogPost() {
    await this.page.click('//div[@class="swiper-wrapper"]/div[1]/div[1]/div[1]/a[1]/img[1]');
  }

  async commentOnPost() {
        // Locate and fill the comment textarea
        const commentTextarea = await this.page.locator('//textarea[@id="input-comment"]');
        await commentTextarea.scrollIntoViewIfNeeded();
        await commentTextarea.fill('This is a valid test comment with enough characters to meet the requirement.');

        // Click the Post Comment button
        const postCommentButton = await this.page.locator('//button[@id="button-comment"]');
        await postCommentButton.scrollIntoViewIfNeeded();
        await postCommentButton.click();
    };

  async replyToComment() {
    // Find the comment container that contains the specific comment text
    // Step 1: Locate the comment and its reply button
    const commentToReply = await this.page.locator('//li[@id="comment1698"]//a[@class="reply"][normalize-space()="Reply"]');
    await commentToReply.scrollIntoViewIfNeeded();
    await commentToReply.click();

    // Step 2: Fill in the reply text
    await this.page.waitForTimeout(1000);
    const replyTextarea = await this.page.locator('//textarea[@id="input-comment"]');
    await replyTextarea.fill('This is a reply to your comment.');

    // Step 3: Post the reply
    const postReplyButton = await this.page.locator('//button[contains(text(), "Post comment")]');
    await postReplyButton.click();

    await this.page.waitForTimeout(1000); // Wait for submission
  }
}