import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Before(async function () {
  await this.initRequestContext();
});

Given('I am authorized with {string}', async function (creds) {
  this.setAuth(creds);
});

When(
  'I send a POST request to {string} with the following JSON body:',
  async function (path, jsonBody) {
    const json = JSON.parse(jsonBody);
    this.response = await this.context.post(path, {
      data: json,
      headers: { Authorization: this.auth },
    });
  }
);

Then('The response status code should be {int}', async function (expResponseCode) {
  expect(this.response.status()).toBe(expResponseCode);
});

Then('The response body should contain:', async function (expResponseBody) {
  const body = await this.response.json();
  const expected = JSON.parse(expResponseBody);
  expect(body.title).toBe(expected.title);
  expect(body.author).toBe(expected.author)
});

After(async function () {
  this.closeRequestContext();
});
