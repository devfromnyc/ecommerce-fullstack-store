import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema/index";
import * as dotenv from "dotenv";

if (!process.env.VERCEL) {
  dotenv.config({ path: ".env.local" });
}

function createDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it in Vercel → Project Settings → Environment Variables for Production and Preview, then redeploy."
    );
  }

  return drizzle(neon(databaseUrl), { schema });
}

type Database = ReturnType<typeof createDb>;

let cachedDb: Database | undefined;

export function getDb(): Database {
  if (!cachedDb) {
    cachedDb = createDb();
  }
  return cachedDb;
}

export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    const target = getDb() as object;
    const value = Reflect.get(target, prop, receiver);
    return typeof value === "function" ? value.bind(target) : value;
  },
});
