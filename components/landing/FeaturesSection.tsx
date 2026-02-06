"use client";

import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Zap from "lucide-react/dist/esm/icons/zap";
import Globe from "lucide-react/dist/esm/icons/globe";
import Users from "lucide-react/dist/esm/icons/users";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "./animations";

export function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Activity Logging",
      desc: "Catat aktivitas harian seperti transportasi, konsumsi energi, dan daur ulang dengan antarmuka yang intuitif."
    },
    {
      icon: Zap,
      title: "Carbon Calculation",
      desc: "Algoritma cerdas yang menghitung jejak karbon Anda secara otomatis dan memberikan visualisasi data real-time."
    },
    {
      icon: Trophy,
      title: "Gamification",
      desc: "Selesaikan tantangan mingguan, raih badge eksklusif, dan berkompetisi di leaderboard global."
    },
    {
      icon: ShieldCheck,
      title: "Smart Insights",
      desc: "Dapatkan rekomendasi personal berbasis AI untuk mengurangi emisi berdasarkan pola aktivitas Anda."
    },
    {
      icon: Users,
      title: "Community",
      desc: "Bergabung dengan komunitas peduli lingkungan, bagikan pencapaian, dan inspirasi orang lain."
    },
    {
      icon: Globe,
      title: "Global Impact",
      desc: "Lihat bagaimana kontribusi kecil Anda berdampak pada target pengurangan emisi global."
    }
  ];

  return (
    <section id="features" className="w-full py-20 bg-muted/30 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <Badge variant="secondary" className="px-3 py-1 mb-2">Fitur Unggulan</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Teknologi untuk Masa Depan Hijau
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg/relaxed">
            Kami menyediakan alat komprehensif untuk membantu Anda beralih ke gaya hidup zero-waste dengan mudah dan menyenangkan.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={fadeIn}>
              <Card className="h-full border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
