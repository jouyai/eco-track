# EcoTrack - Pelacak Dampak Lingkungan

EcoTrack adalah aplikasi web yang membantu pengguna memahami dan mengurangi jejak karbon mereka. Aplikasi ini memungkinkan pengguna untuk mencatat aktivitas harian (transportasi, energi, gaya hidup), melihat dampak lingkungan mereka secara real-time, dan berpartisipasi dalam komunitas untuk masa depan yang lebih hijau.

## Fitur Utama

- **Pelacakan Aktivitas**: Catat aktivitas harian seperti perjalanan kendaraan, penggunaan listrik, dan daur ulang.
- **Dashboard Interaktif**: Visualisasikan dampak lingkungan Anda dengan grafik dan statistik real-time.
- **Analisis Dampak**: Lihat estimasi jejak karbon (CO2e) dari setiap aktivitas.
- **Gamifikasi**: Dapatkan poin untuk aktivitas ramah lingkungan dan pantau peringkat Anda di papan peringkat komunitas.
- **Riwayat Aktivitas**: Kelola dan tinjau riwayat aktivitas Anda.
- **Desain Responsif**: Antarmuka pengguna yang modern dan ramah seluler.

## Teknologi yang Digunakan

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/) (via Prisma ORM)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Visualisasi Data**: [Recharts](https://recharts.org/)
- **Autentikasi**: [NextAuth.js](https://next-auth.js.org/)
- **Form Handling**: React Hook Form & Zod

## Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di komputer lokal Anda:

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- npm, yarn, pnpm, atau bun

### Instalasi

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/jouyai/eco-track.git
    cd eco-track
    ```

2.  **Instal dependensi:**

    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

3.  **Setup Database:**

    Aplikasi ini menggunakan Prisma dengan SQLite. Jalankan migrasi untuk membuat database lokal:

    ```bash
    npx prisma migrate dev
    ```

4.  **Jalankan server pengembangan:**

    ```bash
    npm run dev
    # atau
    yarn dev
    # atau
    pnpm dev
    ```

5.  **Buka aplikasi:**

    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Folder

- `app/`: Halaman dan layout aplikasi (App Router).
- `components/`: Komponen UI yang dapat digunakan kembali.
- `lib/`: Utilitas, konfigurasi, dan server actions.
- `prisma/`: Skema database dan migrasi.
- `public/`: Aset statis.

## Lisensi

[MIT](LICENSE)
