import { resetDb } from "./utils/reset-db";

export default async function globalTeardown() {
  await resetDb();
}
