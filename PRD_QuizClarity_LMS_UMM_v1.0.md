---
title: "PRD — Quiz Clarity: Perbaikan Kejelasan Informasi & Status Kuis LMS UMM"
product: "LMS UMM (lms.umm.ac.id)"
version: "1.0"
status: "Draft for Review"
author: "Achmad Ardi Sukmadi"
date: "2026-11-22"
course: "Rekayasa Interaksi"
milestone: "Worksheet Pertemuan 08 — From Insight to Requirement"
research_method: "Questionnaire (Google Form, open-ended)"
respondents: 5
---

# PRD — Quiz Clarity
### Perbaikan Kejelasan Informasi & Status pada Halaman Kuis LMS UMM

| Item | Keterangan |
| :--- | :--- |
| Nama Fitur | Quiz Clarity |
| Produk | LMS UMM (lms.umm.ac.id), berbasis Moodle |
| Platform Target | Web responsif — prioritas mobile browser (Chrome Android), sekunder desktop |
| Penyusun | Achmad Ardi Sukmadi |
| Versi / Status | v1.0 — Draft for Review |
| Tanggal | 22 November 2026 |
| Sumber Riset | Kuesioner terbuka, 5 responden mahasiswa UMM (16 Oktober 2026) |
| Rantai Dokumen | WS01 → WS02 → WS03 → WS04 → WS05 → WS06 → WS07 → **WS08 (dokumen ini)** |

---

## 1. Ringkasan Eksekutif

Halaman detail kuis LMS UMM menampilkan informasi paling menentukan (status akses, batas waktu, durasi pengerjaan, dan kebutuhan password) sebagai teks kecil di bagian bawah paragraf instruksi, tanpa penanda visual dan tanpa hierarki informasi. Akibatnya mahasiswa baru mengetahui bahwa kuis tidak dapat diakses **setelah** menekan tombol "Attempt", bukan sebelumnya.

**Quiz Clarity** merancang ulang halaman detail kuis agar status dan syarat akses dapat dipahami dalam ≤ 5 detik, terbaca tanpa scroll pada layar smartphone, dan selalu disertai langkah lanjutan ketika akses ditolak.

**Temuan kunci riset:** 5 dari 5 responden (100%) pernah mengira kuis masih dapat diakses padahal sudah ditutup atau meminta password. 3 dari 5 responden melakukan workaround manual (screenshot, chat/email dosen, komplain forum) untuk mengklarifikasi status.

---

## 2. Latar Belakang & Bukti Riset

### 2.1 Kondisi Saat Ini (Current State)

Berdasarkan pengamatan langsung (WS01) pada halaman `Quiz 1 MK DPL` dan `Quiz 1 MK DPL (susulan)`:

- Status kuis ("This quiz closed on Thursday, 18 June 2026, 3:30 PM") ditampilkan sebagai teks polos, rata tengah, tanpa warna/ikon.
- Persyaratan password ("To attempt this quiz you need to know the quiz password") berada di baris terpisah, tanpa kolom input di dekatnya.
- Batas waktu pengerjaan ("Time limit: 12 mins") dan jumlah kesempatan ("Attempts allowed: 1") tidak dibedakan secara visual dari teks deskriptif lain.
- Seluruh informasi kritis menggunakan Bahasa Inggris, sementara instruksi dosen menggunakan Bahasa Indonesia.
- Pada layar smartphone, sidebar daftar mata kuliah mempersempit area konten dan tombol berukuran kecil.

### 2.2 Bukti Kualitatif (Kutipan Asli Responden)

| ID | Kutipan Langsung | Sumber |
| :--- | :--- | :--- |
| Q1 | "Panik lah, apalagi kalau nilainya besar. Langsung cari bukti screenshot jadwal dan hubungi dosen secepatnya." | U1 — Arvin |
| Q2 | "Password kuis jangan disembunyikan di deskripsi panjang. Taruh aja di sebelah tombol 'Attempt Quiz' biar gak nyari-nyari." | U2 — Bukhary |
| Q3 | "Frustrasi banget si, apalagi kalau jaringan HP lagi lemot. Yaudah akhirnya gak jadi ngerjain kalau udah telat dikit." | U3 — Aswin |
| Q4 | "Emosi, karena sistemnya misleading (menyesatkan). Merasa buang waktu." | U4 — Luqman |
| Q5 | "Cemas banget, takut dikira males ngerjain. Langsung email dosen buat ngirim bukti screenshot kalau saya udah buka di jam yang benar." | U5 — Rizky |

### 2.3 Research Insight (Ringkasan WS05–WS07)

| ID | Insight | Responden |
| :--- | :--- | :--- |
| I-1 | Status kuis baru diketahui setelah menekan tombol "Attempt", bukan sebelumnya. | U1, U2, U3, U4, U5 |
| I-2 | Status di Dashboard terlihat open, tetapi di dalam mata kuliah closed; user merasa "dijebak" sistem. | U4 |
| I-3 | Password tersembunyi di paragraf instruksi panjang; user scroll naik atau bertanya di grup kelas. | U2 |
| I-4 | Pengguna mobile tidak menyadari kuis sudah lewat waktu karena tombol kecil, konten terpotong, sidebar menutupi layar. | U3 |
| I-5 | Saat gagal akses, user panik lalu mengambil screenshot dan menghubungi dosen untuk membuktikan bukan karena lalai. | U1, U5 |
| I-6 | Tidak ada peringatan dini menjelang penutupan; user mengandalkan alarm/Notes pribadi. | U1, U4, U5 |

