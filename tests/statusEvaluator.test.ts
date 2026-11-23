import { describe, it, expect } from 'vitest';
import { evaluateQuizStatus } from '../src/utils/statusEvaluator';
import { INITIAL_QUIZZES } from '../src/data/mockQuizzes';
import { MICROCOPY } from '../src/constants/microcopy';
import { formatWibDateTime, formatCountdown } from '../src/utils/dateFormatter';

describe('Quiz Clarity Status Evaluation (S1 - S8)', () => {
  const baseQuiz = INITIAL_QUIZZES[0]; // quiz-open: open 08:00 WIB, close 12:00 WIB

  it('S1: Evaluates to TERBUKA (open) when server time is well within open interval', () => {
    // 09:25 WIB on same day -> remaining ~2.5 hours
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(baseQuiz, serverTime, false);

    expect(result.token).toBe('status/open');
    expect(result.label).toBe('TERBUKA');
    expect(result.canAttempt).toBe(true);
    expect(result.isClosingSoon).toBe(false);
    expect(result.bannerTitle).toContain('TERBUKA — ditutup dalam');
  });

  it('S2: Evaluates to PERLU PASSWORD when quiz requires password and open', () => {
    const passwordQuiz = INITIAL_QUIZZES[1]; // quiz-password
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(passwordQuiz, serverTime, false);

    expect(result.token).toBe('status/password-required');
    expect(result.label).toBe('PERLU PASSWORD');
    expect(result.canAttempt).toBe(true);
    expect(passwordQuiz.passwordRequired).toBe(true);
    expect(passwordQuiz.correctPassword).toBe('DPL2026UMM');
  });

  it('S3: Evaluates to SEGERA DITUTUP when remaining time <= 60 minutes and triggers duration warning', () => {
    const closingQuiz = INITIAL_QUIZZES[2]; // closes at 09:33 WIB, duration 12 mins
    // server time 09:25 WIB -> 8 minutes remaining (< 12 mins duration!)
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(closingQuiz, serverTime, false);

    expect(result.token).toBe('status/closing-soon');
    expect(result.label).toBe('SEGERA DITUTUP');
    expect(result.isClosingSoon).toBe(true);
    expect(result.isTimeShorterThanDuration).toBe(true);
    expect(result.bannerSubtitle).toBe(MICROCOPY.statusMessages.timeWarning);
    expect(result.canAttempt).toBe(true);
  });

  it('S4: Evaluates to DITUTUP when server time passes deadline', () => {
    const closedQuiz = INITIAL_QUIZZES[3]; // closed 2026-06-18 15:30 WIB
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(closedQuiz, serverTime, false);

    expect(result.token).toBe('status/closed');
    expect(result.label).toBe('DITUTUP');
    expect(result.canAttempt).toBe(false);
    expect(result.bannerTitle).toContain('DITUTUP sejak');
    expect(result.bannerTitle).toContain('WIB');
    expect(result.reasonDisabled).toBeDefined();
    // Microcopy check: no technical english "This quiz closed"
    expect(result.reasonDisabled).not.toContain('This quiz closed');
    expect(result.reasonDisabled).toContain('Kuis ini sudah ditutup sejak');
  });

  it('S5: Evaluates to KESEMPATAN HABIS when userAttempts >= maxAttempts', () => {
    const noAttemptQuiz = INITIAL_QUIZZES[4]; // max 1, used 1
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(noAttemptQuiz, serverTime, false);

    expect(result.token).toBe('status/no-attempt');
    expect(result.label).toBe('KESEMPATAN HABIS');
    expect(result.canAttempt).toBe(false);
    expect(result.bannerTitle).toContain('KESEMPATAN HABIS — 1 dari 1 digunakan');
    expect(result.reasonDisabled).toBe(MICROCOPY.statusMessages.noAttempt);
  });

  it('S6: Evaluates to BELUM DIBUKA when server time is before open time', () => {
    const futureQuiz = INITIAL_QUIZZES[5]; // opens 2026-11-24 11:00 WIB
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(futureQuiz, serverTime, false);

    expect(result.token).toBe('status/not-open-yet');
    expect(result.label).toBe('BELUM DIBUKA');
    expect(result.canAttempt).toBe(false);
    expect(result.bannerTitle).toContain('BELUM DIBUKA — Mulai');
    expect(result.bannerTitle).toContain('WIB');
  });

  it('S8: Evaluates to STATUS BELUM DIMUAT when offline', () => {
    const serverTime = new Date('2026-11-23T09:25:00+07:00');
    const result = evaluateQuizStatus(baseQuiz, serverTime, true);

    expect(result.token).toBe('status/unknown');
    expect(result.label).toBe('STATUS BELUM DIMUAT');
    expect(result.canAttempt).toBe(false);
    expect(result.reasonDisabled).toBe(MICROCOPY.statusMessages.loadFailed);
  });
});
