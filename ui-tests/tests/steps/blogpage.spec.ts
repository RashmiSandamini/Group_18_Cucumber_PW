import { Given, When, Then } from "@cucumber/cucumber";
import BlogPage from "../pages/blogpage";
import { getPage } from "../corelib/corelib.spec";

let blogPage: BlogPage;

Given('I navigate to the "Blog" section', async function () {
  blogPage = new BlogPage(getPage(), "/blog");
  await blogPage.navigate();
});

When("I click on an article", async function () {
  await blogPage.openBlogPost();
});

Then(
  "I comment on the comments section and click on submit button",
  async function () {
    await blogPage.commentOnPost();
  }
);

Then("I click the reply button for comment", async function () {
  await blogPage.replyToComment();
});
