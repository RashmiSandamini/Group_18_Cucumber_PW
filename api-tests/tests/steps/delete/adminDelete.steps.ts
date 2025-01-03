import { Given, When, Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.initRequestContext();
});

Given('I am authorized as an admin with {string}', async function (creds: string) {
  this.setAuth(creds);
});

Given('An admin ensures a book exists with ID {string}', async function (id: string) {
  const response = await this.context.post('/api/books', {
    data: { id: Number(id), title: 'Sample Book', author: 'Sample Author' },
    headers: { Authorization: this.auth },
  });

  const validStatusCodes = [201, 208]; // 201: Created, 208: Already Exists
  if (!validStatusCodes.includes(response.status())) {
    throw new Error(`Unexpected status code when creating a book: ${response.status()}`);
  }
});

When('An admin sends a DELETE request to {string}', async function (path: string) {
  this.response = await this.context.delete(path, {
    headers: { Authorization: this.auth },
  });
});

After(async function () {
  this.closeRequestContext();
});
