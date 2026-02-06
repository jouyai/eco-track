import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schema from "./db/schema";

export const runtime = 'edge';

function getDb(): DrizzleD1Database<typeof schema> {
  // Try to get the real D1 binding
  try {
    const context = getRequestContext();
    if (context.env && context.env.DB) {
      return drizzle(context.env.DB, { schema });
    }
  } catch (e) {
    // Ignore error if not in Cloudflare context
  }

  // Fallback for build time / local dev without binding
  // Create a mock D1 database binding that satisfies the basic D1Database interface
  // This ensures drizzle() returns a valid Drizzle instance that Auth.js adapter accepts
  const mockD1: any = {
    prepare: (query: string) => ({
      bind: (...args: any[]) => ({
        all: async () => ({ results: [] }),
        run: async () => ({ success: true, meta: {} }),
        first: async () => null,
        raw: async () => [],
      }),
    }),
    batch: async (statements: any[]) => [],
    dump: async () => new ArrayBuffer(0),
    exec: async (query: string) => {},
  };

  // Return a real drizzle instance using the mock binding
  return drizzle(mockD1, { schema });
}

export const db = getDb();
