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

Given('I am authorized with {string} as an admin', async function (creds: string) {
  this.setAuth(creds);
});

Given('I am authorized with {string} as a user', async function (creds: string) {
  this.setAuth(creds);
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

After(async function () {
  this.closeRequestContext();
});
