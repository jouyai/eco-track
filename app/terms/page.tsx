"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-green dark:prose-invert max-w-none">
            <h1>Syarat & Ketentuan</h1>
            <p className="lead text-muted-foreground text-xl">
              Terakhir diperbarui: 6 Februari 2026
            </p>

            <p>
              Selamat datang di EcoTrack. Harap baca Syarat dan Ketentuan ini dengan cermat sebelum menggunakan layanan kami.
            </p>

            <h2>1. Penerimaan Syarat</h2>
            <p>
              Dengan mengakses atau menggunakan layanan EcoTrack, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>

            <h2>2. Akun Pengguna</h2>
            <p>
              Saat Anda membuat akun dengan kami, Anda harus memberikan informasi yang akurat, lengkap, dan terkini. Kegagalan untuk melakukannya merupakan pelanggaran terhadap Syarat, yang dapat mengakibatkan penghentian segera akun Anda.
            </p>
            <p>
              Anda bertanggung jawab untuk menjaga keamanan kata sandi yang Anda gunakan untuk mengakses layanan dan untuk segala aktivitas atau tindakan di bawah kata sandi Anda.
            </p>

            <h2>3. Kekayaan Intelektual</h2>
            <p>
              Layanan dan konten aslinya (tidak termasuk Konten yang disediakan oleh pengguna), fitur, dan fungsionalitasnya adalah dan akan tetap menjadi milik eksklusif EcoTrack dan pemberi lisensinya.
            </p>

            <h2>4. Tautan Ke Situs Web Lain</h2>
            <p>
              Layanan kami mungkin berisi tautan ke situs web atau layanan pihak ketiga yang tidak dimiliki atau dikendalikan oleh EcoTrack. EcoTrack tidak memiliki kendali atas, dan tidak bertanggung jawab atas, konten, kebijakan privasi, atau praktik situs web atau layanan pihak ketiga mana pun.
            </p>

            <h2>5. Penghentian</h2>
            <p>
              Kami dapat menghentikan atau menangguhkan akun Anda segera, tanpa pemberitahuan atau kewajiban sebelumnya, dengan alasan apa pun, termasuk namun tidak terbatas pada jika Anda melanggar Syarat.
            </p>

            <h2>6. Batasan Tanggung Jawab</h2>
            <p>
              Dalam keadaan apa pun EcoTrack, maupun direktur, karyawan, mitra, agen, pemasok, atau afiliasinya, tidak akan bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, konsekuensial, atau hukuman, termasuk tanpa batasan, hilangnya keuntungan, data, penggunaan, goodwill, atau kerugian tidak berwujud lainnya.
            </p>

            <h2>7. Perubahan</h2>
            <p>
              Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Syarat ini kapan saja. Jika revisi tersebut material, kami akan mencoba memberikan pemberitahuan setidaknya 30 hari sebelum syarat baru berlaku.
            </p>

            <h2>8. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Syarat ini, silakan hubungi kami di <a href="mailto:legal@ecotrack.id">legal@ecotrack.id</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
