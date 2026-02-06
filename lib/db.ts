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
  
  // Jika kita sedang di environment Edge (tapi bukan Cloudflare yang valid), jangan return PrismaClient standar.
  // Return undefined atau throw error yang bisa ditangkap.
  // Namun, untuk build process Next.js, kita perlu instance dummy jika DB tidak tersedia.
  
  if (process.env.NEXT_RUNTIME === 'edge') {
    // Di Edge Runtime tanpa Adapter, PrismaClient akan error.
    // Kita return object kosong yang diproxy agar tidak crash saat import, 
    // tapi akan error jika method dipanggil (yang seharusnya tidak terjadi di build time karena dynamic usage).
    return new Proxy({} as PrismaClient, {
      get: (target, prop) => {
        if (prop === 'then') return undefined; // Biar tidak dianggap Promise
        return () => {
           throw new Error("Prisma Client cannot be used in Edge Runtime without D1 Adapter.");
        }
      }
    });
  }

  return new PrismaClient({
    log: ["query"],
  });
};

export const prisma = globalForPrisma.prisma || makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
