"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-green dark:prose-invert max-w-none">
            <h1>Kebijakan Cookie</h1>
            <p className="lead text-muted-foreground text-xl">
              Terakhir diperbarui: 6 Februari 2026
            </p>

            <p>
              Kebijakan Cookie ini menjelaskan apa itu cookie dan bagaimana kami menggunakannya di situs web EcoTrack. Anda harus membaca kebijakan ini untuk memahami jenis cookie yang kami gunakan, informasi yang kami kumpulkan menggunakan cookie, dan bagaimana informasi tersebut digunakan.
            </p>

            <h2>1. Apa itu Cookie?</h2>
            <p>
              Cookie adalah file teks kecil yang dikirim ke browser web Anda oleh situs web yang Anda kunjungi. File cookie disimpan di browser web Anda dan memungkinkan Layanan atau pihak ketiga untuk mengenali Anda dan membuat kunjungan Anda berikutnya lebih mudah dan Layanan lebih berguna bagi Anda.
            </p>

            <h2>2. Bagaimana EcoTrack Menggunakan Cookie</h2>
            <p>
              Saat Anda menggunakan dan mengakses Layanan, kami dapat menempatkan sejumlah file cookie di browser web Anda. Kami menggunakan cookie untuk tujuan berikut:
            </p>
            <ul>
              <li><strong>Cookie Penting:</strong> Untuk mengaktifkan fungsi tertentu dari Layanan, seperti otentikasi dan pencegahan penipuan.</li>
              <li><strong>Cookie Analitik:</strong> Untuk melacak informasi tentang bagaimana Layanan digunakan sehingga kami dapat melakukan perbaikan.</li>
              <li><strong>Cookie Preferensi:</strong> Untuk menyimpan preferensi Anda dan berbagai pengaturan.</li>
            </ul>

            <h2>3. Pilihan Anda Mengenai Cookie</h2>
            <p>
              Jika Anda ingin menghapus cookie atau menginstruksikan browser web Anda untuk menghapus atau menolak cookie, silakan kunjungi halaman bantuan browser web Anda.
            </p>
            <p>
              Harap dicatat, bagaimanapun, bahwa jika Anda menghapus cookie atau menolak untuk menerimanya, Anda mungkin tidak dapat menggunakan semua fitur yang kami tawarkan, Anda mungkin tidak dapat menyimpan preferensi Anda, dan beberapa halaman kami mungkin tidak ditampilkan dengan benar.
            </p>

            <h2>4. Informasi Lebih Lanjut</h2>
            <p>
              Anda dapat mempelajari lebih lanjut tentang cookie di situs web pihak ketiga berikut:
            </p>
            <ul>
              <li><a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">AllAboutCookies</a></li>
              <li><a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a></li>
            </ul>

            <h2>5. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang penggunaan cookie kami, silakan hubungi kami di <a href="mailto:privacy@ecotrack.id">privacy@ecotrack.id</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
