# LMS UMM — Quiz Clarity

> **Prototipe Web Responsif Mobile-First: Perbaikan Kejelasan Informasi & Status Kuis LMS UMM**  
> Mata Kuliah: **Rekayasa Interaksi** (Worksheet 08 — *From Insight to Requirement*)  
> Persona Pengguna: **Rian Pratama** (Mahasiswa Semester 4, 20 tahun)  
> Dosen Pengampu Contoh: **Dr. Ir. Wahyudi, M.T.** (Mata Kuliah: Desain Perangkat Lunak A)

---

## 1. Ringkasan Proyek

Berdasarkan dokumen `PRD_QuizClarity_LMS_UMM_v1.0.md`, proyek ini merekayasa ulang antarmuka detail kuis LMS UMM agar:
1. Status dan syarat akses kuis dapat dipahami dalam waktu **≤ 5 detik** tanpa menimbulkan kebingungan.
2. Seluruh informasi kritis (**Blok B1 s.d. B5**) terlihat **tanpa scroll pada layar smartphone 360×640 px** (prioritas utama mobile-first, sekunder desktop).
3. Kolom password ditempatkan **inline** di dekat tombol aksi (CTA) tanpa mengekspos password secara terbuka.
4. Menampilkan alasan kegagalan yang jelas dengan zona waktu **WIB** eksplisit serta langkah lanjutan yang dapat diklik (*Hubungi Dosen* & *Kembali ke Mata Kuliah*).
5. Badge status di Dashboard dan halaman mata kuliah sinkron dengan halaman detail kuis (*single source of truth*).

---

## 2. Cara Menjalankan Aplikasi

Pastikan Node.js (versi 18+) dan npm telah terpasang di komputer Anda.

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Development Server
```bash
npm run dev
```
Buka browser pada alamat yang ditampilkan: `http://localhost:5173/`

### Menjalankan Pengujian Otomatis (Vitest)
```bash
npm test
```

### Build Produksi
```bash
npm run build
```

---

## 3. Matriks 9 Layar / Keadaan (S1 s.d. S9)

Aplikasi ini mengimplementasikan 9 layar/state sesuai Lampiran A dan Bagian 12 PRD:

| ID Layar | State | Token Semantik | Deskripsi & Komponen Kunci |
| :--- | :--- | :--- | :--- |
| **S1** | Detail Kuis — Terbuka | `status/open` | Banner hijau, ikon centang, hitung mundur menuju penutupan ("TERBUKA — ditutup dalam 02:14:33"), CTA aktif "Mulai Mengerjakan". |
| **S2** | Detail Kuis — Perlu Password | `status/password-required` | Banner hijau dengan badge "PERLU PASSWORD", kolom password inline (B4) + tautan "Lihat pengumuman dosen", validasi password instan. |
| **S3** | Detail Kuis — Segera Ditutup | `status/closing-soon` | Banner kuning/amber, ikon jam pasir, hitung mundur ≤ 60 menit. Dilengkapi **peringatan dini**: *"Sisa waktu lebih singkat daripada durasi pengerjaan. Anda mungkin tidak dapat menyelesaikan kuis."* jika sisa waktu < durasi pengerjaan. |
| **S4** | Detail Kuis — Ditutup | `status/closed` | Banner merah, ikon gembok, tanggal penutupan lengkap WIB ("DITUTUP sejak Kamis, 18 Juni 2026 · 15.30 WIB"), tombol CTA nonaktif + alasan penutupan + tombol *"Hubungi Dosen"* (lengkap dengan template pesan WhatsApp) & *"Kembali ke Mata Kuliah"*. |
| **S5** | Detail Kuis — Kesempatan Habis | `status/no-attempt` | Banner netral/slate, ikon silang lingkaran ("KESEMPATAN HABIS — 1 dari 1 digunakan"), CTA nonaktif dengan teks ramah pengguna + tombol lihat nilai & hubungi dosen. |
| **S6** | Detail Kuis — Belum Dibuka | `status/not-open-yet` | Banner biru, ikon jam ("BELUM DIBUKA — Mulai Selasa, 24 November 2026 · 11.00 WIB"), hitung mundur waktu pembukaan, CTA *"Belum Dapat Dikerjakan"*. |
| **S7** | Dashboard / Halaman Mata Kuliah | `mixed` | Menampilkan mata kuliah *Desain Perangkat Lunak A*, daftar seluruh kuis dengan badge status yang konsisten (*single source of truth*), filter status kuis, dan penanda waktu pembaruan (*"Status per 11.02 WIB"*). |
| **S8** | Detail Kuis — Gagal Memuat / Offline | `status/unknown` | Banner abu-abu ("Status belum dapat dimuat"), pesan kendala jaringan, tombol *"Coba Muat Ulang"* dengan animasi *skeleton loading* realistis. |
| **S9** | Modal Konfirmasi Pra-Mulai | Modal Overlay | Modal konfirmasi sebelum timer berjalan: *"Anda akan memulai kuis. Waktu pengerjaan 12 menit dan hanya tersedia 1 kesempatan. Waktu mulai berjalan setelah Anda menekan 'Ya, Mulai'. Pastikan koneksi stabil."* Tombol *"Ya, Mulai"* dan *"Batal"*. |

