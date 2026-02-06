"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import Users from "lucide-react/dist/esm/icons/users";
import Globe from "lucide-react/dist/esm/icons/globe";
import Target from "lucide-react/dist/esm/icons/target";
import Heart from "lucide-react/dist/esm/icons/heart";
import Award from "lucide-react/dist/esm/icons/award";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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

export default function AboutPage() {
  const values = [
    {
      icon: Globe,
      title: "Keberlanjutan",
      desc: "Kami percaya bahwa setiap tindakan kecil berdampak pada masa depan planet ini. Fokus kami adalah solusi jangka panjang."
    },
    {
      icon: Users,
      title: "Komunitas",
      desc: "Perubahan besar terjadi ketika kita bergerak bersama. Kami membangun platform yang inklusif dan kolaboratif."
    },
    {
      icon: Heart,
      title: "Integritas",
      desc: "Transparansi adalah kunci. Kami menyajikan data yang akurat dan dapat dipertanggungjawabkan tanpa greenwashing."
    },
    {
      icon: Target,
      title: "Inovasi",
      desc: "Kami terus mencari cara baru dan teknologi terkini untuk mempermudah gaya hidup ramah lingkungan."
    }
  ];

  const team = [
    { name: "Andi Pratama", role: "CEO & Founder", image: "bg-blue-200" },
    { name: "Siti Rahma", role: "Chief Sustainability Officer", image: "bg-green-200" },
    { name: "Budi Santoso", role: "Head of Engineering", image: "bg-purple-200" },
    { name: "Diana Putri", role: "Community Manager", image: "bg-yellow-200" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-6"
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary rounded-full">
                  Tentang Kami
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Membangun Masa Depan yang <span className="text-primary">Lebih Hijau</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Misi kami adalah memberdayakan 1 miliar orang untuk mengambil tindakan nyata melawan perubahan iklim melalui teknologi yang mudah diakses.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Leaf className="h-5 w-5" />
                  <span>Cerita Kami</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dari Kesadaran Menjadi Aksi</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  EcoTrack lahir dari keprihatinan sederhana: banyak orang ingin hidup lebih ramah lingkungan, tetapi bingung harus mulai dari mana.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pada tahun 2024, sekelompok aktivis lingkungan dan engineer berkumpul dengan satu tujuan: menciptakan alat yang tidak hanya melacak jejak karbon, tetapi juga membuat proses pengurangan emisi menjadi menyenangkan dan bermanfaat.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kini, EcoTrack telah berkembang menjadi platform global yang menghubungkan individu, komunitas, dan organisasi dalam satu gerakan bersama untuk bumi.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-tr from-green-100 to-primary/20 border border-border/50 shadow-xl"
              >
                {/* Abstract Visual Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-3/4 h-3/4 bg-white/50 backdrop-blur-sm rounded-xl p-8 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-1/3 bg-primary/20 rounded animate-pulse" />
                        <div className="h-2 w-full bg-muted rounded" />
                        <div className="h-2 w-full bg-muted rounded" />
                      </div>
                      <div className="flex items-end justify-between">
                         <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Leaf className="h-8 w-8 text-primary" />
                         </div>
                         <div className="h-8 w-24 bg-primary text-primary-foreground rounded flex items-center justify-center text-xs font-bold">
                            EcoTrack
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Nilai-Nilai Kami</h2>
              <p className="text-muted-foreground">Prinsip yang membimbing setiap keputusan dan inovasi yang kami buat.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, idx) => (
                <Card key={idx} className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <val.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">{val.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {val.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team (Optional Placeholder) */}
        <section className="py-20 bg-muted/30 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Tim di Balik Layar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Orang-orang berdedikasi yang bekerja keras untuk mewujudkan visi dunia yang lebih lestari.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-32 h-32 rounded-full ${member.image} flex items-center justify-center text-3xl font-bold text-foreground/20 border-4 border-background shadow-md`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ingin Menjadi Bagian dari Perubahan?</h2>
            <p className="text-muted-foreground text-lg">
              Kami selalu mencari talenta berbakat dan mitra strategis yang memiliki visi yang sama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers">
                <Button size="lg" className="px-8">Lihat Karir</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8">Hubungi Kami</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
