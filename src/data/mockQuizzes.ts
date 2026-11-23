import { QuizItem } from '../types/quiz';

/**
 * Mock data kuis untuk LMS UMM (Mata Kuliah Desain Perangkat Lunak A)
 * Sesuai skenario PRD: Persona Rian Pratama, Dosen Dr. Ir. Wahyudi, M.T.
 */
export const INITIAL_QUIZZES: QuizItem[] = [
  {
    id: 'quiz-open',
    code: 'DPL-Q01',
    title: 'Quiz 1 MK DPL — Konsep Dasar Arsitektur Perangkat Lunak',
    courseId: 'mk-dpl-a',
    courseName: 'Desain Perangkat Lunak A',
    courseCode: 'TIF-3201',
    openTime: '2026-11-23T08:00:00+07:00',
    closeTime: '2026-11-23T12:00:00+07:00', // ~2-3 jam lagi
    durationMinutes: 12,
    maxAttempts: 1,
    userAttempts: 0,
    questionCount: 15,
    passwordRequired: false,
    lecturerInstructions:
      'Kerjakan kuis ini secara mandiri. Materi mencakup Modul 1 sampai Modul 3: Konsep Modularitas, Abstraksi, dan Coupling-Cohesion. Pastikan koneksi internet Anda stabil sebelum menekan tombol mulai.',
    lecturerAnnouncement: 'Kuis terbuka tanpa password. Kerjakan sebelum pukul 12.00 WIB.',
    lecturerName: 'Dr. Ir. Wahyudi, M.T.',
    lecturerContact: '081234567890 (WhatsApp Dosen Pengampu)',
  },
  {
    id: 'quiz-password',
    code: 'DPL-Q02',
    title: 'Quiz 1 MK DPL — Validasi & Verifikasi (Perlu Password)',
    courseId: 'mk-dpl-a',
    courseName: 'Desain Perangkat Lunak A',
    courseCode: 'TIF-3201',
    openTime: '2026-11-23T08:00:00+07:00',
    closeTime: '2026-11-23T13:00:00+07:00',
    durationMinutes: 15,
    maxAttempts: 1,
    userAttempts: 0,
    questionCount: 20,
    passwordRequired: true,
    correctPassword: 'DPL2026UMM',
    lecturerInstructions:
      'Kuis ini dikhususkan bagi mahasiswa kelas DPL A yang hadir pada sesi sinkronus. Password dibagikan melalui pengumuman dosen di forum kelas dan chat grup WA kelas.',
    lecturerAnnouncement:
      'Pengumuman Dosen: Password untuk kuis ini adalah DPL2026UMM. Harap perhatikan huruf kapital dan jangan menyebarkan ke luar kelas.',
    lecturerName: 'Dr. Ir. Wahyudi, M.T.',
    lecturerContact: '081234567890 (WhatsApp Dosen Pengampu)',
  },
  {
    id: 'quiz-closing-soon',
    code: 'DPL-Q03',
    title: 'Quiz 1 MK DPL — Design Patterns (Segera Ditutup)',
    courseId: 'mk-dpl-a',
    courseName: 'Desain Perangkat Lunak A',
    courseCode: 'TIF-3201',
    openTime: '2026-11-23T08:00:00+07:00',
    closeTime: '2026-11-23T09:33:00+07:00', // sisa ~8 menit, durasi 12 menit -> sisa waktu < durasi!
    durationMinutes: 12,
    maxAttempts: 1,
    userAttempts: 0,
    questionCount: 10,
    passwordRequired: false,
    lecturerInstructions:
      'Kuis singkat mengenai Creational dan Structural Design Patterns. Perhatikan batas waktu penutupan kuis dengan saksama.',
    lecturerAnnouncement: 'Tenggat kuis mendekati penutupan pada pukul 09.33 WIB.',
    lecturerName: 'Dr. Ir. Wahyudi, M.T.',
    lecturerContact: '081234567890 (WhatsApp Dosen Pengampu)',
  },
  {
    id: 'quiz-closed',
    code: 'DPL-Q04',
    title: 'Quiz 1 MK DPL (Susulan)',
    courseId: 'mk-dpl-a',
    courseName: 'Desain Perangkat Lunak A',
    courseCode: 'TIF-3201',
    openTime: '2026-06-18T08:00:00+07:00',
    closeTime: '2026-06-18T15:30:00+07:00', // Sesuai WS01 & PRD Bagian 2.1
    durationMinutes: 12,
    maxAttempts: 1,
    userAttempts: 0,
    questionCount: 15,
    passwordRequired: true,
    correctPassword: 'SUSULANDPL26',
    lecturerInstructions:
      'Kuis susulan khusus mahasiswa yang telah melampirkan surat izin sakit atau dispensasi resmi fakultas.',
    lecturerAnnouncement: 'Kuis telah ditutup sejak Kamis, 18 Juni 2026 pukul 15.30 WIB.',
    lecturerName: 'Dr. Ir. Wahyudi, M.T.',
    lecturerContact: '081234567890 (WhatsApp Dosen Pengampu)',
  },
  {
    id: 'quiz-no-attempt',
    code: 'DPL-Q05',
    title: 'Quiz Evaluasi Tengah Semester MK DPL',
    courseId: 'mk-dpl-a',
    courseName: 'Desain Perangkat Lunak A',
    courseCode: 'TIF-3201',
    openTime: '2026-11-20T08:00:00+07:00',
    closeTime: '2026-11-25T23:59:00+07:00',
    durationMinutes: 20,
    maxAttempts: 1,
    userAttempts: 1, // Sudah digunakan!
    questionCount: 25,
    passwordRequired: false,
    userScore: 88.5,
    lastAttemptDate: '2026-11-22T14:15:00+07:00',
    lecturerInstructions:
      'Evaluasi pemahaman materi separuh semester. Kesempatan pengerjaan hanya 1 kali dan nilai akan langsung dicatat ke rekapitulasi nilai akhir.',
    lecturerAnnouncement: 'Seluruh mahasiswa wajib mengerjakan tepat 1 kali.',
    lecturerName: 'Dr. Ir. Wahyudi, M.T.',
    lecturerContact: '081234567890 (WhatsApp Dosen Pengampu)',
  },
  {
    id: 'quiz-not-open-yet',
    code: 'DPL-Q06',
    title: 'Quiz 2 MK DPL — Perancangan Antarmuka & Interaksi',
    courseId: 'mk-dpl-a',
    courseName: 'Desain Perangkat Lunak A',
    courseCode: 'TIF-3201',
    openTime: '2026-11-24T11:00:00+07:00', // Besok pukul 11:00 WIB
    closeTime: '2026-11-24T18:00:00+07:00',
    durationMinutes: 15,
    maxAttempts: 1,
    userAttempts: 0,
    questionCount: 15,
    passwordRequired: false,
    lecturerInstructions:
      'Kuis akan dibuka pada tanggal yang telah ditentukan. Pelajari materi Wireframing, State Transition, dan Usability Guidelines.',
    lecturerAnnouncement: 'Kuis akan dibuka pada Selasa, 24 November 2026 pukul 11.00 WIB.',
    lecturerName: 'Dr. Ir. Wahyudi, M.T.',
    lecturerContact: '081234567890 (WhatsApp Dosen Pengampu)',
  },
];

