import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {
  QuizItem,
  QuizStatusToken,
  ScreenStateId,
  AccessLogEntry,
  StatusEvaluation,
} from '../types/quiz';
import { INITIAL_QUIZZES } from '../data/mockQuizzes';
import { evaluateQuizStatus } from '../utils/statusEvaluator';
import { formatWibDateTime, formatStatusPerTime } from '../utils/dateFormatter';
import { MICROCOPY } from '../constants/microcopy';

interface QuizContextValue {
  quizzes: QuizItem[];
  activeQuizId: string;
  activeQuiz: QuizItem;
  currentScreen: ScreenStateId;
  serverTime: Date;
  isTimeRunning: boolean;
  isOffline: boolean;
  isLoading: boolean;
  accessLogs: AccessLogEntry[];
  passwordInput: string;
  passwordError: string;
  isConfirmationModalOpen: boolean;
  isContactLecturerOpen: boolean;
  isAnnouncementModalOpen: boolean;
  isCourseDrawerOpen: boolean;
  isAuditLogModalOpen: boolean;
  mobileViewportMode: boolean;
  currentEvaluation: StatusEvaluation;
  statusPerTimeText: string;

  // Actions
  setScreen: (screen: ScreenStateId) => void;
  selectQuiz: (quizId: string) => void;
  setServerTime: (date: Date) => void;
  advanceServerTime: (minutes: number) => void;
  toggleTimeRunning: () => void;
  toggleOffline: () => void;
  retryLoading: () => void;
  setPasswordInput: (val: string) => void;
  submitPassword: () => boolean;
  openConfirmationModal: () => void;
  closeConfirmationModal: () => void;
  confirmStartQuiz: () => void;
  cancelStartQuiz: () => void;
  finishAttempt: (score: number) => void;
  resetQuizAttempts: (quizId: string) => void;
  setMobileViewportMode: (val: boolean) => void;
  setIsContactLecturerOpen: (val: boolean) => void;
  setIsAnnouncementModalOpen: (val: boolean) => void;
  setIsCourseDrawerOpen: (val: boolean) => void;
  setIsAuditLogModalOpen: (val: boolean) => void;
  logAccess: (quizId: string, action: string, note?: string) => void;
  applyPreset: (preset: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8') => void;
  exportAuditProofSlip: () => string;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

// Default server simulated time: 23 November 2026 09:25:00 WIB
const DEFAULT_SIMULATED_TIME = new Date('2026-11-23T09:25:00+07:00');

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>(INITIAL_QUIZZES);
  const [activeQuizId, setActiveQuizId] = useState<string>('quiz-open');
  const [currentScreen, setCurrentScreen] = useState<ScreenStateId>('S1');
  const [serverTime, setServerTimeState] = useState<Date>(DEFAULT_SIMULATED_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordInput, setPasswordInputState] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  // Modals & UI Toggles
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [isContactLecturerOpen, setIsContactLecturerOpen] = useState<boolean>(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState<boolean>(false);
  const [isCourseDrawerOpen, setIsCourseDrawerOpen] = useState<boolean>(false);
  const [isAuditLogModalOpen, setIsAuditLogModalOpen] = useState<boolean>(false);

  // Viewport mode: true = simulated mobile 360x640 frame preview, false = full width responsive
  const [mobileViewportMode, setMobileViewportMode] = useState<boolean>(false);

  // FR-08 Access log trail
  const [accessLogs, setAccessLogs] = useState<AccessLogEntry[]>([
    {
      id: 'log-1',
      timestamp: new Date('2026-11-23T09:20:15+07:00').toISOString(),
      serverTimeFormatted: 'Senin, 23 November 2026 · 09.20 WIB',
      quizId: 'quiz-open',
      quizTitle: 'Quiz 1 MK DPL — Konsep Dasar Arsitektur Perangkat Lunak',
      statusAtAccess: 'status/open',
      statusLabel: 'TERBUKA',
      action: 'Membuka Halaman Detail Kuis',
      ipAddress: '10.20.14.88 (Wi-Fi Kampus III UMM)',
      device: 'Chrome Android 130 / Samsung SM-A536B (360×640 px)',
      note: 'Akses kuis tercatat sah di server.',
    },
  ]);

  // Active quiz object
  const activeQuiz = useMemo(() => {
    return quizzes.find((q) => q.id === activeQuizId) || quizzes[0];
  }, [quizzes, activeQuizId]);

  // Current status evaluation (single source of truth)
  const currentEvaluation = useMemo(() => {
    return evaluateQuizStatus(activeQuiz, serverTime, isOffline);
  }, [activeQuiz, serverTime, isOffline]);

  const statusPerTimeText = useMemo(() => {
    return formatStatusPerTime(serverTime);
  }, [serverTime]);

  // Real-time server clock ticker
  useEffect(() => {
    if (!isTimeRunning) return;
    const interval = setInterval(() => {
      setServerTimeState((prev) => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimeRunning]);

  // Append access log helper
  const logAccess = useCallback(
    (quizId: string, action: string, note?: string) => {
      const targetQuiz = quizzes.find((q) => q.id === quizId) || activeQuiz;
      const evalStatus = evaluateQuizStatus(targetQuiz, serverTime, isOffline);

      const newLog: AccessLogEntry = {
        id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        serverTimeFormatted: formatWibDateTime(serverTime),
        quizId: targetQuiz.id,
        quizTitle: targetQuiz.title,
        statusAtAccess: evalStatus.token,
        statusLabel: evalStatus.label,
        action,
        ipAddress: '10.20.14.88 (Wi-Fi Kampus III UMM)',
        device: 'Chrome Android 130 / Mobile Viewport (360×640 px)',
        note: note || 'Aktivitas tervalidasi oleh sistem Quiz Clarity.',
      };

      setAccessLogs((prev) => [newLog, ...prev]);
    },
    [quizzes, activeQuiz, serverTime, isOffline]
  );

  const selectQuiz = useCallback(
    (quizId: string) => {
      setActiveQuizId(quizId);
      setPasswordInputState('');
      setPasswordError('');
      setIsConfirmationModalOpen(false);
      setIsCourseDrawerOpen(false);

      // Trigger realistic short loading skeleton (UXR-07)
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 400);

      logAccess(quizId, 'Membuka Detail Kuis');
    },
    [logAccess]
  );

  const setScreen = useCallback(
    (screen: ScreenStateId) => {
      setCurrentScreen(screen);
      if (screen === 'S7') {
        setIsConfirmationModalOpen(false);
      }
    },
    []
  );

  const setPasswordInput = useCallback((val: string) => {
    setPasswordInputState(val);
    setPasswordError('');
  }, []);

  const submitPassword = useCallback((): boolean => {
    if (!activeQuiz.passwordRequired) return true;

    if (passwordInput.trim() === activeQuiz.correctPassword) {
      setPasswordError('');
      logAccess(activeQuiz.id, 'Verifikasi Password Berhasil', 'Otorisasi kuis diterima');
      return true;
    } else {
      setPasswordError(MICROCOPY.passwordBlock.error);
      logAccess(
        activeQuiz.id,
        'Gagal Verifikasi Password',
        'Password salah atau belum dimasukkan'
      );
      return false;
    }
  }, [activeQuiz, passwordInput, logAccess]);

  const openConfirmationModal = useCallback(() => {
    // If password is required, validate it first
    if (activeQuiz.passwordRequired) {
      const isValid = submitPassword();
      if (!isValid) return;
    }
    setIsConfirmationModalOpen(true);
    logAccess(activeQuiz.id, 'Membuka Modal Konfirmasi Pra-Mulai (S9)');
  }, [activeQuiz, submitPassword, logAccess]);

  const closeConfirmationModal = useCallback(() => {
    setIsConfirmationModalOpen(false);
  }, []);

  const confirmStartQuiz = useCallback(() => {
    setIsConfirmationModalOpen(false);
    logAccess(
      activeQuiz.id,
      'Memulai Pengerjaan Kuis',
      'Timer pengerjaan mulai berjalan resmi'
    );
    setCurrentScreen('ATTEMPT');
  }, [activeQuiz, logAccess]);

  const cancelStartQuiz = useCallback(() => {
    setIsConfirmationModalOpen(false);
    logAccess(
      activeQuiz.id,
      'Membatalkan Konfirmasi Mulai',
      'Kesempatan pengerjaan tetap utuh'
    );
  }, [activeQuiz, logAccess]);

  const finishAttempt = useCallback(
    (score: number) => {
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === activeQuiz.id
            ? {
                ...q,
                userAttempts: q.userAttempts + 1,
                userScore: score,
                lastAttemptDate: new Date().toISOString(),
              }
            : q
        )
      );
      logAccess(
        activeQuiz.id,
        'Selesai Mengerjakan Kuis',
        `Nilai tercatat: ${score}/100. Kesempatan berkurang.`
      );
      setCurrentScreen('S5'); // S5: Kesempatan Habis
    },
    [activeQuiz, logAccess]
  );

  const resetQuizAttempts = useCallback(
    (quizId: string) => {
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === quizId ? { ...q, userAttempts: 0, userScore: undefined } : q
        )
      );
      logAccess(quizId, 'Reset Kesempatan Kuis', 'Direset untuk pengujian');
    },
    [logAccess]
  );