**Pergeseran pemahaman:** masalah utama bukan "mahasiswa kurang teliti membaca", melainkan **informasi kritis tidak ditempatkan pada titik keputusan** dan **tidak konsisten antar halaman**. Dampaknya bersifat emosional (panik, cemas, merasa dituduh lalai), bukan sekadar efisiensi.

---

## 3. Problem Statement & Design Challenge

**Problem Statement**
> Mahasiswa UMM membutuhkan informasi status dan syarat akses kuis yang jelas dan menonjol secara visual, karena mereka baru mengetahui kuis tidak dapat diakses setelah menekan tombol mulai, sehingga mengalami kepanikan, kehilangan kesempatan mengerjakan, dan membuang waktu untuk klarifikasi manual ke dosen.

**Design Challenge (terpilih di WS02)**
> *How might we* merancang ulang hierarki visual informasi pada halaman detail kuis *so that* status kritis (batas waktu, penutupan, dan password) langsung menonjol dan mencegah mahasiswa melewatkan kesempatan atau mengalami kebingungan saat mengakses kuis?

**Moment of Truth (WS07)**
Tahap **During** — saat mahasiswa selesai mencari password di layar HP yang kecil, menekan "Attempt Quiz", lalu mendapati pesan "This quiz closed".

---

## 4. Goals & Non-Goals

### 4.1 Goals

| ID | Goal |
| :--- | :--- |
| G1 | Mahasiswa dapat memastikan status kuis dalam ≤ 5 detik sejak halaman terbuka. |
| G2 | Seluruh informasi kritis terbaca tanpa scroll pada layar smartphone (360×640 px). |
| G3 | Menghilangkan kebutuhan mencari password di lokasi terpisah. |
| G4 | Menyediakan alasan dan langkah lanjutan yang jelas saat akses ditolak. |
| G5 | Menyamakan status kuis antar halaman (Dashboard ↔ mata kuliah ↔ detail kuis). |

### 4.2 Non-Goals

- Tidak mengubah mesin pengerjaan dan penilaian kuis Moodle.
- Tidak mendesain ulang halaman Login, Dashboard keseluruhan, atau fitur unggah tugas (masalah lain pada WS01).
- Tidak membangun aplikasi mobile native.
- **Tidak menampilkan password kuis secara terbuka** (lihat Bagian 13).
- Tidak mengubah kebijakan akademik terkait jadwal, kesempatan, atau izin susulan.

---

## 5. Persona & Skenario

### 5.1 Persona Utama (WS06)

**Rian Pratama** — 20 tahun, mahasiswa UMM semester 4.

- Mengakses LMS hampir tiap hari melalui browser HP; laptop hanya untuk pengumpulan akhir.
- Cenderung memeriksa LMS mendekati tenggat; sensitif terhadap status yang tidak jelas.
- Mengandalkan grup WhatsApp kelas untuk konfirmasi informasi yang ambigu.
- Goals: menyelesaikan kuis tepat waktu; memperoleh informasi syarat akses secara instan.

### 5.2 Skenario Utama (Happy Path)

Rian membuka LMS di HP 40 menit sebelum kuis ditutup → melihat banner "SEGERA DITUTUP — sisa 00:39:12" → membaca kartu info (durasi 12 menit, 1 kesempatan) → mengisi password pada kolom inline → menekan "Mulai Mengerjakan" → modal konfirmasi ringkas → masuk pengerjaan.

### 5.3 Skenario Alternatif (Failure Path)

Rian membuka kuis yang sudah ditutup → banner merah "DITUTUP sejak Kamis, 18 Juni 2026 · 15.30 WIB" → tombol utama nonaktif disertai alasan → membaca penjelasan singkat → menekan "Hubungi Dosen" untuk menanyakan izin susulan.

### 5.4 Skenario Jaringan Lemah

Rian membuka kuis dengan koneksi tidak stabil → banner netral "Status belum dapat dimuat" (bukan status kosong) → tombol "Coba muat ulang" → status tampil setelah data berhasil diambil.

---

## 6. Metrik Keberhasilan

> Seluruh angka di bawah adalah **target**, bukan hasil pengukuran. Validasi dilakukan pada Usability Testing (WS13).

