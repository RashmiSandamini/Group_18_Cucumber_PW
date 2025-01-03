import { Given, When, Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.initRequestContext();
});

Given('I am authorized as a user with {string}', async function (creds: string) {
  this.setAuth(creds); // Set auth for other steps
});

When('A user sends a DELETE request to {string}', async function (path: string) {
  if (this.auth) {
    // If user is authorized, send the DELETE request with authorization header
    this.response = await this.context.delete(path, {
      headers: { Authorization: this.auth },
      
    });
  } else {
    // If no auth provided, omit the Authorization header
    this.response = await this.context.delete(path, {
      headers: {},
      
    });
  }
});

After(async function () {
  this.closeRequestContext();
});