  const advanceServerTime = useCallback((minutes: number) => {
    setServerTimeState((prev) => new Date(prev.getTime() + minutes * 60 * 1000));
  }, []);

  const toggleTimeRunning = useCallback(() => {
    setIsTimeRunning((prev) => !prev);
  }, []);

  const toggleOffline = useCallback(() => {
    setIsOffline((prev) => {
      const next = !prev;
      if (next) {
        setCurrentScreen('S8');
      }
      return next;
    });
  }, []);

  const retryLoading = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsOffline(false);
      setIsLoading(false);
      logAccess(activeQuiz.id, 'Muat Ulang Status Berhasil', 'Koneksi kembali normal');
    }, 900);
  }, [activeQuiz, logAccess]);

  // Quick Preset switcher for rapid demonstration of S1 to S8
  const applyPreset = useCallback(
    (preset: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8') => {
      setIsOffline(false);
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        switch (preset) {
          case 'S1': // Terbuka
            setActiveQuizId('quiz-open');
            setCurrentScreen('S1');
            // Set server time within open range: 09:25 WIB, closes at 12:00 WIB (~2.5h remaining)
            setServerTimeState(new Date('2026-11-23T09:25:00+07:00'));
            break;
          case 'S2': // Perlu Password
            setActiveQuizId('quiz-password');
            setCurrentScreen('S2');
            setServerTimeState(new Date('2026-11-23T09:25:00+07:00'));
            setPasswordInputState('');
            setPasswordError('');
            break;
          case 'S3': // Segera Ditutup (sisa waktu <= 60 mnt, sisa waktu < durasi pengerjaan)
            setActiveQuizId('quiz-closing-soon');
            setCurrentScreen('S3');
            // Set server time so remaining is ~8 minutes (closing at 09:33 WIB, duration is 12 mins)
            setServerTimeState(new Date('2026-11-23T09:25:00+07:00'));
            break;
          case 'S4': // Ditutup
            setActiveQuizId('quiz-closed');
            setCurrentScreen('S4');
            // Server time is after closeTime (18 Juni 2026 15:30 WIB)
            setServerTimeState(new Date('2026-11-23T09:25:00+07:00'));
            break;
          case 'S5': // Kesempatan Habis
            setActiveQuizId('quiz-no-attempt');
            setCurrentScreen('S5');
            break;
          case 'S6': // Belum Dibuka
            setActiveQuizId('quiz-not-open-yet');
            setCurrentScreen('S6');
            setServerTimeState(new Date('2026-11-23T09:25:00+07:00'));
            break;
          case 'S7': // Dashboard / Course View
            setCurrentScreen('S7');
            break;
          case 'S8': // Gagal Memuat / Offline
            setIsOffline(true);
            setCurrentScreen('S8');
            break;
        }
      }, 350);
    },
    []
  );

  // Export audit proof slip for FR-08
  const exportAuditProofSlip = useCallback(() => {
    const lines = [
      '==============================================================',
      '        BUKTI VERIFIKASI RIWAYAT AKSES KUIS (LMS UMM)',
      '           Fitur Quiz Clarity — Rekayasa Interaksi',
      '==============================================================',
      `Nama Mahasiswa  : ${MICROCOPY.header.profileName}`,
      `NIM             : ${MICROCOPY.header.profileNim}`,
      `Waktu Server    : ${formatWibDateTime(serverTime)}`,
      `Mata Kuliah     : ${activeQuiz.courseName} (${activeQuiz.courseCode})`,
      `Judul Kuis      : ${activeQuiz.title}`,
      `Status Terkini  : ${currentEvaluation.label}`,
      `Catatan Sistem  : ${currentEvaluation.bannerTitle}`,
      '--------------------------------------------------------------',
      'RIWAYAT 5 LOG AKSES TERAKHIR:',
      ...accessLogs.slice(0, 5).map(
        (l, i) =>
          `[${i + 1}] ${l.serverTimeFormatted} | [${l.statusLabel}] ${l.action} | IP: ${l.ipAddress}`
      ),
      '==============================================================',
      'Keterangan: Dokumen ini diterbitkan oleh modul Quiz Clarity LMS UMM',
      'sebagai bukti waktu akses resmi tanpa memerlukan screenshot manual.',
      '==============================================================',
    ];
    return lines.join('\n');
  }, [activeQuiz, serverTime, currentEvaluation, accessLogs]);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        activeQuizId,
        activeQuiz,
        currentScreen,
        serverTime,
        isTimeRunning,
        isOffline,
        isLoading,
        accessLogs,
        passwordInput,
        passwordError,
        isConfirmationModalOpen,
        isContactLecturerOpen,
        isAnnouncementModalOpen,
        isCourseDrawerOpen,
        isAuditLogModalOpen,
        mobileViewportMode,
        currentEvaluation,
        statusPerTimeText,
        setScreen,
        selectQuiz,
        setServerTime: setServerTimeState,
        advanceServerTime,
        toggleTimeRunning,
        toggleOffline,
        retryLoading,
        setPasswordInput,
        submitPassword,
        openConfirmationModal,
        closeConfirmationModal,
        confirmStartQuiz,
        cancelStartQuiz,
        finishAttempt,
        resetQuizAttempts,
        setMobileViewportMode,
        setIsContactLecturerOpen,
        setIsAnnouncementModalOpen,
        setIsCourseDrawerOpen,
        setIsAuditLogModalOpen,
        logAccess,
        applyPreset,
        exportAuditProofSlip,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export function useQuiz(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