| ID | Metrik | Baseline (kondisi sekarang) | Target |
| :--- | :--- | :--- | :--- |
| M1 | Ketepatan menyebut status kuis dalam ≤ 5 detik | 5/5 responden pernah salah menduga status | ≥ 90% partisipan UT benar |
| M2 | Waktu dari halaman terbuka → keputusan (mulai / paham tidak bisa) | Belum terukur | ≤ 10 detik |
| M3 | Info kritis terlihat tanpa scroll (360×640 px) | Tidak (perlu scroll, terpotong sidebar) | 100% terlihat |
| M4 | Jumlah klik untuk menemukan syarat password | ≥ 2 (scroll / cari pengumuman / tanya teman) | 0 klik |
| M5 | Skor SUS prototype | — | ≥ 75 |
| M6 | Kebutuhan klarifikasi manual ke dosen setelah gagal akses | 3/5 responden melakukan | ≤ 1/5 partisipan UT |

---

## 7. Cakupan Rilis (MoSCoW)

| Prioritas | Item |
| :--- | :--- |
| **Must have (MVP)** | FR-01, FR-03, FR-04, FR-05 · UXR-01, UXR-03, UXR-04, UXR-05, UXR-06 |
| **Should have** | FR-02 (badge Dashboard), FR-06 (countdown & ambang batas), FR-07 (modal konfirmasi) · UXR-02, UXR-07, UXR-08 |
| **Could have** | FR-08 (riwayat akses), notifikasi H-30 menit |
| **Won't have (rilis ini)** | Menampilkan password otomatis, aplikasi native, perombakan Dashboard total |

---

## 8. Arsitektur Informasi Halaman (Acuan WS09 & WS12)

Urutan blok wajib pada halaman detail kuis (mobile-first):

| Blok | Isi | Perilaku | Requirement |
| :--- | :--- | :--- | :--- |
| B1 | Breadcrumb + Judul kuis | Statis; breadcrumb maksimal 2 level di mobile | FR-04 |
| B2 | **Banner Status** (warna + ikon + label + waktu/countdown) | Selalu di atas; sticky saat scroll | FR-01, FR-06, UXR-01 |
| B3 | **Kartu Informasi Penting** — Batas Waktu · Durasi · Sisa Kesempatan · Jumlah Soal | Grid 2 kolom (mobile), 4 kolom (desktop) | FR-04, UXR-04 |
| B4 | **Blok Password** (kondisional) | Input inline + tautan pengumuman dosen | FR-03, UXR-03 |
| B5 | **CTA utama** | Aktif/nonaktif sesuai state; sticky bottom di mobile | FR-01, FR-05 |
| B6 | Instruksi dosen lengkap | Collapsible, default tertutup | FR-04 |
| B7 | Bantuan — Hubungi Dosen · Kembali ke Mata Kuliah | Selalu tersedia | FR-05 |
| — | Sidebar daftar mata kuliah | Menjadi drawer di < 768 px | UXR-04 |

---

## 9. Functional Requirements

### FR-01 — Penentuan & Penampilan Status Kuis
- **Prioritas:** Must have
- **Sumber:** I-1 (U1, U4, U5)
- **Deskripsi:** Sistem menentukan status kuis berdasarkan **waktu server** (bukan waktu perangkat) dan menampilkannya pada halaman detail dalam 4 kondisi dasar: Belum Dibuka / Terbuka / Perlu Password / Ditutup, ditambah kondisi turunan (Segera Ditutup, Kesempatan Habis).
- **Acceptance Criteria**
  - *Given* kuis memiliki waktu tutup, *when* waktu server melewati batas tersebut, *then* banner dan CTA berubah otomatis tanpa refresh manual.
  - *Given* perangkat memiliki jam yang salah, *when* halaman dibuka, *then* status tetap mengikuti waktu server.
  - *Given* status Ditutup, *then* CTA nonaktif dan alasan ditampilkan tepat di bawahnya.
- **Requirement terkait:** UXR-01, UXR-06, UXR-07

### FR-02 — Konsistensi Status Antar Halaman
- **Prioritas:** Should have
- **Sumber:** I-2 (U4)
- **Deskripsi:** Badge status pada kartu kuis di Dashboard dan halaman mata kuliah menggunakan sumber data dan waktu yang sama dengan halaman detail (single source of truth).
- **Acceptance Criteria**
  - *Given* kuis berstatus Ditutup, *when* user melihat Dashboard, halaman mata kuliah, dan halaman detail, *then* ketiganya menampilkan label dan warna identik.
  - *Given* badge ditampilkan, *then* terdapat keterangan waktu pembaruan (contoh: "Status per 11.02 WIB").
- **Requirement terkait:** UXR-02

### FR-03 — Kolom Password Inline
- **Prioritas:** Must have
- **Sumber:** I-3 (U2)
- **Deskripsi:** Bila kuis diproteksi password, sistem menampilkan kolom input password tepat di atas CTA, disertai tautan "Lihat pengumuman dosen". Password **tidak** ditampilkan sebagai teks.
- **Acceptance Criteria**
  - *Given* kuis memerlukan password, *when* halaman dibuka di layar 360 px, *then* kolom password dan CTA berada dalam satu area pandang tanpa scroll tambahan.
  - *Given* password salah, *when* user menekan CTA, *then* muncul pesan spesifik dan user dapat mencoba lagi tanpa kehilangan isian lain.
  - *Given* password benar, *then* CTA aktif dan alur berlanjut ke FR-07.
