import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schema from "./db/schema";

export const runtime = 'edge';

function getDb(): DrizzleD1Database<typeof schema> {
  try {
    const context = getRequestContext();
    if (context.env && context.env.DB) {
      return drizzle(context.env.DB, { schema });
    }
  } catch (e) {
    // Ignore error if not in Cloudflare context
  }
  
  // During build or dev without binding, return a proxy
  return new Proxy({} as DrizzleD1Database<typeof schema>, {
    get: (target, prop) => {
        if (prop === 'then') return undefined;
        return () => {
             throw new Error("D1 Database not available. Ensure you are running in Cloudflare Pages or have bindings set up.");
        }
    }
  });
}

export const db = getDb();
