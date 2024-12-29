import { setWorldConstructor } from "@cucumber/cucumber";
import { request, APIRequestContext, APIResponse } from "@playwright/test"

class CustomWorld {
  context?: APIRequestContext;
  response?: APIResponse;
  auth?: string;

  async initRequestContext() {
    this.context = await request.newContext({
      baseURL: 'http://localhost:7081/api',
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  setAuth(auth:string) {
    this.auth = auth;
  }

  async closeRequestContext() {
    await this.context?.dispose();
  }

  async sendPostRequest(path: string, data: any) {
    if (!this.context) {
      throw new Error("Request context is not initialized.");
    }

    this.response = await this.context.post(path, {
      data,
      headers: this.auth ? { Authorization: this.auth } : undefined,
    });
  }

  async getResponseBody() {
    if (!this.response) {
      throw new Error("No response available.");
    }

    return this.response.json();
  }

  async getResponseStatus() {
    if (!this.response) {
      throw new Error("No response available.");
    }

    return this.response.status();
  }
}

setWorldConstructor(CustomWorld);
