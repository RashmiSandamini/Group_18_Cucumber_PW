import BasePage from "./basepage";
import * as locs from "../locators/blogpage.json";

export default class BlogPage extends BasePage {
  async navigate() {
    await this.page.waitForLoadState("networkidle");
    await this.page.locator(locs.blogNavLink.locator).click();
  }

  async openBlogPost() {
    // Wait for the blog posts to be visible
    await this.page.waitForLoadState("domcontentloaded");

    // Click on the first article container
    const firstArticle = await this.page.locator(locs.firstBlogPost.locator);
    await firstArticle.waitFor({ state: "visible" });
    await firstArticle.click();

    // Wait for navigation to complete
    await this.page.waitForLoadState("networkidle");
  }

  async commentOnPost(
    comment: string = "This is a valid test comment with enough characters to meet the requirement."
  ) {
    const commentTextarea = await this.page.locator(
      locs.commentTextarea.locator
    );
    await commentTextarea.scrollIntoViewIfNeeded();
    await commentTextarea.fill(comment);

    const postCommentButton = await this.page.locator(
      locs.postCommentButton.locator
    );
    await postCommentButton.scrollIntoViewIfNeeded();
    await postCommentButton.click();
  }

  async replyToComment(replyText: string = "This is a reply to your comment.") {
    const commentToReply = await this.page.locator(locs.replyButton.locator);
    await commentToReply.scrollIntoViewIfNeeded();
    await commentToReply.click();

    await this.page.waitForTimeout(1000);
    const replyTextarea = await this.page.locator(locs.commentTextarea.locator);
    await replyTextarea.fill(replyText);

    const postReplyButton = await this.page.locator(
      locs.postReplyButton.locator
    );
    await postReplyButton.click();

    await this.page.waitForTimeout(1000);
  }
}