- **Requirement terkait:** UXR-03, UXR-05

### FR-04 — Susun Ulang Hierarki Halaman
- **Prioritas:** Must have
- **Sumber:** I-4 (U3)
- **Deskripsi:** Halaman disusun mengikuti urutan blok B1–B7 pada Bagian 8; sidebar menjadi drawer pada layar < 768 px.
- **Acceptance Criteria**
  - *Given* viewport 360×640 px, *when* halaman terbuka, *then* blok B1–B5 terlihat tanpa scroll.
  - *Given* layar mobile, *then* tidak ada elemen sidebar yang menutupi konten utama.
- **Requirement terkait:** UXR-04

### FR-05 — Halaman Keadaan Gagal Akses
- **Prioritas:** Must have
- **Sumber:** I-5 (U1, U5)
- **Deskripsi:** Saat akses ditolak, sistem menampilkan alasan, waktu penutupan eksplisit (hari, tanggal, jam, WIB), serta tombol "Hubungi Dosen" dan "Kembali ke Mata Kuliah".
- **Acceptance Criteria**
  - *Given* kuis ditutup, *then* pesan memuat waktu penutupan lengkap dengan zona WIB.
  - *Given* kondisi gagal apa pun, *then* tersedia minimal satu tindakan lanjutan yang dapat diklik.
  - *Given* pesan ditampilkan, *then* tidak ada teks Bahasa Inggris teknis seperti "This quiz closed".
- **Requirement terkait:** UXR-05, UXR-06

### FR-06 — Countdown & Ambang Batas Penutupan
- **Prioritas:** Should have
- **Sumber:** I-6 (U1, U5)
- **Deskripsi:** Countdown waktu tersisa untuk kuis terbuka, dan penanda "Segera Ditutup" bila sisa waktu ≤ 60 menit.
- **Acceptance Criteria**
  - *Given* sisa waktu ≤ 60 menit, *then* banner berubah warna dan label menjadi "SEGERA DITUTUP".
  - *Given* countdown berjalan, *then* zona waktu WIB tercantum dan pembaruan terjadi otomatis.
  - *Given* sisa waktu < durasi pengerjaan, *then* muncul peringatan bahwa waktu tidak cukup untuk menyelesaikan kuis.
- **Requirement terkait:** UXR-01, UXR-06

### FR-07 — Modal Konfirmasi Pra-Mulai
- **Prioritas:** Should have
- **Sumber:** I-1, I-6 (U5)
- **Deskripsi:** Sebelum soal pertama, tampil modal ringkas berisi durasi, jumlah soal, dan sisa kesempatan.
- **Acceptance Criteria**
  - *Given* user menekan CTA, *then* modal muncul sebelum timer berjalan.
  - *Given* user menekan "Batal", *then* kesempatan tidak berkurang dan user kembali ke halaman detail.
- **Requirement terkait:** UXR-05

### FR-08 — Riwayat Akses Kuis
- **Prioritas:** Could have
- **Sumber:** I-5 (U1, U5)
- **Deskripsi:** Mahasiswa dapat melihat catatan waktu akses kuis beserta status saat itu, sebagai pengganti screenshot manual.
- **Acceptance Criteria**
  - *Given* user pernah membuka kuis, *then* tercatat waktu akses dan status saat itu.
  - *Given* user gagal mengakses, *then* catatan tersebut dapat ditunjukkan kepada dosen tanpa screenshot.
- **Catatan:** memerlukan konfirmasi kebijakan privasi kampus (lihat Bagian 16).

---

## 10. UX & Non-Functional Requirements

| ID | Kebutuhan | Kriteria Terukur | Prioritas |
| :--- | :--- | :--- | :--- |
| UXR-01 | Status dikodekan ganda (warna + ikon + teks) | Dapat dipahami pada simulasi grayscale / buta warna | Must |
| UXR-02 | Konsistensi label & warna antar halaman | Satu set design token status dipakai di semua layar | Should |
| UXR-03 | Kedekatan informasi dengan aksi (proximity) | Blok password dan CTA dalam satu area pandang | Must |
| UXR-04 | Responsif & aksesibel | Info kritis tanpa scroll pada 360×640; target sentuh ≥ 44×44 px; kontras ≥ 4.5:1 (WCAG AA) | Must |
| UXR-05 | Bahasa & nada | Bahasa Indonesia awam, netral, tidak menyalahkan pengguna | Must |
| UXR-06 | Kejelasan waktu | Format "Kamis, 18 Juni 2026 · 15.30 WIB"; zona waktu selalu disebut | Must |
| UXR-07 | Kecepatan | Banner status tampil ≤ 2 detik; skeleton loading bila data belum siap | Should |
| UXR-08 | Ketahanan jaringan lemah | Gagal memuat menampilkan "Status belum dapat dimuat — Coba muat ulang", bukan status kosong | Should |

---

## 11. User Stories & Acceptance Criteria

