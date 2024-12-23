import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Before(async function () {
  await this.initRequestContext();
});

// Given(
//   "I am authorized with {string} as an admin",
//   async function (creds: string) {
//     this.setAuth(creds);
//   }
// );

// Given(
//   "I am authorized with {string} as a user",
//   async function (creds: string) {
//     this.setAuth(creds);
//   }
// );

Given("A book with ID {int} does not exist", async function (id: number) {
  await this.context.get(`/api/books/${id}`, {
    headers: { Authorization: this.auth },
  });
});

Given(
  "A book with title {string} already exists",
  async function (title: string) {
    this.response = await this.context.get("/api/books", {
      headers: { Authorization: this.auth },
    });

    expect(this.response.status()).toBe(200);

    const books = await this.response.json();
    const bookTitleExists = books.some(
      (book: { title: string }) => book.title === title
    );

    expect(bookTitleExists).toBe(true);
  }
);

When(
  "I send a PUT request to {string} with following details:",
  async function (path: string, jsonBody: string) {
    const json = JSON.parse(jsonBody);
    this.response = await this.context.put(path, {
      data: json,
      headers: { Authorization: this.auth },
    });
  }
);

// Then(
//   "The response status code should be {int}",
//   async function (expResponseCode: number) {
//     expect(this.response.status()).toBe(expResponseCode);
//   }
// );

// Then(
//   "The response body should contain {string}",
//   async function (expected: string) {
//     const body = await this.response.text();
//     expect(body).toContain(expected);
//   }
// );

After(async function () {
  this.closeRequestContext();
});
