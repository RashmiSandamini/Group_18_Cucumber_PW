import {
  Given,
  When,
  Then,
  Before,
  After,
  DataTable,
} from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Before(async function () {
  await this.initRequestContext();
});

Given(
  "I have created a book with title {string} and author {string}",
  async function (title: string, author: string) {
    this.response = await this.context.get("/api/books", {
      headers: { Authorization: this.auth },
    });

    const responseBody = await this.response.json();

    const existingBook = responseBody.find(
      (book: { title: string }) => book.title === title
    );

    if (existingBook) {
      this.createdBookId = existingBook.id;
    } else {
      const requestBody = {
        title,
        author,
      };

      this.response = await this.context.post("/api/books", {
        data: requestBody,
        headers: { Authorization: this.auth },
      });

      expect(this.response.status()).toBe(201);
      this.createdBookId = (await this.response.json()).id;
    }
  }
);

When("I send a GET request to {string}", async function (path: string) {
  this.response = await this.context.get(path, {
    headers: { Authorization: this.auth },
  });
});

Then("The response body should contain", async function (expectedBody: string) {
  const body = await this.response.json();
  const expectedJson = JSON.parse(expectedBody);
  expect(body).toEqual(expectedJson);
});

After(async function () {
  await this.context?.dispose();
});