export const MOCK_COURSES = [
  {
    id: 'mk-dpl-a',
    code: 'TIF-3201',
    name: 'Desain Perangkat Lunak A',
    lecturer: 'Dr. Ir. Wahyudi, M.T.',
    credits: 3,
    activeQuizzesCount: 6,
    semester: 'Ganjil 2026/2027',
  },
  {
    id: 'mk-ri-b',
    code: 'TIF-3205',
    name: 'Rekayasa Interaksi B',
    lecturer: 'Dra. Nur Indah, M.Kom.',
    credits: 3,
    activeQuizzesCount: 2,
    semester: 'Ganjil 2026/2027',
  },
  {
    id: 'mk-pbo-c',
    code: 'TIF-2104',
    name: 'Pemrograman Berorientasi Objek C',
    lecturer: 'Ahmad Fauzi, S.T., M.T.',
    credits: 4,
    activeQuizzesCount: 1,
    semester: 'Ganjil 2026/2027',
  },
];

export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question:
      'Berdasarkan prinsip Usability Nielsen & Molich, prinsip mana yang paling relevan dengan penyediaan status kuis secara real-time dan jelas di LMS UMM?',
    options: [
      'Visibility of system status (Visibilitas status sistem)',
      'Match between system and the real world',
      'Aesthetic and minimalist design',
      'Help users recognize, diagnose, and recover from errors',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question:
      'Mengapa penempatan kolom password inline di dekat tombol CTA (FR-03) lebih efektif daripada menaruhnya di deskripsi panjang?',
    options: [
      'Mengurangi beban kognitif dan waktu pencarian sesuai prinsip Proximity dalam Rekayasa Interaksi',
      'Meningkatkan kompleksitas algoritma autentikasi Moodle',
      'Menghilangkan kebutuhan dosen memberikan pengumuman',
      'Membuat kuis otomatis dapat diakses oleh semua kelas',
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question:
      'Apa tujuan utama penerapan "Dual-Encoding" (warna + ikon + teks) pada status banner kuis?',
    options: [
      'Memastikan status tetap dapat dipahami oleh pengguna dengan keterbatasan penglihatan warna (WCAG AA)',
      'Membuat tampilan aplikasi lebih berwarna-warni',
      'Mempercepat waktu loading basis data Moodle',
      'Menggantikan teks instruksi dosen secara keseluruhan',
    ],
    correctAnswer: 0,
  },
];