### US-01
**As a** mahasiswa pengguna LMS UMM, **I want to** melihat status kuis sebelum menekan tombol mulai, **so that** saya tidak membuang waktu mencoba mengakses kuis yang sudah tidak tersedia.
- AC1: Status terlihat di area atas layar tanpa scroll.
- AC2: Status memuat label teks, bukan hanya warna.
- AC3: CTA nonaktif otomatis bila kuis tidak dapat dikerjakan.
- Requirement: FR-01 · UXR-01, UXR-04 · Layar: S1–S6

### US-02
**As a** mahasiswa pengguna LMS UMM, **I want to** melihat batas waktu, durasi, dan sisa kesempatan dalam satu kartu ringkas, **so that** saya bisa langsung memutuskan mengerjakan sekarang atau menyiapkan diri dulu.
- AC1: Empat label info tampil dalam satu kartu di atas CTA.
- AC2: Semua waktu menyebut WIB.
- Requirement: FR-04 · UXR-04, UXR-06 · Layar: S1–S4

### US-03
**As a** mahasiswa pengguna LMS UMM, **I want to** mengisi password pada kolom di dekat tombol "Mulai Mengerjakan", **so that** saya tidak perlu mencari password di deskripsi yang panjang.
- AC1: Kolom password inline, tanpa scroll tambahan di 360 px.
- AC2: Password salah menghasilkan pesan spesifik dan dapat dicoba ulang.
- AC3: Password tidak pernah ditampilkan sebagai teks terbuka.
- Requirement: FR-03 · UXR-03, UXR-05 · Layar: S2

### US-04
**As a** mahasiswa yang mengakses LMS melalui smartphone, **I want to** membaca informasi kritis tanpa scroll atau tertutup sidebar, **so that** saya tidak melewatkan tenggat waktu karena tampilan terpotong.
- AC1: Blok B1–B5 di atas lipatan pada 360×640 px.
- AC2: Sidebar menjadi drawer, tidak menutupi konten.
- AC3: Semua target sentuh ≥ 44×44 px.
- Requirement: FR-04 · UXR-04 · Layar: S1–S6

### US-05
**As a** mahasiswa yang gagal mengakses kuis, **I want to** membaca alasan kegagalan beserta langkah lanjutan dan tombol hubungi dosen, **so that** saya tidak panik dan tidak dianggap lalai.
- AC1: Pesan memuat waktu penutupan lengkap.
- AC2: Tersedia tombol "Hubungi Dosen" dan "Kembali ke Mata Kuliah".
- AC3: Tidak ada frasa yang menyalahkan pengguna.
- Requirement: FR-05 · UXR-05, UXR-06 · Layar: S4, S5

### US-06
**As a** mahasiswa pengguna LMS UMM, **I want to** melihat status kuis yang sama antara Dashboard dan halaman mata kuliah, **so that** saya tidak merasa diarahkan pada informasi yang menyesatkan.
- AC1: Label dan warna identik di tiga halaman.
- AC2: Terdapat keterangan waktu pembaruan status.
- Requirement: FR-02 · UXR-02 · Layar: S7

### US-07
**As a** mahasiswa yang mengerjakan kuis mendekati tenggat, **I want to** melihat hitung mundur waktu tersisa, **so that** saya dapat memperkirakan apakah waktu saya masih cukup.
- AC1: Countdown berjalan otomatis dan menyebut WIB.
- AC2: Banner berubah menjadi "SEGERA DITUTUP" saat sisa ≤ 60 menit.
- AC3: Peringatan muncul bila sisa waktu < durasi pengerjaan.
- Requirement: FR-06 · UXR-01, UXR-06 · Layar: S3

---

## 12. Matriks Keadaan Layar (State Matrix)

| State | Banner | CTA | Elemen Tambahan | Layar |
| :--- | :--- | :--- | :--- | :--- |
| Belum Dibuka | Netral · ikon jam · "BELUM DIBUKA — Mulai Kamis, 23 April 2026 · 11.00 WIB" | Nonaktif: "Belum Dapat Dikerjakan" | Countdown menuju pembukaan | S6 |
| Terbuka | Sukses · ikon centang · "TERBUKA — ditutup dalam 02:14:33" | Aktif: "Mulai Mengerjakan" | Kartu info kritis | S1 |
| Terbuka + Password | Sukses + label "PERLU PASSWORD" | Aktif setelah password valid | Kolom password inline + tautan pengumuman | S2 |
| Segera Ditutup (≤ 60 mnt) | Peringatan · "SEGERA DITUTUP — sisa 00:39:12" | Aktif | Peringatan durasi vs sisa waktu | S3 |
| Kesempatan Habis | Netral · "KESEMPATAN HABIS — 1 dari 1 digunakan" | Nonaktif | Tautan lihat hasil / hubungi dosen | S5 |
| Ditutup | Kritis · ikon gembok · "DITUTUP sejak Kamis, 18 Juni 2026 · 15.30 WIB" | Nonaktif + alasan di bawahnya | Penjelasan + Hubungi Dosen + Kembali | S4 |
| Gagal Memuat / Offline | Netral · "Status belum dapat dimuat" | Nonaktif sementara | Tombol "Coba muat ulang" | S8 |

---

## 13. Design Token Status (Semantik)