---

## 4. Kredensial & Password Kuis untuk Pengujian

| Kuis / Skenario | Password Kuis | Keterangan Uji |
| :--- | :--- | :--- |
| **Quiz 1 MK DPL — Validasi & Verifikasi (S2)** | `DPL2026UMM` | Ketik password salah untuk menguji pesan error spesifik, atau klik tautan *"Lihat pengumuman dosen"* untuk menyalin password resmi. |
| **Quiz 1 MK DPL (Susulan) (S4)** | `SUSULANDPL26` | Kuis ini telah ditutup pada jadwal resmi (Kamis, 18 Juni 2026 pukul 15.30 WIB). |
| **Persona Mahasiswa** | Rian Pratama (NIM: `202410370311234`) | Mahasiswa Semester 4 Teknik Informatika UMM. |
| **Dosen Pengampu** | Dr. Ir. Wahyudi, M.T. (`0812-3456-7890`) | Kontak WhatsApp & template izin susulan otomatis tersedia. |

---

## 5. Fitur Unggulan & Panel Simulator Interaktif

Aplikasi ini menyertakan panel mengambang (**"Simulator Pengujian PRD"**) di pojok kanan bawah yang dapat dibuka/tutup kapan saja:
1. **Mode Simulasi Viewport:**
   - **HP (360×640 px):** Membungkus UI ke dalam bezel smartphone asli berukuran tepat 360×640 px untuk memverifikasi secara langsung bahwa **Blok B1 s.d. B5 terlihat tanpa scroll** (UXR-04).
   - **Desktop Responsif:** Menguji tampilan fleksibel di layar lebar / desktop.
2. **Pilihan Cepat 8 State (S1 s.d. S8):**
   - Satu klik untuk langsung berpindah ke state kuis yang diinginkan.
3. **Simulasi Waktu Server (WIB):**
   - Tombol **-1 Jam**, **+10 Menit**, **+1 Jam**, dan tombol **Jeda/Jalankan Waktu**.
   - Perubahan status kuis (misal dari *Terbuka* ke *Segera Ditutup* atau ke *Ditutup*) berjalan secara **otomatis tanpa refresh halaman** (FR-01).
4. **Simulasi Offline / Gangguan Jaringan (S8):**
   - Menguji tampilan kegagalan jaringan dan tombol pemulihan *"Coba Muat Ulang"*.
5. **FR-08: Riwayat Akses Kuis (Access Audit Trail):**
   - Klik tombol **"Riwayat (FR-08)"** di navbar atas untuk melihat catatan log akses server (waktu WIB, status kuis, IP address, user agent).
   - Dilengkapi tombol **"Salin Bukti Resmi Dosen"** untuk menghasilkan teks bukti akses sah tanpa perlu screenshot manual.
6. **Simulasi Pengerjaan Kuis (Post S9):**
   - Setelah menekan *"Ya, Mulai"* pada modal S9, pengguna diarahkan ke simulasi pengerjaan kuis interaktif dengan timer 12 menit yang berjalan mundur, butir soal seputar Rekayasa Interaksi, dan formulir pengumpulan jawaban yang langsung mencatat nilai dan memperbarui state ke S5 (*Kesempatan Habis*).

---

## 6. Kepatuhan Aksesibilitas & Standar PRD

- **Dual-Encoding (UXR-01):** Setiap status dikodekan menggunakan kombinasi **warna + ikon SVG + label teks** dengan ukuran minimal 14 px di mobile, aman bagi pengguna buta warna.
- **Rasio Kontras (UXR-04):** Seluruh elemen teks memenuhi rasio kontras WCAG AA (≥ 4.5:1).
- **Target Sentuh (UXR-04):** Seluruh tombol dan area klik berukuran minimal **44×44 px**.
- **Spesifikasi Microcopy (Bagian 14):** Seluruh bahasa menggunakan Bahasa Indonesia awam dan netral tanpa menyalahkan pengguna, serta tanpa teks teknis bahasa Inggris Moodle bawaan (*"This quiz closed"*).
