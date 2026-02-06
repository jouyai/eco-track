"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Gratis",
    description: "Untuk individu yang baru memulai perjalanan hijau.",
    features: [
      "Pelacakan Jejak Karbon Dasar",
      "Tips Harian & Tantangan",
      "Komunitas Global",
      "1 Profil Pengguna",
    ],
    notIncluded: [
      "Laporan Analisis Mendalam",
      "Integrasi Smart Home",
      "Prioritas Dukungan",
    ],
    cta: "Mulai Gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "Rp 49.000",
    period: "/bulan",
    description: "Untuk pejuang lingkungan yang serius.",
    features: [
      "Semua fitur Starter",
      "Laporan Analisis Mendalam",
      "Integrasi Smart Home",
      "Kalkulator Offset Presisi",
      "Badge Profil Eksklusif",
    ],
    notIncluded: [
      "Prioritas Dukungan",
    ],
    cta: "Pilih Pro",
    popular: true,
  },
  {
    name: "Family",
    price: "Rp 99.000",
    period: "/bulan",
    description: "Ajak seluruh keluarga berkontribusi.",
    features: [
      "Semua fitur Pro",
      "Hingga 5 Profil Pengguna",
      "Tantangan Grup Keluarga",
      "Laporan Gabungan",
      "Prioritas Dukungan",
    ],
    notIncluded: [],
    cta: "Pilih Family",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Investasi Kecil untuk <span className="text-primary">Dampak Besar</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Pilih paket yang sesuai dengan gaya hidup dan kebutuhan Anda. Transparan, tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border p-8 shadow-sm flex flex-col ${
                  plan.popular 
                    ? "border-primary bg-primary/5 shadow-lg scale-105 z-10" 
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    PALING POPULER
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground/50">
                      <X className="h-4 w-4 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${plan.popular ? "" : "variant-outline"}`} 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-lg font-semibold mb-4">Punya pertanyaan?</h3>
            <p className="text-muted-foreground mb-8">
              Tim kami siap membantu Anda memilih paket yang tepat.
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Hubungi Tim Support &rarr;
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
