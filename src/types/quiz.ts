export type QuizStatusToken =
  | 'status/open'
  | 'status/closing-soon'
  | 'status/closed'
  | 'status/not-open-yet'
  | 'status/no-attempt'
  | 'status/password-required'
  | 'status/unknown';

export type ScreenStateId =
  | 'S1' // Open
  | 'S2' // Password Required
  | 'S3' // Closing Soon
  | 'S4' // Closed
  | 'S5' // No Attempt
  | 'S6' // Not Open Yet
  | 'S7' // Dashboard / Course View
  | 'S8' // Unknown / Load Failed
  | 'S9' // Pre-start Confirmation Modal
  | 'ATTEMPT' // Active Quiz Simulation
  | 'LOGS'; // FR-08 Access History Log

export interface QuizItem {
  id: string;
  code: string;
  title: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  openTime: string; // ISO string
  closeTime: string; // ISO string
  durationMinutes: number;
  maxAttempts: number;
  userAttempts: number;
  questionCount: number;
  passwordRequired: boolean;
  correctPassword?: string;
  lecturerInstructions: string;
  lecturerAnnouncement: string;
  lecturerName: string;
  lecturerContact: string; // WhatsApp / Email
  userScore?: number;
  lastAttemptDate?: string;
}

export interface AccessLogEntry {
  id: string;
  timestamp: string; // ISO
  serverTimeFormatted: string; // WIB
  quizId: string;
  quizTitle: string;
  statusAtAccess: QuizStatusToken;
  statusLabel: string;
  action: string;
  ipAddress: string;
  device: string;
  note: string;
}

export interface StatusEvaluation {
  token: QuizStatusToken;
  label: string;
  bannerTitle: string;
  bannerSubtitle?: string;
  canAttempt: boolean;
  isClosingSoon: boolean;
  isTimeShorterThanDuration: boolean;
  remainingSeconds: number;
  secondsUntilOpen: number;
  reasonDisabled?: string;
}
