import { QuizItem, StatusEvaluation } from '../types/quiz';
import {
  formatWibDateTime,
  formatWibDateTimeNarrative,
  formatCountdown,
} from './dateFormatter';
import { MICROCOPY } from '../constants/microcopy';

export function evaluateQuizStatus(
  quiz: QuizItem,
  serverTime: Date,
  isOffline: boolean = false
): StatusEvaluation {
  // S8: Gagal memuat / kendala offline
  if (isOffline) {
    return {
      token: 'status/unknown',
      label: 'STATUS BELUM DIMUAT',
      bannerTitle: 'Status belum dapat dimuat',
      bannerSubtitle: 'Periksa koneksi Anda, lalu coba muat ulang.',
      canAttempt: false,
      isClosingSoon: false,
      isTimeShorterThanDuration: false,
      remainingSeconds: 0,
      secondsUntilOpen: 0,
      reasonDisabled: MICROCOPY.statusMessages.loadFailed,
    };
  }

  // S5: Kesempatan habis
  if (quiz.userAttempts >= quiz.maxAttempts) {
    return {
      token: 'status/no-attempt',
      label: 'KESEMPATAN HABIS',
      bannerTitle: `KESEMPATAN HABIS — ${quiz.userAttempts} dari ${quiz.maxAttempts} digunakan`,
      bannerSubtitle: MICROCOPY.statusMessages.noAttempt,
      canAttempt: false,
      isClosingSoon: false,
      isTimeShorterThanDuration: false,
      remainingSeconds: 0,
      secondsUntilOpen: 0,
      reasonDisabled: MICROCOPY.statusMessages.noAttempt,
    };
  }

  const openTime = new Date(quiz.openTime).getTime();
  const closeTime = new Date(quiz.closeTime).getTime();
  const current = serverTime.getTime();

  // S6: Belum dibuka
  if (current < openTime) {
    const secondsUntilOpen = Math.max(0, Math.floor((openTime - current) / 1000));
    return {
      token: 'status/not-open-yet',
      label: 'BELUM DIBUKA',
      bannerTitle: `BELUM DIBUKA — Mulai ${formatWibDateTime(quiz.openTime)}`,
      bannerSubtitle: `Kuis dibuka dalam ${formatCountdown(secondsUntilOpen)}`,
      canAttempt: false,
      isClosingSoon: false,
      isTimeShorterThanDuration: false,
      remainingSeconds: 0,
      secondsUntilOpen,
      reasonDisabled: MICROCOPY.statusMessages.notOpenYet(
        formatWibDateTimeNarrative(quiz.openTime)
      ),
    };
  }

  // S4: Ditutup
  if (current >= closeTime) {
    return {
      token: 'status/closed',
      label: 'DITUTUP',
      bannerTitle: `DITUTUP sejak ${formatWibDateTime(quiz.closeTime)}`,
      bannerSubtitle: 'Kuis telah melewati batas waktu pengerjaan.',
      canAttempt: false,
      isClosingSoon: false,
      isTimeShorterThanDuration: false,
      remainingSeconds: 0,
      secondsUntilOpen: 0,
      reasonDisabled: MICROCOPY.statusMessages.closed(
        formatWibDateTimeNarrative(quiz.closeTime)
      ),
    };
  }

  // Masuk rentang waktu aktif (openTime <= current < closeTime)
  const remainingSeconds = Math.max(0, Math.floor((closeTime - current) / 1000));
  const isClosingSoon = remainingSeconds <= 3600; // <= 60 menit
  const durationInSeconds = quiz.durationMinutes * 60;
  const isTimeShorterThanDuration = remainingSeconds < durationInSeconds;

  // S2: Perlu Password (bila belum diisi dan kuis memerlukan password)
  if (quiz.passwordRequired) {
    if (isClosingSoon) {
      // S3 with password
      return {
        token: 'status/closing-soon',
        label: 'SEGERA DITUTUP',
        bannerTitle: `SEGERA DITUTUP — sisa ${formatCountdown(remainingSeconds)}`,
        bannerSubtitle: isTimeShorterThanDuration
          ? MICROCOPY.statusMessages.timeWarning
          : 'Kuis segera ditutup, perhatikan sisa waktu pengerjaan.',
        canAttempt: true,
        isClosingSoon: true,
        isTimeShorterThanDuration,
        remainingSeconds,
        secondsUntilOpen: 0,
      };
    }
    return {
      token: 'status/password-required',
      label: 'PERLU PASSWORD',
      bannerTitle: `TERBUKA — ditutup dalam ${formatCountdown(remainingSeconds)}`,
      bannerSubtitle: 'Masukkan password kuis sebelum menekan tombol mulai.',
      canAttempt: true,
      isClosingSoon: false,
      isTimeShorterThanDuration,
      remainingSeconds,
      secondsUntilOpen: 0,
    };
  }

  // S3: Segera Ditutup (tanpa password)
  if (isClosingSoon) {
    return {
      token: 'status/closing-soon',
      label: 'SEGERA DITUTUP',
      bannerTitle: `SEGERA DITUTUP — sisa ${formatCountdown(remainingSeconds)}`,
      bannerSubtitle: isTimeShorterThanDuration
        ? MICROCOPY.statusMessages.timeWarning
        : 'Segera kerjakan kuis sebelum waktu pengerjaan berakhir.',
      canAttempt: true,
      isClosingSoon: true,
      isTimeShorterThanDuration,
      remainingSeconds,
      secondsUntilOpen: 0,
    };
  }

  // S1: Terbuka normal
  return {
    token: 'status/open',
    label: 'TERBUKA',
    bannerTitle: `TERBUKA — ditutup dalam ${formatCountdown(remainingSeconds)}`,
    bannerSubtitle: 'Kuis dapat dikerjakan sekarang.',
    canAttempt: true,
    isClosingSoon: false,
    isTimeShorterThanDuration: false,
    remainingSeconds,
    secondsUntilOpen: 0,
  };
}
