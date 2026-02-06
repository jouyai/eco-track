"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";

const changes = [
  {
    version: "v1.2.0",
    date: "6 Februari 2026",
    type: "major",
    title: "Auth & Enterprise Update",
    items: [
      "✨ Menambahkan halaman Login dan Signup dengan validasi lengkap.",
      "✨ Meluncurkan halaman Enterprise untuk solusi bisnis.",
      "✨ Menambahkan halaman Pricing dengan opsi paket fleksibel.",
      "🚀 Peningkatan performa pada landing page utama.",
      "🐛 Perbaikan bug pada tampilan mobile navbar."
    ]
  },
  {
    version: "v1.1.0",
    date: "1 Februari 2026",
    type: "minor",
    title: "Fitur Pelacakan Dasar",
    items: [
      "✨ Fitur input jejak karbon harian.",
      "✨ Dashboard pengguna sederhana.",
      "🎨 Redesign visual komponen kartu.",
      "🐛 Fix typo pada halaman About."
    ]
  },
  {
    version: "v1.0.0",
    date: "15 Januari 2026",
    type: "major",
    title: "Initial Release",
    items: [
      "🎉 Peluncuran publik EcoTrack Beta.",
      "✨ Halaman Landing, About, dan Features.",
      "✨ Sistem autentikasi dasar.",
      "✨ Integrasi database awal."
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Changelog</h1>
            <p className="text-xl text-muted-foreground">
              Ikuti perkembangan terbaru dan pembaruan fitur EcoTrack.
            </p>
          </div>

          <div className="relative border-l border-border ml-4 md:ml-6 space-y-12">
            {changes.map((change, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className={`absolute -left-[5px] md:-left-[7px] top-2 h-2.5 w-2.5 md:h-3.5 md:w-3.5 rounded-full border-2 border-background ${
                  change.type === 'major' ? 'bg-primary' : 'bg-muted-foreground'
                }`} />
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{change.date}</span>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{change.version}</h2>
                    {change.type === 'major' && (
                      <Badge variant="default" className="text-xs">Major Update</Badge>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-4 text-foreground/90">{change.title}</h3>
                
                <ul className="space-y-3">
                  {change.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground leading-relaxed flex gap-2">
                      <span className="shrink-0 text-primary">•</span>
                      <span>{item.replace(/^[^\s]+\s/, "")}</span> {/* Remove emoji for cleaner text if needed, keeping for now */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
