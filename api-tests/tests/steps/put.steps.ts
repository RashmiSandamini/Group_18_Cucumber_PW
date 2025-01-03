import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Before(async function () {
  await this.initRequestContext();
});

Given("I am authorized with {string} as an admin", function (creds: string) {
  this.auth = creds;
});

Given("A book with ID {int} does not exist", async function (id: number) {
  this.response = await this.context.get(`/api/books/${id}`, {
    headers: { Authorization: this.auth },
  });
  expect(this.response.status()).toBe(404);
});

Given("I send a POST request to {string} with the following details", async function (path: string, dataTable: any) {
  const books = dataTable.hashes();
  for (const book of books) {
    await this.context.post(path, {
      data: book,
      headers: {
        Authorization: this.auth,
        "Content-Type": "application/json",
      },
    });
  }
});

When("I send a PUT request to {string} with below details:", async function (path: string, jsonBody: string) {
    const json = JSON.parse(jsonBody);
    
    // Ensure headers are correctly formatted
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (this.auth) {
        headers.Authorization = this.auth; // Add Authorization header if present
    }

    // Make the PUT request
    this.response = await this.context.put(path, {
        data: json,
        headers,
    });
});

Given("a valid book with id={int} exists in the system", async function (id: number) {
  const bookData = {
    id: id,
    title: `Test Book ${id}`,
    author: `Test Author ${id}`,
  };

  // Send POST request to create the book
  const response = await this.context.post("/api/books", {
    data: bookData,
    headers: {
      Authorization: "Basic YWRtaW46cGFzc3dvcmQ=", // Admin credentials
      "Content-Type": "application/json",
    },
  });

  // Handle conflicts gracefully if the book already exists
  if (response.status() !== 201 && response.status() !== 409) {
    throw new Error(`Failed to create a valid book in the system. Status: ${response.status()}`);
  }
});


Given("A book with title {string} already exists", async function (title: string) {
  this.response = await this.context.get("/api/books", {
    headers: { Authorization: this.auth },
  });
  expect(this.response.status()).toBe(200);

  const books = await this.response.json();
  const bookExists = books.some((book: { title: string }) => book.title === title);
  expect(bookExists).toBe(true);
});

Given("I am not logged in as an admin", function () {
  this.auth = null; // Clear the auth to simulate a non-logged-in user
});

When("I send a PUT request to {string} with following details:", async function (path: string, jsonBody: string) {
  const json = JSON.parse(jsonBody);
  this.response = await this.context.put(path, {
    data: json,
    headers: {
      Authorization: this.auth,
      "Content-Type": "application/json",
    },
  });
});

Then("The response body should contain {string}", async function (expected: string) {
  const body = await this.response.text();
  expect(body).toContain(expected);
});

After(async function () {
  await this.closeRequestContext();
});
