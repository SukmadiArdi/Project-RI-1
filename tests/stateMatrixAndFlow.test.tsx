import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { App } from '../src/App';
import { MICROCOPY } from '../src/constants/microcopy';

describe('End-to-End User Flow & Edge Cases (Persona Rian Pratama)', () => {
  it('S2 flow: Wrong password rejects and displays error; correct password unlocks S9 modal', async () => {
    render(<App />);

    // Open simulator panel
    const simButton = screen.getByText(/Simulator Pengujian PRD/i);
    fireEvent.click(simButton);

    // Switch to S2: Perlu Password
    const s2Preset = screen.getByText(/S2: Perlu Password/i);
    fireEvent.click(s2Preset);

    // Fast-forward timeout for preset
    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    // Verify inline password block is rendered
    expect(screen.getByText('Password Kuis')).toBeDefined();
    expect(screen.getByText(MICROCOPY.passwordBlock.link)).toBeDefined();

    const passwordInput = screen.getByPlaceholderText(MICROCOPY.passwordBlock.inputPlaceholder);
    const startButton = screen.getByText(MICROCOPY.cta.start);

    // Try wrong password
    fireEvent.change(passwordInput, { target: { value: 'passwordSalah123' } });
    fireEvent.click(startButton);

    // Error message must be visible
    expect(screen.getByText(MICROCOPY.passwordBlock.error)).toBeDefined();
    // Modal S9 must NOT be open
    expect(screen.queryByText(MICROCOPY.modalConfirmation.title)).toBeNull();

    // Now enter correct password
    fireEvent.change(passwordInput, { target: { value: 'DPL2026UMM' } });
    fireEvent.click(startButton);

    // S9 modal opens
    expect(screen.getByText(MICROCOPY.modalConfirmation.title)).toBeDefined();
  });

  it('S4 flow: Closed quiz has disabled button and allows contacting lecturer with template', async () => {
    render(<App />);

    const simButton = screen.getByText(/Simulator Pengujian PRD/i);
    fireEvent.click(simButton);

    const s4Preset = screen.getByText(/S4: Ditutup/i);
    fireEvent.click(s4Preset);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    // Check disabled button
    expect(screen.getByText(MICROCOPY.cta.notReady)).toBeDefined();

    // Check reason contains Indonesian WIB closing info
    expect(screen.getByText(/Kuis ini sudah ditutup sejak/i)).toBeDefined();

    // Click Hubungi Dosen
    const contactBtns = screen.getAllByText(MICROCOPY.cta.contactLecturer);
    fireEvent.click(contactBtns[0]);

    // Modal Hubungi Dosen is opened
    expect(screen.getByText('Hubungi Dosen Pengampu')).toBeDefined();
    expect(screen.getByText(/Template Pesan Klarifikasi/i)).toBeDefined();
    expect(screen.getAllByText('Dr. Ir. Wahyudi, M.T.').length).toBeGreaterThan(0);
  });

  it('S7 flow: Course page shows quizzes with single source of truth badges and timestamp', async () => {
    render(<App />);

    const simButton = screen.getByText(/Simulator Pengujian PRD/i);
    fireEvent.click(simButton);

    const s7Preset = screen.getByText(/S7: Dashboard MK/i);
    fireEvent.click(s7Preset);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    // Verify Course Title
    expect(screen.getByText('Desain Perangkat Lunak A')).toBeDefined();
    // Verify Single Source of Truth timestamp indicator
    expect(screen.getByText(/Status per .* WIB/i)).toBeDefined();
    // Verify quiz cards
    expect(screen.getByText(/Quiz 1 MK DPL — Konsep Dasar Arsitektur Perangkat Lunak/i)).toBeDefined();
  });

  it('FR-01: Time travel past deadline automatically updates state to closed without refresh', async () => {
    render(<App />);

    // Start with S1
    const simButton = screen.getByText(/Simulator Pengujian PRD/i);
    fireEvent.click(simButton);

    const s1Preset = screen.getByText(/S1: Terbuka/i);
    fireEvent.click(s1Preset);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    // Advance server time by +1 hour 3 times to pass 12:00 WIB
    const plus1Hour = screen.getByLabelText(/Tambah Waktu 1 Jam/i);
    fireEvent.click(plus1Hour);
    fireEvent.click(plus1Hour);
    fireEvent.click(plus1Hour);

    // State automatically transitions to DITUTUP
    expect(screen.getAllByText(/DITUTUP sejak/i).length).toBeGreaterThan(0);
    expect(screen.getByText(MICROCOPY.cta.notReady)).toBeDefined();
  });
});
