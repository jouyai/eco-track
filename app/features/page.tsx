"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Zap from "lucide-react/dist/esm/icons/zap";
import Globe from "lucide-react/dist/esm/icons/globe";
import Users from "lucide-react/dist/esm/icons/users";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Smartphone from "lucide-react/dist/esm/icons/smartphone";
import Share2 from "lucide-react/dist/esm/icons/share-2";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function FeaturesPage() {
  const detailedFeatures = [
    {
      title: "Pelacakan Aktivitas Komprehensif",
      description: "Catat setiap aspek gaya hidup Anda, mulai dari transportasi harian, penggunaan listrik, hingga kebiasaan makan. EcoTrack memudahkan Anda memahami sumber emisi karbon terbesar dalam hidup Anda.",
      icon: BarChart3,
      points: [
        "Input data otomatis dari smart device",
        "Kategori aktivitas yang dapat disesuaikan",
        "Riwayat aktivitas lengkap dan mudah diakses"
      ],
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Kalkulator Karbon Real-time",
      description: "Tidak perlu menebak-nebak lagi. Algoritma canggih kami menghitung jejak karbon Anda secara instan berdasarkan standar internasional terbaru.",
      icon: Zap,
      points: [
        "Metodologi perhitungan standar ISO 14064",
        "Visualisasi data yang interaktif",
        "Perbandingan dengan rata-rata nasional"
      ],
      color: "bg-yellow-500/10 text-yellow-600"
    },
    {
      title: "Gamifikasi & Tantangan",
      description: "Ubah gaya hidup ramah lingkungan menjadi permainan yang menyenangkan. Selesaikan misi harian, naikkan level, dan dapatkan penghargaan.",
      icon: Trophy,
      points: [
        "Sistem level dan experience points (XP)",
        "Badge eksklusif untuk pencapaian tertentu",
        "Leaderboard mingguan dan bulanan"
      ],
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      title: "Wawasan Cerdas Berbasis AI",
      description: "Asisten AI kami menganalisis pola perilaku Anda dan memberikan saran yang dipersonalisasi untuk mengurangi dampak lingkungan dengan cara yang paling efisien.",
      icon: ShieldCheck,
      points: [
        "Rekomendasi tindakan spesifik",
        "Prediksi penghematan karbon dan biaya",
        "Analisis tren jangka panjang"
      ],
      color: "bg-green-500/10 text-green-600"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* Header Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-muted/30 border-b border-border/40">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-6"
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary rounded-full">
                  Fitur Lengkap
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Semua Alat yang Anda Butuhkan untuk <span className="text-primary">Perubahan Nyata</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Jelajahi fitur-fitur canggih EcoTrack yang dirancang untuk membantu Anda memantau, mengurangi, dan mengimbangi jejak karbon Anda.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Detailed Features List */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 space-y-32">
            {detailedFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col gap-12 items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Placeholder */}
                <div className="w-full lg:w-1/2">
                  <div className={`relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl ${index % 2 === 0 ? 'bg-gradient-to-br from-muted to-background' : 'bg-gradient-to-bl from-muted to-background'}`}>
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                      <feature.icon className={`h-24 w-24 opacity-20 ${feature.color.split(' ')[1]}`} />
                    </div>
                    {/* Simulated UI Elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-background rounded-xl shadow-lg border border-border/40 p-6 flex flex-col gap-4">
                      <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
                      <div className="h-32 w-full bg-muted/50 rounded-lg animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-8 w-20 bg-primary/20 rounded animate-pulse" />
                        <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className={`inline-flex p-3 rounded-xl ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">{feature.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {feature.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 bg-green-500/20 p-1 rounded-full">
                          <ShieldCheck className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-foreground/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* More Features Grid */}
        <section className="py-20 bg-muted/30 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Dan Banyak Lagi...</h2>
              <p className="text-muted-foreground">Fitur tambahan yang membuat pengalaman EcoTrack semakin lengkap.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Smartphone, title: "Aplikasi Mobile", desc: "Akses EcoTrack di mana saja dengan aplikasi mobile responsif kami." },
                { icon: Users, title: "Komunitas Hijau", desc: "Diskusi dan berbagi tips dengan sesama pengguna." },
                { icon: Share2, title: "Social Sharing", desc: "Bagikan pencapaian Anda ke media sosial dengan satu klik." },
                { icon: Globe, title: "Dukungan Multi-bahasa", desc: "Tersedia dalam Bahasa Indonesia dan Inggris." },
                { icon: ShieldCheck, title: "Privasi Terjamin", desc: "Data Anda dienkripsi dan aman bersama kami." },
                { icon: Leaf, title: "Proyek Reboisasi", desc: "Donasikan poin Anda untuk menanam pohon sungguhan." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="bg-primary/5 p-3 rounded-lg h-fit">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-24 container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Siap Mengurangi Jejak Karbon Anda?</h2>
              <p className="text-primary-foreground/80 text-lg">
                Mulai perjalanan Anda menuju gaya hidup yang lebih berkelanjutan hari ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold text-primary">
                    Daftar Gratis
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Decorative background circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
