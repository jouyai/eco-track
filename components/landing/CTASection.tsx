import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
         <div className="absolute -top-[50%] -left-[20%] w-[1000px] h-[1000px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      <div className="container mx-auto relative z-10 px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-6">
          Siap Memulai Perubahan?
        </h2>
        <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl mb-10">
          Bergabunglah dengan ribuan orang lainnya yang telah mengambil langkah nyata untuk menyelamatkan bumi. Gratis selamanya untuk individu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8 font-semibold text-primary hover:bg-white">
              Buat Akun Gratis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
