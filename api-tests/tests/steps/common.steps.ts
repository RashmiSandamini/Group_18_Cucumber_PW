import { Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then(
  'The response status code should be {int}',
  async function (expResponseCode: number) {
    expect(this.response.status()).toBe(expResponseCode);
  }
);

Given("I am authorized with {string} as an admin", function (creds: string) {
  this.auth = creds;
});

Given('I am authorized with {string} as a user', async function (creds: string) {
  this.setAuth(creds);
});

Given("I am not logged in as an admin or user", async function () {
  this.auth = null; // Clear the auth to simulate a non-logged-in user
});


Then('The response type should be {string}', async function (expType: string) {
  expect(this.response.headers()['content-type']).toContain(expType);
});

Then(
  'The json response body should contain {string}',
  async function (expected: string) {
    let body;
    try {
      body = await this.response.json();
    } catch (error) {
      throw new Error('Response body is not JSON');
    }
    expect(body.message).toBe(expected);
  }
);

Then(
  'The text response body should contain {string}',
  async function (expected: string) {
    let body;
    try {
      body = await this.response.text();
    } catch (error) {
      throw new Error('Response body is not text');
    }
    expect(body).toBe(expected);
  }
);
