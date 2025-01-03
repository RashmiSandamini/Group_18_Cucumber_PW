import { Given, When, Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.initRequestContext();
});

Given('I am authorized as {string} in DELETE tests with {string}', async function (role: string, creds: string) {
  if (role === 'admin' || role === 'user') {
    this.setAuth(creds);
  } else {
    throw new Error(`Unsupported role: ${role}`);
  }
});

Given('A book exists with ID {string}', async function (id: string) {
  const response = await this.context.post('/api/books', {
    data: { id: Number(id), title: 'Sample Book', author: 'Sample Author' },
    headers: { Authorization: this.auth },
  });

  const validStatusCodes = [201, 208]; // 201: Created, 208: Already Exists
  if (!validStatusCodes.includes(response.status())) {
    throw new Error(`Unexpected status code when creating a book: ${response.status()}`);
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
