"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Clock from "lucide-react/dist/esm/icons/clock";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import Link from "next/link";

const positions = [
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote (Indonesia)",
    type: "Full-time",
    description: "Kami mencari engineer berpengalaman untuk memimpin pengembangan platform inti kami menggunakan Next.js dan Node.js."
  },
  {
    id: 2,
    title: "Sustainability Analyst",
    department: "Research",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    description: "Bantu kami meningkatkan akurasi algoritma perhitungan jejak karbon dengan data dan riset terbaru."
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Rancang pengalaman pengguna yang intuitif dan menyenangkan untuk memotivasi aksi iklim."
  },
  {
    id: 4,
    title: "Community Manager",
    department: "Marketing",
    location: "Bali, Indonesia",
    type: "Full-time",
    description: "Bangun dan libatkan komunitas pejuang lingkungan kami melalui media sosial dan event."
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <Badge variant="secondary" className="mb-4">We are hiring!</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Bangun Masa Depan yang <span className="text-primary">Lebih Hijau</span> Bersama Kami
            </h1>
            <p className="text-xl text-muted-foreground">
              Bergabunglah dengan tim yang bersemangat untuk menggunakan teknologi demi kebaikan planet ini.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {positions.map((job) => (
              <div 
                key={job.id} 
                className="group relative bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-6 md:items-center justify-between"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap gap-2 items-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <span className="text-primary">{job.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                </div>
                
                <div className="shrink-0">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground w-full md:w-auto">
                    Lamar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-muted/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <Briefcase className="h-12 w-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Tidak menemukan posisi yang cocok?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Kami selalu terbuka untuk talenta luar biasa. Kirimkan CV Anda dan ceritakan bagaimana Anda bisa berkontribusi.
            </p>
            <Button variant="secondary" asChild>
              <Link href="mailto:careers@ecotrack.id">Kirim Open Application</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