> Warna tidak boleh menjadi satu-satunya pembeda (UXR-01). Setiap state wajib memiliki ikon dan label teks.

| Token | Makna | Ikon | Contoh Label |
| :--- | :--- | :--- | :--- |
| `status/open` | Kuis dapat dikerjakan | centang / lingkaran terbuka | TERBUKA |
| `status/closing-soon` | Sisa waktu ≤ 60 menit | jam pasir | SEGERA DITUTUP |
| `status/closed` | Kuis tidak dapat dikerjakan | gembok | DITUTUP |
| `status/not-open-yet` | Belum masuk waktu buka | jam | BELUM DIBUKA |
| `status/no-attempt` | Kesempatan habis | tanda silang lingkaran | KESEMPATAN HABIS |
| `status/password-required` | Perlu password | kunci | PERLU PASSWORD |
| `status/unknown` | Data belum termuat | tanda tanya | STATUS BELUM DIMUAT |

Ketentuan: rasio kontras teks terhadap latar ≥ 4.5:1; ukuran label minimum 14 px pada mobile.

---

## 14. Spesifikasi Microcopy

| Konteks | Teks |
| :--- | :--- |
| Judul blok info | "Informasi Penting Kuis" |
| Label kartu | "Batas Waktu" · "Durasi Pengerjaan" · "Sisa Kesempatan" · "Jumlah Soal" |
| Blok password | "Kuis ini memerlukan password. Masukkan password yang diberikan dosen Anda." |
| Tautan password | "Lihat pengumuman dosen" |
| Password salah | "Password belum sesuai. Periksa kembali huruf besar/kecil, atau tanyakan kepada dosen pengampu." |
| Kuis ditutup | "Kuis ini sudah ditutup sejak Kamis, 18 Juni 2026 pukul 15.30 WIB, sehingga tidak dapat dikerjakan. Bila Anda memiliki izin susulan, hubungi dosen pengampu." |
| Kesempatan habis | "Anda telah menggunakan seluruh kesempatan pengerjaan kuis ini (1 dari 1)." |
| Belum dibuka | "Kuis ini akan dibuka pada Kamis, 23 April 2026 pukul 11.00 WIB." |
| Peringatan waktu | "Sisa waktu lebih singkat daripada durasi pengerjaan. Anda mungkin tidak dapat menyelesaikan kuis." |
| Gagal memuat | "Status kuis belum dapat dimuat. Periksa koneksi Anda, lalu coba muat ulang." |
| CTA | "Mulai Mengerjakan" · "Belum Dapat Dikerjakan" · "Kembali ke Mata Kuliah" · "Hubungi Dosen" · "Coba Muat Ulang" |
| Modal konfirmasi | "Anda akan memulai kuis. Waktu pengerjaan 12 menit dan hanya tersedia 1 kesempatan. Waktu mulai berjalan setelah Anda menekan 'Ya, Mulai'. Pastikan koneksi stabil." |
| Tombol modal | "Ya, Mulai" · "Batal" |

---

## 15. Catatan Kritis: Need vs Want (Integritas Akademik)

U2 secara literal meminta *"passwordnya langsung kelihatan di sebelah tombol"*. Kebutuhan mendasar (**need**) bukan "melihat password", melainkan **tidak perlu mencari-cari syarat akses**.

Menampilkan password secara terbuka akan merusak integritas penilaian dan bertentangan dengan pengaturan dosen. Karena itu requirement diturunkan menjadi **FR-03: kolom input password inline + tautan ke sumber resmi**, yang memenuhi need yang sama tanpa melanggar kebijakan akademik.

Keputusan ini akan diuji pada WS13 melalui metrik M4 (jumlah klik untuk menemukan syarat password = 0).

---

## 16. Asumsi, Dependensi & Risiko

| Jenis | Isi | Mitigasi |
| :--- | :--- | :--- |
| Dependensi | Data waktu buka/tutup, password, dan attempt dari modul kuis Moodle | Gunakan satu sumber waktu server untuk semua perhitungan status |
| Dependensi | Data enrollment mahasiswa pada mata kuliah | Status hanya ditampilkan bagi mahasiswa terdaftar |
| Asumsi | Mayoritas mahasiswa mengakses via browser HP | Desain mobile-first (didukung U3) |
| Asumsi | Waktu server kampus menggunakan WIB | Tampilkan zona waktu eksplisit di semua label waktu |
| Risiko | FR-02 memerlukan perubahan di luar halaman kuis | Turunkan ke Should-have; MVP fokus halaman detail |
| Risiko | Countdown bergantung waktu server, bukan perangkat | Keterangan pembaruan + rekonsiliasi saat CTA ditekan |
| Risiko | Kebiasaan lama mencari password di deskripsi | Instruksi lengkap tetap tersedia (collapsible) + tautan pengumuman |
| Risiko | FR-08 bersinggungan dengan privasi data akses | Konfirmasi kebijakan kampus sebelum diimplementasikan |

---

## 17. Instrumentasi untuk Validasi Metrik

