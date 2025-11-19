import { resetDb } from "./utils/reset-db";

export default async function globalSetup() {
  await resetDb();
}
