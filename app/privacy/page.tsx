"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-green dark:prose-invert max-w-none">
            <h1>Kebijakan Privasi</h1>
            <p className="lead text-muted-foreground text-xl">
              Terakhir diperbarui: 6 Februari 2026
            </p>

            <p>
              Di EcoTrack, kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan layanan kami.
            </p>

            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>
              Kami mengumpulkan beberapa jenis informasi untuk memberikan dan meningkatkan layanan kami kepada Anda:
            </p>
            <ul>
              <li>
                <strong>Informasi Pribadi:</strong> Saat Anda mendaftar, kami meminta informasi seperti nama, alamat email, dan informasi kontak lainnya.
              </li>
              <li>
                <strong>Data Aktivitas:</strong> Data terkait jejak karbon yang Anda masukkan, seperti penggunaan listrik, transportasi, dan pola konsumsi.
              </li>
              <li>
                <strong>Data Teknis:</strong> Alamat IP, jenis browser, dan data perangkat untuk keperluan analitik dan keamanan.
              </li>
            </ul>

            <h2>2. Penggunaan Informasi</h2>
            <p>
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul>
              <li>Menyediakan, mengoperasikan, dan memelihara layanan kami.</li>
              <li>Meningkatkan, mempersonalisasi, dan mengembangkan layanan kami.</li>
              <li>Memahami dan menganalisis bagaimana Anda menggunakan layanan kami.</li>
              <li>Berkomunikasi dengan Anda, baik secara langsung atau melalui mitra kami, termasuk untuk layanan pelanggan.</li>
            </ul>

            <h2>3. Keamanan Data</h2>
            <p>
              Keamanan data Anda penting bagi kami. Kami menggunakan standar industri untuk melindungi informasi pribadi Anda. Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman.
            </p>

            <h2>4. Hak Anda</h2>
            <p>
              Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi yang kami miliki tentang Anda. Anda dapat melakukan ini melalui pengaturan akun Anda atau dengan menghubungi kami secara langsung.
            </p>

            <h2>5. Perubahan pada Kebijakan Ini</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.
            </p>

            <h2>6. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:privacy@ecotrack.id">privacy@ecotrack.id</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