| Metrik | Data yang Perlu Dicatat saat UT (WS13) |
| :--- | :--- |
| M1 | Jawaban partisipan atas pertanyaan "Apakah kuis ini bisa dikerjakan sekarang?" + stopwatch |
| M2 | Time on task: halaman terbuka → klik CTA atau pernyataan paham tidak bisa |
| M3 | Pemeriksaan manual viewport 360×640 px (checklist wireframe WS12) |
| M4 | Jumlah klik/scroll sampai partisipan menemukan syarat password |
| M5 | Kuesioner SUS 10 item setelah sesi UT |
| M6 | Catatan think aloud: apakah partisipan menyebut ingin menghubungi dosen |

---

## 18. Rencana Validasi

1. **WS09 — Information Architecture:** content inventory dan sitemap mengikuti urutan blok Bagian 8.
2. **WS10 — User Flow:** current flow vs proposed flow untuk task "memastikan kuis dapat dikerjakan lalu memulainya".
3. **WS11 — Crazy 8s:** eksplorasi 8 variasi penyajian banner status dan blok password.
4. **WS12 — Wireframe & Prototype:** 8 layar (S1–S8) sesuai Bagian 12; verifikasi terhadap UXR-01 s.d. UXR-08.
5. **WS13 — Usability Testing:** 5 partisipan, think aloud, ukur M1–M6.
6. **WS14 — Iterasi:** perbandingan Before → After berbasis temuan UT.

---

## 19. Pertanyaan Terbuka (Open Questions)

1. Apakah dosen pengampu bersedia menyertakan password pada kanal resmi yang dapat ditautkan dari halaman kuis?
2. Apakah badge status di Dashboard dapat diubah tanpa memodifikasi inti Moodle?
3. Apakah kebijakan izin susulan dapat ditampilkan otomatis sebagai bagian dari pesan "Ditutup"?
4. Apakah riwayat akses kuis (FR-08) diperbolehkan secara kebijakan privasi kampus?
5. Apakah ambang batas "Segera Ditutup" sebaiknya 60 menit atau dapat dikonfigurasi per kuis?

---

## 20. Matriks Traceability

| Insight | Need | FR | UXR | User Story | Layar | Metrik |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| I-1 | Kepastian status sebelum menekan tombol | FR-01, FR-07 | UXR-01, UXR-07 | US-01 | S1–S6 | M1, M2 |
| I-2 | Konsistensi informasi antar halaman | FR-02 | UXR-02 | US-06 | S7 | M1 |
| I-3 | Tidak mencari syarat akses di lokasi terpisah | FR-03 | UXR-03, UXR-05 | US-03 | S2 | M4 |
| I-4 | Informasi kritis terbaca di layar HP | FR-04 | UXR-04 | US-02, US-04 | S1–S6 | M3 |
| I-5 | Alasan gagal + langkah lanjutan | FR-05, FR-08 | UXR-05, UXR-06 | US-05 | S4, S5 | M6 |
| I-6 | Peringatan dini sebelum kesempatan hilang | FR-06 | UXR-01, UXR-06 | US-07 | S3 | M2 |

---

## 21. Lampiran A — Daftar Layar untuk Wireframe (WS12)

| ID | Layar | State |
| :--- | :--- | :--- |
| S1 | Detail Kuis — Terbuka | open |
| S2 | Detail Kuis — Perlu Password | password-required |
| S3 | Detail Kuis — Segera Ditutup | closing-soon |
| S4 | Detail Kuis — Ditutup | closed |
| S5 | Detail Kuis — Kesempatan Habis | no-attempt |
| S6 | Detail Kuis — Belum Dibuka | not-open-yet |
| S7 | Dashboard / Halaman Mata Kuliah dengan badge status | mixed |
| S8 | Detail Kuis — Gagal Memuat | unknown |
| S9 | Modal Konfirmasi Pra-Mulai | overlay pada S1/S2/S3 |

---

## 22. Lampiran B — Prompt LLM untuk Tahap Desain

```text
Anda adalah UI/UX designer. Berdasarkan PRD "Quiz Clarity — LMS UMM" berikut,
hasilkan wireframe mid-fidelity mobile-first (360x800) untuk layar S1-S9
(Lampiran A).

Wajib mematuhi:
- Urutan blok B1-B7 (Bagian 8).
- Info kritis (B1-B5) tanpa scroll pada 360x640 px (UXR-04).
- Status dikodekan ganda: warna + ikon + label teks (UXR-01, Bagian 13).
- Target sentuh >= 44x44 px; kontras teks >= 4.5:1 (UXR-04).
- Microcopy persis seperti Bagian 14; Bahasa Indonesia, tanpa frasa teknis Inggris.
- Sidebar menjadi drawer pada layar < 768 px.
- Jangan menampilkan password sebagai teks terbuka (Bagian 15).
- Setiap state gagal menyediakan minimal satu tindakan lanjutan (FR-05).

Keluaran: deskripsi layout per layar + anotasi tiap elemen dengan ID requirement
(FR/UXR) + daftar komponen yang dipakai lintas layar.

[Tempel isi PRD ini di sini]
```

---

## 23. Lampiran C — Ringkasan Worksheet Pertemuan 08

