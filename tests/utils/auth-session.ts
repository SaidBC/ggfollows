import { request, Page } from "@playwright/test";

export async function loginViaApi(page: Page, email: string, password: string) {
  const req = await request.newContext();
  await req.post("/api/auth/callback/credentials", {
    form: { email, password },
  });

  const cookies = await req.storageState();
  await page.context().addCookies(cookies.cookies);
}
