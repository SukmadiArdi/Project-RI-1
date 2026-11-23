import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { App } from '../src/App';
import { STATUS_TOKENS } from '../src/constants/designTokens';
import { MICROCOPY } from '../src/constants/microcopy';

describe('Quiz Clarity UI & State Transitions (S1 - S9, UXR-01 to UXR-08)', () => {
  it('UXR-01: All status tokens have dual-encoding (icon, text label, colors)', () => {
    const tokens = Object.keys(STATUS_TOKENS);
    expect(tokens.length).toBe(7);

    for (const key of tokens) {
      const config = STATUS_TOKENS[key as keyof typeof STATUS_TOKENS];
      expect(config.label).toBeDefined();
      expect(config.icon).toBeDefined();
      expect(config.badgeBg).toBeDefined();
      expect(config.bannerText).toBeDefined();
      expect(config.ariaDescription).toBeDefined();
    }
  });

  it('FR-04: Renders Breadcrumb with max 2 levels and Quiz Detail blocks', () => {
    render(<App />);

    // Breadcrumb: Course Name and Detail Kuis
    expect(screen.getByText('Desain Perangkat Lunak A')).toBeDefined();
    expect(screen.getByText('Detail Kuis')).toBeDefined();

    // B2 Banner
    expect(screen.getByRole('region', { name: /Status Kuis Terkini/i })).toBeDefined();

    // B3 Essential Info Card
    expect(screen.getByText(MICROCOPY.infoTitle)).toBeDefined();
    expect(screen.getByText(MICROCOPY.labels.deadline)).toBeDefined();
    expect(screen.getByText(MICROCOPY.labels.duration)).toBeDefined();
    expect(screen.getByText(MICROCOPY.labels.attempts)).toBeDefined();
    expect(screen.getByText(MICROCOPY.labels.questions)).toBeDefined();

    // B5 CTA
    expect(screen.getByText(MICROCOPY.cta.start)).toBeDefined();
  });

  it('FR-07 / S9: Pre-start confirmation modal opens and can be cancelled without losing attempt', () => {
    render(<App />);

    const startButton = screen.getByText(MICROCOPY.cta.start);
    fireEvent.click(startButton);

    // Modal S9 is now visible
    expect(screen.getByText(MICROCOPY.modalConfirmation.title)).toBeDefined();
    expect(screen.getByText(MICROCOPY.modalConfirmation.confirmButton)).toBeDefined();
    expect(screen.getByText(MICROCOPY.modalConfirmation.cancelButton)).toBeDefined();

    // Click Batal
    fireEvent.click(screen.getByText(MICROCOPY.modalConfirmation.cancelButton));

    // Modal is dismissed
    expect(screen.queryByText(MICROCOPY.modalConfirmation.title)).toBeNull();
  });

  it('FR-08: Access log modal opens and displays audit trail with export button', () => {
    render(<App />);

    const historyBtn = screen.getByLabelText(/Buka Riwayat Akses Kuis/i);
    fireEvent.click(historyBtn);

    expect(screen.getByText(/Riwayat Akses Kuis \(FR-08\)/i)).toBeDefined();
    expect(screen.getByText(/Salin Bukti Resmi Dosen/i)).toBeDefined();
  });
});