### C.1 Pemetaan Insight → Need → Requirement

| Research Insight | User Need | Functional Requirement | UX Requirement |
| :--- | :--- | :--- | :--- |
| 5/5 responden pernah mengira kuis masih bisa dikerjakan; status baru diketahui setelah klik "Attempt". | Kepastian status kuis sebelum menekan tombol mulai. | FR-01: status dihitung dari waktu server, ditampilkan dalam 4 kondisi. | UXR-01: banner di area atas, warna + ikon + teks; CTA nonaktif disertai alasan. |
| Status Dashboard open, di dalam mata kuliah closed; user merasa dijebak. | Konsistensi informasi antar halaman. | FR-02: badge status memakai sumber data & waktu yang sama. | UXR-02: label & warna identik di semua halaman + keterangan waktu pembaruan. |
| Password tersembunyi di paragraf instruksi panjang. | Tidak perlu mencari syarat akses di lokasi terpisah. | FR-03: kolom password inline di atas CTA + tautan pengumuman. | UXR-03: satu area pandang dengan CTA; pesan kesalahan spesifik. |
| Pengguna mobile tidak sadar kuis lewat waktu; konten terpotong sidebar. | Informasi kritis terbaca di layar HP. | FR-04: urutan blok Status → Info Kritis → Password → CTA → Instruksi. | UXR-04: tanpa scroll pada 360×640; drawer; sentuh ≥ 44 px; kontras ≥ 4.5:1. |
| Saat gagal akses, user screenshot lalu menghubungi dosen untuk membela diri. | Alasan gagal + langkah lanjutan. | FR-05: alasan, waktu penutupan eksplisit, Hubungi Dosen, Kembali. | UXR-05: bahasa awam, netral, selalu ada tindakan lanjutan. |
| Tidak ada peringatan menjelang penutupan. | Peringatan dini sebelum kesempatan hilang. | FR-06: countdown + penanda "Segera Ditutup" ≤ 60 menit. | UXR-06: WIB eksplisit; perubahan warna & label pada ambang batas. |

### C.2 User Stories (ringkas)

1. As a mahasiswa pengguna LMS UMM, I want to melihat status kuis sebelum menekan tombol mulai, so that saya tidak membuang waktu mencoba mengakses kuis yang sudah tidak tersedia.
2. As a mahasiswa pengguna LMS UMM, I want to melihat batas waktu, durasi, dan sisa kesempatan dalam satu kartu ringkas, so that saya bisa langsung memutuskan mengerjakan sekarang atau menyiapkan diri dulu.
3. As a mahasiswa pengguna LMS UMM, I want to mengisi password pada kolom di dekat tombol "Mulai Mengerjakan", so that saya tidak perlu mencari password di deskripsi yang panjang.
4. As a mahasiswa yang mengakses LMS melalui smartphone, I want to membaca informasi kritis tanpa scroll atau tertutup sidebar, so that saya tidak melewatkan tenggat waktu karena tampilan terpotong.
5. As a mahasiswa yang gagal mengakses kuis, I want to membaca alasan kegagalan beserta langkah lanjutan dan tombol hubungi dosen, so that saya tidak panik dan tidak dianggap lalai.
6. As a mahasiswa pengguna LMS UMM, I want to melihat status kuis yang sama antara Dashboard dan halaman mata kuliah, so that saya tidak merasa diarahkan pada informasi yang menyesatkan.
7. As a mahasiswa yang mengerjakan kuis mendekati tenggat, I want to melihat hitung mundur waktu tersisa, so that saya dapat memperkirakan apakah waktu saya masih cukup.

---

## 24. Lampiran D — Berkas Bukti Pendukung

| Berkas | Keterangan |
| :--- | :--- |
| `Screenshot_1_Login_Page.jpg` | Halaman login (konteks WS01) |
| `Screenshot_2_Home_Dashboard.jpg` | Dashboard & daftar mata kuliah |
| `Screenshot_3_Course_Page.jpg` | Halaman mata kuliah Desain Perangkat Lunak A |
| `Screenshot_4_Quiz_Detail.jpg` | Halaman detail Quiz 1 MK DPL |
| `Screenshot_5_Quiz_Closed.jpg` | Halaman Quiz 1 MK DPL (susulan) — status closed & password |
| `Screenshot_6_Search_MK.jpg` | Halaman pencarian mata kuliah |
| `Rekap_GForm_LMS_UMM.xlsx` | Rekap 5 responden kuesioner (16/10/2026) |
| `Worksheet_01_s.d_07.pdf` | Rantai dokumen riset dan sintesis |

> Etika: seluruh tangkapan layar telah disensor dari data pribadi (NIM, nama, nilai). Nama responden pada dokumen internal digunakan atas izin yang bersangkutan; persona pada dokumen publik menggunakan nama samaran.

---

## 25. Changelog

| Versi | Tanggal | Perubahan | Penulis |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-11-22 | Dokumen awal: 6 insight, 8 FR, 8 UXR, 7 user stories, 9 layar, matriks traceability. | Achmad Ardi Sukmadi |