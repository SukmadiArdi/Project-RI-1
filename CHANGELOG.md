# Changelog

Semua perubahan penting pada proyek **Quiz Clarity — LMS UMM** dicatat dalam dokumen ini.

Format changelog ini mengacu pada prinsip [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan mematuhi [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-23

### Milestone: Worksheet Pertemuan 08 — *From Insight to Requirement*
**Rantai Dokumen:** WS01 → WS02 → WS03 → WS04 → WS05 → WS06 → WS07 → **WS08 (PRD_QuizClarity_LMS_UMM_v1.0.md)**  
**Target Pengguna:** Persona **Rian Pratama** (Mahasiswa Semester 4, 20 tahun, mobile browser Chrome Android)  
**Mata Kuliah Acuan:** Desain Perangkat Lunak A (`TIF-3201`) — Dosen Pengampu: **Dr. Ir. Wahyudi, M.T.**

---

### Ditambahkan (Added)
- **Implementasi 9 Layar / Keadaan Kuis (S1 s.d. S9):**
  - **S1 (Terbuka - `status/open`):** Banner hijau (*emerald*) dengan hitung mundur penutupan real-time dan tombol CTA aktif *"Mulai Mengerjakan"*.
  - **S2 (Perlu Password - `status/password-required`):** Kolom input password inline tepat di atas CTA, toggle intip password, tautan modal *"Lihat pengumuman dosen"*, serta validasi password dengan pesan error spesifik jika salah.
  - **S3 (Segera Ditutup - `status/closing-soon`):** Banner peringatan kuning/amber untuk sisa waktu ≤ 60 menit, dilengkapi peringatan dini otomatis bila sisa waktu lebih singkat daripada durasi pengerjaan.
  - **S4 (Ditutup - `status/closed`):** Banner merah (*rose*) dengan tanggal penutupan eksplisit WIB, CTA nonaktif disertai alasan penutupan, serta dua tombol aksi lanjutan: *"Hubungi Dosen"* (modal kontak WhatsApp otomatis) dan *"Kembali ke Mata Kuliah"*.
  - **S5 (Kesempatan Habis - `status/no-attempt`):** Banner netral/slate untuk kuis yang telah digunakan kesempatannya (1 dari 1 kali), lengkap dengan rekapan skor dan opsi hubungi dosen.
  - **S6 (Belum Dibuka - `status/not-open-yet`):** Banner biru (*blue*) dengan hitung mundur menuju waktu pembukaan resmi dan CTA dinonaktifkan *"Belum Dapat Dikerjakan"*.
  - **S7 (Dashboard & Halaman Mata Kuliah):** Tampilan daftar mata kuliah dan kuis dengan badge status yang konsisten (*single source of truth*) serta keterangan waktu pembaruan (*"Status per ... WIB"*).
  - **S8 (Gagal Memuat / Offline - `status/unknown`):** Penanganan ketahanan jaringan dengan banner netral, pesan edukatif, dan tombol *"Coba Muat Ulang"* yang memicu animasi *skeleton loading*.
  - **S9 (Modal Konfirmasi Pra-Mulai):** Dialog konfirmasi sebelum waktu berjalan yang menampilkan durasi dan sisa kesempatan, dengan tombol *"Ya, Mulai"* dan *"Batal"*.

- **Arsitektur Informasi & Tata Letak Mobile-First (Bagian 8 PRD):**
  - Penyusunan blok halaman berurutan ketat:
    - **B1**: Breadcrumb (maks. 2 level di mobile) + Judul Kuis & Kode MK.
    - **B2**: Banner Status sticky saat scroll.
    - **B3**: Kartu Informasi Penting (grid 2 kolom di mobile 360 px, 4 kolom di desktop).
    - **B4**: Blok Password Inline kondisional.
    - **B5**: CTA Utama sticky bottom di mobile.
    - **B6**: Instruksi Dosen Lengkap (*collapsible*, default tertutup).
    - **B7**: Bantuan & Navigasi (*Hubungi Dosen* & *Kembali ke MK*).
  - Verifikasi bahwa seluruh blok **B1 s.d. B5 terlihat tanpa scroll pada viewport 360×640 px** (UXR-04).
  - Transformasi sidebar navigasi mata kuliah menjadi *slide-over drawer* dengan *backdrop blur* pada layar `< 768 px`.

- **FR-08: Riwayat Akses Kuis (Access Audit Trail):**
  - Pencatatan log akses kuis mahasiswa secara otomatis (waktu server WIB, status kuis, IP address, user agent perangkat) sebagai solusi atas masalah kepanikan mahasiswa (responden U1 & U5) yang sering mengambil screenshot manual.
  - Fitur ekspor/salin bukti riwayat akses resmi (*Proof of Access Slip*) yang siap ditunjukkan kepada dosen pengampu.

- **Mesin Simulasi Waktu Server & Pengerjaan Kuis:**
  - Simulasi waktu server tersentralisasi dengan penanda zona **WIB** eksplisit di seluruh komponen waktu.
  - Transisi status otomatis secara real-time tanpa perlu me-refresh halaman saat waktu buka/tutup terlewati.
  - Simulasi pengerjaan kuis interaktif (Post-S9) dengan countdown 12 menit dan auto-grading ke state S5.

- **Panel Simulator Pengujian PRD:**
  - Panel floating interaktif untuk pengujian:
    - Pemilih mode viewport: **HP (360×640 px)** dengan frame bezel smartphone vs **Desktop Responsif**.
    - Tombol preset cepat untuk 8 state (S1 s.d. S8).
    - Kontrol waktu server: `-1 Jam`, `+10 Menit`, `+1 Jam`, serta tombol jeda/putar waktu.
    - Toggle simulasi jaringan offline untuk menguji S8.
    - Tombol reset kesempatan pengerjaan (*Reset Attempt*).

- **Aksesibilitas & Microcopy (WCAG AA Compliant):**
  - Penerapan *Dual-Encoding* (UXR-01): Setiap status wajib memiliki perpaduan warna semantik, ikon SVG, dan label teks (ukuran font ≥ 14 px di mobile).
  - Rasio kontras teks terhadap latar belakang ≥ 4.5:1 (WCAG AA).
  - Area target sentuh seluruh tombol dan input minimal 44×44 px (UXR-04).
  - Penerapan 100% microcopy Bahasa Indonesia sesuai Bagian 14 PRD tanpa teks teknis bahasa Inggris Moodle (*"This quiz closed"*).

- **Suite Pengujian Otomatis (Vitest):**
  - 15 pengujian unit & integrasi mencakup evaluasi status, kesesuaian microcopy, render komponen, alur password, dan transisi time-travel.

---

### Keamanan & Integritas Akademik
- Sesuai dengan **Bagian 15 PRD (*Need vs Want*)**, password kuis tidak pernah ditampilkan secara terbuka pada antarmuka detail kuis guna menjaga integritas penilaian akademik dosen.
