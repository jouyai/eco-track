import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "EcoTrack - Pelacak Dampak Lingkungan",
  description: "Pahami dan kurangi jejak karbon Anda dengan EcoTrack.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="id">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
