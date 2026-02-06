"use client";

import Link from "next/link";
import { ArrowRight, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "./animations";

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] z-0 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-accent/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative px-4 md:px-6 z-10">
        <motion.div 
          className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 bg-primary/5 text-primary rounded-full mb-4">
              ✨ Solusi Hidup Berkelanjutan #1
            </Badge>
          </motion.div>
          
          <motion.div variants={fadeIn} className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Lacak Jejak Karbon, <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                Selamatkan Bumi
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Platform cerdas untuk memantau, menganalisis, dan mengurangi dampak lingkungan dari aktivitas harian Anda. Mulai perubahan kecil untuk dampak besar.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 text-base border-border/60 hover:bg-accent/50">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div variants={fadeIn} className="pt-8 flex items-center justify-center gap-8 text-muted-foreground/80 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10k+ Pengguna Aktif</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>50+ Negara</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
