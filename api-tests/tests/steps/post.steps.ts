import {
  Given,
  When,
  Then,
  Before,
  After,
  DataTable,
} from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Before(async function () {
  await this.initRequestContext();
});

// Given('I am authorized with {string} as an admin', async function (creds: string) {
//   this.setAuth(creds);
// });

Given('I am authorized with {string} as a user', async function (creds: string) {
  this.setAuth(creds);
});

Given("I am not logged in as an admin or user", async function () {
  this.auth = null; // Clear the auth to simulate a non-logged-in user
});


When(
  'I send a POST request to {string} with the following JSON body:',
  async function (path: string, jsonBody: string) {
    const json = JSON.parse(jsonBody);
    this.response = await this.context.post(path, {
      data: json,
      headers: { Authorization: this.auth },
    });
  }
);

When(
  'I send a POST request to {string} with the following books',
  async function (path: string, table: DataTable) {
    const tableData = table.hashes();
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];
      this.response = await this.context.post(path, {
        data: {
          title: row.title,
          author: row.author,
        },
        headers: { Authorization: this.auth },
      });
    }
  }
);

When(
  'I send a POST request to {string} with the following book details',
  async function (path: string, table: DataTable) {
    const tableData = table.hashes();
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];
      this.response = await this.context.post(path, {
        data: {
          title: row.title,
          author: row.author,
        },
        headers: {
          Authorization: `Bearer ${this.auth}`, // Ensure Authorization is a string
          'Content-Type': 'application/json',  // Include Content-Type for JSON payloads
        },
      });
    }
  }
);


Then(
  'The response body should include {string}',
  async function (expectedSubstring: string) {
    const body = await this.response.json();
    expect(JSON.stringify(body)).toContain(expectedSubstring);
  }
);

When(
  'I send a POST request to {string} with the following invalid books',
  async function (path: string, table: DataTable) {
    const tableData = table.hashes();
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];
      this.response = await this.context.post(path, {
        data: {
          title: row.title,
          author: row.author,
        },
        headers: { Authorization: this.auth },
      });
    }
  }
);

Then(
  'The response should fail with a status code {int} and message {string}',
  async function (expResponseCode: number, expMessage: string) {
    expect(this.response.status()).toBe(expResponseCode);
    const body = await this.response.json();
    expect(body.message).toBe(expMessage);
  }
);


After(async function () {
  this.closeRequestContext();
});
