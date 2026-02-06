"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import Building2 from "lucide-react/dist/esm/icons/building-2";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Zap from "lucide-react/dist/esm/icons/zap";
import Globe from "lucide-react/dist/esm/icons/globe";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Users from "lucide-react/dist/esm/icons/users";
import Link from "next/link";

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                EcoTrack Enterprise
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Keberlanjutan Skala Besar untuk <span className="text-primary">Bisnis Modern</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Bantu perusahaan Anda mencapai target Net Zero dengan platform manajemen karbon yang komprehensif, terukur, dan aman.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-base">
                  Hubungi Penjualan
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-square bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
                <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-2xl w-full max-w-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Corp Dashboard</h3>
                      <p className="text-xs text-muted-foreground">Real-time ESG Metrics</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 bg-secondary rounded-full w-3/4" />
                    <div className="h-2 bg-secondary rounded-full w-full" />
                    <div className="h-2 bg-secondary rounded-full w-5/6" />
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-20 bg-muted rounded-lg" />
                      <div className="h-20 bg-muted rounded-lg" />
                      <div className="h-20 bg-muted rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-muted/30 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Fitur Kelas Enterprise</h2>
              <p className="text-muted-foreground">
                Dirancang untuk memenuhi kebutuhan kompleks organisasi multinasional.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart3,
                  title: "Pelaporan ESG Otomatis",
                  desc: "Hasilkan laporan keberlanjutan standar industri (GRI, SASB) dalam hitungan detik."
                },
                {
                  icon: ShieldCheck,
                  title: "Keamanan Tingkat Bank",
                  desc: "Enkripsi end-to-end, SSO, dan kepatuhan GDPR/CCPA penuh untuk data sensitif Anda."
                },
                {
                  icon: Zap,
                  title: "Integrasi API",
                  desc: "Hubungkan EcoTrack dengan ERP, HRIS, dan sistem supply chain yang sudah ada."
                },
                {
                  icon: Users,
                  title: "Manajemen Karyawan",
                  desc: "Engage ribuan karyawan dengan tantangan tim dan gamifikasi yang disesuaikan."
                },
                {
                  icon: Globe,
                  title: "Analisis Rantai Pasok",
                  desc: "Lacak emisi Scope 3 dari hulu ke hilir dengan visibilitas penuh."
                },
                {
                  icon: Building2,
                  title: "Multi-Tenant Architecture",
                  desc: "Kelola berbagai anak perusahaan dan lokasi dalam satu dashboard terpusat."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 mt-24">
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Siap Mengubah Bisnis Anda?</h2>
              <p className="text-primary-foreground/80 text-lg">
                Jadwalkan demo dengan tim ahli kami dan temukan bagaimana EcoTrack dapat membantu mencapai target keberlanjutan Anda.
              </p>
              <Button size="lg" variant="secondary" className="font-semibold">
                Jadwalkan Demo Gratis
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
