import { Given, When, Before, After } from "@cucumber/cucumber";

Before(async function () {
  await this.initRequestContext();
});

Given("A book with ID {int} does not exist", async function (id: number) {
    this.response = await this.context.get(`/api/books/${id}`, {
    headers: { Authorization: this.auth },
  });
});

When(
  "I send a PUT request to {string} with following details:",
  async function (path: string, jsonBody: string) {
    const json = JSON.parse(jsonBody);
    this.response = await this.context.put(path, {
      data: json,
      headers: { Authorization: this.auth },
    });
  }
);

After(async function () {
  this.closeRequestContext();
});
