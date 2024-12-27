import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import axios from 'axios';

Before(async function () {
  await this.initRequestContext();
});

// Given("I am authorized with {string} as an admin", async function (creds: string) {
//   this.setAuth(creds);
// });

// Given("I am authorized with {string} as a user", async function (creds: string) {
//   this.setAuth(creds);
// });

Given("A book with ID {int} does not exist", async function (id: number) {
  this.response = await this.context.get(`/api/books/${id}`, {
    headers: { Authorization: this.auth },
  });
  expect(this.response.status()).toBe(404);
});

// Given('a valid book with id={int} exists in the system', async function (id: number) {
//   try {
//     const bookExists = await axios.get(`/api/books/${id}`, { headers: this.headers });
//     expect(bookExists.status).to.equal(200); // Book exists
//   } catch (error) {
//     throw new Error(`Book with id=${id} does not exist in the system`);
//   }
// });

Given('a valid book with id={int} exists in the system', async function (bookId: number) {
  // Create a valid book in the system if not already present
  const bookData = {
    id: bookId,
    title: 'Test Book',
    author: 'Test Author',
    publishedDate: '2023-01-01',
    isbn: '1234567890',
  };

  try {
    await axios.post('http://your-api-endpoint/books', bookData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=', // Admin authorization to add the book
      },
    });
  } catch (error) {
    // Handle errors gracefully if book already exists
    if (axios.isAxiosError(error) && error.response?.status !== 409) {
      throw new Error('Failed to create a valid book in the system');
    }
  }
});

Given("A book with title {string} already exists", async function (title: string) {
  this.response = await this.context.get("/api/books", {
    headers: { Authorization: this.auth },
  });
  expect(this.response.status()).toBe(200);

  const books = await this.response.json();
  const bookTitleExists = books.some(
    (book: { title: string }) => book.title === title
  );

  expect(bookTitleExists).toBe(true);
});

Given("I am not logged in as an admin", async function () {
  this.auth = null; // Clear the auth to simulate a non-logged-in user
});

When("I send a PUT request to {string} with following details:", async function (path: string, jsonBody: string) {
  const json = JSON.parse(jsonBody);
  this.response = await this.context.put(path, {
    data: json,
    headers: { Authorization: this.auth },
  });
});

// Then("The response status code should be {int}", async function (expResponseCode: number) {
//   expect(this.response.status()).toBe(expResponseCode);
// });

// Then("The response body should contain {string}", async function (expected: string) {
//   const body = await this.response.json();
//   expect(JSON.stringify(body)).toContain(expected);
// });

After(async function () {
  this.closeRequestContext();
});
