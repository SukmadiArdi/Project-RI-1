/**
 * Spesifikasi Microcopy Resmi Quiz Clarity
 * Merujuk langsung pada Bagian 14 PRD Quiz Clarity LMS UMM v1.0
 */
export const MICROCOPY = {
  infoTitle: 'Informasi Penting Kuis',
  labels: {
    deadline: 'Batas Waktu',
    duration: 'Durasi Pengerjaan',
    attempts: 'Sisa Kesempatan',
    questions: 'Jumlah Soal',
  },
  passwordBlock: {
    prompt: 'Kuis ini memerlukan password. Masukkan password yang diberikan dosen Anda.',
    link: 'Lihat pengumuman dosen',
    inputPlaceholder: 'Ketik password kuis di sini...',
    error: 'Password belum sesuai. Periksa kembali huruf besar/kecil, atau tanyakan kepada dosen pengampu.',
  },
  statusMessages: {
    closed: (wibFormatted: string) =>
      `Kuis ini sudah ditutup sejak ${wibFormatted}, sehingga tidak dapat dikerjakan. Bila Anda memiliki izin susulan, hubungi dosen pengampu.`,
    noAttempt: 'Anda telah menggunakan seluruh kesempatan pengerjaan kuis ini (1 dari 1).',
    notOpenYet: (wibFormatted: string) =>
      `Kuis ini akan dibuka pada ${wibFormatted}.`,
    timeWarning: 'Sisa waktu lebih singkat daripada durasi pengerjaan. Anda mungkin tidak dapat menyelesaikan kuis.',
    loadFailed: 'Status kuis belum dapat dimuat. Periksa koneksi Anda, lalu coba muat ulang.',
  },
  cta: {
    start: 'Mulai Mengerjakan',
    notReady: 'Belum Dapat Dikerjakan',
    closed: 'Kuis Ditutup',
    noAttempt: 'Kesempatan Habis',
    backToCourse: 'Kembali ke Mata Kuliah',
    contactLecturer: 'Hubungi Dosen',
    retry: 'Coba Muat Ulang',
    viewResult: 'Lihat Hasil / Nilai',
    viewAuditLog: 'Lihat Bukti Akses Kuis',
  },
  modalConfirmation: {
    title: 'Konfirmasi Mulai Kuis',
    body: (durationMinutes: number, remainingAttempts: number) =>
      `Anda akan memulai kuis. Waktu pengerjaan ${durationMinutes} menit dan hanya tersedia ${remainingAttempts} kesempatan. Waktu mulai berjalan setelah Anda menekan 'Ya, Mulai'. Pastikan koneksi stabil.`,
    confirmButton: 'Ya, Mulai',
    cancelButton: 'Batal',
  },
  header: {
    title: 'LMS UMM',
    subTitle: 'Learning Management System',
    profileName: 'Rian Pratama',
    profileNim: '202410370311234',
    profileRole: 'Mahasiswa (Semester 4)',
  },
};
