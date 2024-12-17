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
}

setWorldConstructor(CustomWorld);
