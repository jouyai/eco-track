"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import User from "lucide-react/dist/esm/icons/user";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "10 Langkah Mudah Memulai Gaya Hidup Zero Waste",
    excerpt: "Panduan praktis untuk pemula yang ingin mengurangi limbah rumah tangga tanpa merasa terbebani.",
    category: "Tips",
    author: "Sari Wulandari",
    date: "5 Feb 2026",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mengenal Carbon Offset: Solusi atau Greenwashing?",
    excerpt: "Kupas tuntas tentang mekanisme carbon offset dan bagaimana memilih proyek yang kredibel.",
    category: "Edukasi",
    author: "Budi Santoso",
    date: "2 Feb 2026",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "EcoTrack Raih Pendanaan Series A untuk Ekspansi Asia",
    excerpt: "Berita gembira! Kami siap membawa dampak positif ke lebih banyak negara di Asia Tenggara.",
    category: "Berita",
    author: "Team EcoTrack",
    date: "28 Jan 2026",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    readTime: "3 min read"
  },
  {
    id: 4,
    title: "Review: 5 Alternatif Plastik Sekali Pakai Terbaik",
    excerpt: "Kami mencoba berbagai produk ramah lingkungan dan inilah rekomendasi terbaik kami untuk Anda.",
    category: "Review",
    author: "Dina Pertiwi",
    date: "20 Jan 2026",
    image: "https://images.unsplash.com/photo-1610438250910-01e8c7479c36?q=80&w=800&auto=format&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Dampak Perubahan Iklim terhadap Pertanian Lokal",
    excerpt: "Analisis mendalam tentang tantangan yang dihadapi petani lokal dan solusi adaptasi.",
    category: "Riset",
    author: "Dr. Asep Gunawan",
    date: "15 Jan 2026",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef38ec?q=80&w=800&auto=format&fit=crop",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Cara Menghitung Jejak Karbon Digital Anda",
    excerpt: "Internet juga menghasilkan emisi. Pelajari cara mengurangi jejak karbon digital Anda.",
    category: "Teknologi",
    author: "Rian Hidayat",
    date: "10 Jan 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    readTime: "4 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Blog & Wawasan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Informasi terbaru, tips praktis, dan cerita inspiratif seputar keberlanjutan dan lingkungan hidup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm font-semibold">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {post.author}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:underline decoration-primary/30 underline-offset-4">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-xs font-medium text-muted-foreground">{post.readTime}</span>
                    <Link href={`/blog/${post.id}`} className="text-sm font-semibold text-primary flex items-center hover:gap-2 transition-all">
                      Baca Selengkapnya <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
