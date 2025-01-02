import { Given, When, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Before(async function () {
  await this.initRequestContext();
});

Given('I am authorized as admin in DELETE tests with {string}', async function (creds: string) {
  this.setAuth(creds);
});

Given('I am authorized as user in DELETE tests with {string}', async function (creds: string) {
  this.setAuth(creds);
});

Given('A book exists with ID {string}', async function (id: string) {
  const response = await this.context.post('/api/books', {
    data: { id: Number(id), title: 'Sample Book', author: 'Sample Author' },
    headers: { Authorization: this.auth },
  });
  if (response.status() !== 201 && response.status() !== 208) {
    throw new Error(`Unexpected status code: ${response.status()}`);
  }
});

When('I send a DELETE request to {string}', async function (path: string) {
  this.response = await this.context.delete(path, {
    headers: { Authorization: this.auth },
  });
});

After(async function () {
  this.closeRequestContext();
});
