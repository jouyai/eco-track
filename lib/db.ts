import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getRequestContext } from "@cloudflare/next-on-pages";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const makePrisma = () => {
  // Coba gunakan adapter D1 jika di environment production/Cloudflare
  if (process.env.NODE_ENV === "production") {
    try {
      const context = getRequestContext();
      if (context.env && context.env.DB) {
        const adapter = new PrismaD1(context.env.DB);
        return new PrismaClient({ adapter });
      }
    } catch (e) {
      // Ignore error if not in Cloudflare context (e.g. build time)
    }
  }

  // Fallback ke local SQLite untuk development atau build time
  return new PrismaClient({
    log: ["query"],
  });
};

export const prisma = globalForPrisma.prisma || makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
