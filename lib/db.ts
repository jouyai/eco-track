import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getRequestContext } from "@cloudflare/next-on-pages";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const makePrisma = () => {
  // Cek apakah kita di environment Cloudflare Pages
  try {
    const context = getRequestContext();
    if (context.env && context.env.DB) {
      const adapter = new PrismaD1(context.env.DB);
      return new PrismaClient({ adapter });
    }
  } catch (e) {
    // Ignore error if not in Cloudflare context
  }

  // Fallback untuk build time (static generation) atau local dev
  // Di Edge Runtime, PrismaClient standar tidak bisa jalan tanpa adapter,
  // jadi kita harus memastikan ini tidak dipanggil saat runtime di Cloudflare jika DB tidak ada.
  // Namun, saat build time next build, ini mungkin dipanggil.
  
  return new PrismaClient({
    log: ["query"],
  });
};

export const prisma = globalForPrisma.prisma || makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
