/**
 * LMS UMM — QUIZ CLARITY LOGIC (BASELINE: PRD ONLY)
 * Implementasi Functional Requirements (FR-01 s.d FR-08) & State Matrix (S1 s.d S8 & S9)
 * Optimized for Mobile Gestures, Real-Time Countdown & Single Source of Truth
 */

(function () {
  'use strict';

  // --- STATE DEFINITIONS DARI PRD BAGIAN 12 & 13 ---
  const STATES = {
    S1: {
      id: 'S1',
      name: 'Terbuka (Open)',
      quizTitle: 'Quiz 1 MK DPL',
      crumbName: 'Quiz 1',
      token: 'status/open',
      bannerClass: 'state-open',
      label: 'TERBUKA',
      timerPrefix: 'ditutup dalam ',
      initialSeconds: 8073, // 02:14:33
      subtext: 'Kuis dapat dikerjakan sekarang. Pastikan koneksi stabil sebelum memulai.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
      ctaText: 'Mulai Mengerjakan',
      ctaEnabled: true,
      ctaReason: '',
      hasPassword: false,
      batasWaktu: 'Kamis, 18 Juni 2026 · 15.30 WIB',
      durasi: '12 Menit',
      sisaKesempatan: '1 dari 1',
      kesempatanHint: 'Tersedia untuk diambil',
      jumlahSoal: '20 Soal',
      showDurationWarning: false
    },
    S2: {
      id: 'S2',
      name: 'Perlu Password (Password Required)',
      quizTitle: 'Quiz 2 MK DPL — Arsitektur MVC',
      crumbName: 'Quiz 2',
      token: 'status/password-required',
      bannerClass: 'state-password-required',
      label: 'TERBUKA — PERLU PASSWORD',
      timerPrefix: 'ditutup dalam ',
      initialSeconds: 8073, // 02:14:33
      subtext: 'Kuis diproteksi password. Masukkan password resmi untuk mengaktifkan tombol mulai.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
      ctaText: 'Mulai Mengerjakan',
      ctaEnabled: false, // Menjadi true setelah password diverifikasi benar
      ctaReason: 'Masukkan password yang benar untuk mengaktifkan tombol pengerjaan.',
      hasPassword: true,
      batasWaktu: 'Kamis, 18 Juni 2026 · 15.30 WIB',
      durasi: '15 Menit',
      sisaKesempatan: '1 dari 1',
      kesempatanHint: 'Tersedia untuk diambil',
      jumlahSoal: '20 Soal',
      showDurationWarning: false
    },
    S3: {
      id: 'S3',
      name: 'Segera Ditutup (Closing Soon ≤ 60 mnt)',
      quizTitle: 'Quiz 3 MK DPL — Data Flow Diagram',
      crumbName: 'Quiz 3',
      token: 'status/closing-soon',
      bannerClass: 'state-closing-soon',
      label: 'SEGERA DITUTUP',
      timerPrefix: 'sisa ',
      initialSeconds: 2352, // 00:39:12
      subtext: 'Batas waktu kuis hampir habis. Segera mulai agar tidak kehilangan kesempatan.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H7M17 19H7M7 5l10 14M17 5L7 19"></path></svg>`,
      ctaText: 'Mulai Mengerjakan',
      ctaEnabled: true,
      ctaReason: '',
      hasPassword: false,
      batasWaktu: 'Hari Ini · Sisa 39 Menit',
      durasi: '12 Menit',
      sisaKesempatan: '1 dari 1',
      kesempatanHint: 'Tersedia untuk diambil',
      jumlahSoal: '20 Soal',
      showDurationWarning: true
    },
    S4: {
      id: 'S4',
      name: 'Ditutup (Closed)',
      quizTitle: 'Quiz 1 MK DPL (Susulan)',
      crumbName: 'Quiz Susulan',
      token: 'status/closed',
      bannerClass: 'state-closed',
      label: 'DITUTUP',
      timerPrefix: '',
      staticTimerText: 'sejak Kamis, 18 Juni 2026 · 15.30 WIB',
      subtext: 'Kuis ini sudah ditutup. Pengiriman jawaban baru tidak lagi diterima sistem.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
      ctaText: 'Belum Dapat Dikerjakan',
      ctaEnabled: false,
      ctaReason: 'Kuis ini sudah ditutup sejak Kamis, 18 Juni 2026 pukul 15.30 WIB, sehingga tidak dapat dikerjakan. Bila Anda memiliki izin susulan, hubungi dosen pengampu.',
      hasPassword: false,
      batasWaktu: '18 Juni 2026 · 15.30 WIB',
      durasi: '12 Menit',
      sisaKesempatan: '1 dari 1',
      kesempatanHint: 'Akses ditutup',
      jumlahSoal: '20 Soal',
      showDurationWarning: false
    },
    S5: {
      id: 'S5',
      name: 'Kesempatan Habis (No Attempts)',
      quizTitle: 'Pre-Test Analisis Perangkat Lunak',
      crumbName: 'Pre-Test',
      token: 'status/no-attempt',
      bannerClass: 'state-no-attempt',
      label: 'KESEMPATAN HABIS',
      timerPrefix: '',
      staticTimerText: '1 dari 1 digunakan',
      subtext: 'Anda telah menyelesaikan kuis ini. Evaluasi jawaban Anda telah tersimpan di LMS.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      ctaText: 'Belum Dapat Dikerjakan',
      ctaEnabled: false,
      ctaReason: 'Anda telah menggunakan seluruh kesempatan pengerjaan kuis ini (1 dari 1).',
      hasPassword: false,
      batasWaktu: 'Telah Ditutup',
      durasi: '12 Menit',
      sisaKesempatan: '0 dari 1',
      kesempatanHint: 'Telah digunakan',
      jumlahSoal: '20 Soal',
      showDurationWarning: false
    },
    S6: {
      id: 'S6',
      name: 'Belum Dibuka (Not Open Yet)',
      quizTitle: 'Evaluasi Tengah Semester MK DPL',
      crumbName: 'ETS DPL',
      token: 'status/not-open-yet',
      bannerClass: 'state-not-open-yet',
      label: 'BELUM DIBUKA',
      timerPrefix: '',
      staticTimerText: 'Mulai Kamis, 23 April 2026 · 11.00 WIB',
      subtext: 'Kuis belum memasuki waktu pengerjaan. Tombol akan aktif otomatis saat waktu server tiba.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      ctaText: 'Belum Dapat Dikerjakan',
      ctaEnabled: false,
      ctaReason: 'Kuis ini akan dibuka pada Kamis, 23 April 2026 pukul 11.00 WIB.',
      hasPassword: false,
      batasWaktu: 'Buka: 23 April 2026 · 11.00 WIB',
      durasi: '20 Menit',
      sisaKesempatan: '1 dari 1',
      kesempatanHint: 'Tersedia saat dibuka',
      jumlahSoal: '25 Soal',
      showDurationWarning: false
    },
    S8: {
      id: 'S8',
      name: 'Gagal Memuat / Offline (Unknown)',
      quizTitle: 'Quiz 1 MK DPL',
      crumbName: 'Quiz 1',
      token: 'status/unknown',
      bannerClass: 'state-unknown',
      label: 'STATUS BELUM DIMUAT',
      timerPrefix: '',
      staticTimerText: 'Gangguan Jaringan',
      subtext: 'Status kuis belum dapat dimuat. Periksa koneksi Anda, lalu coba muat ulang.',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      ctaText: 'Coba Muat Ulang',
      ctaEnabled: true,
      ctaReason: 'Status kuis belum dapat dimuat. Periksa koneksi Anda, lalu coba muat ulang.',
      hasPassword: false,
      batasWaktu: 'Tidak dapat memuat data',
      durasi: '- Menit',
      sisaKesempatan: '- dari 1',
      kesempatanHint: 'Data belum tersinkron',
      jumlahSoal: '- Soal',
      showDurationWarning: false
    }
  };

  // --- APPLICATION STATE ---
  let currentStateKey = 'S1';
  let passwordValidated = false;
  let activeCountdownSeconds = 0;
  let countdownTimerInterval = null;
  const CORRECT_PASSWORD = 'dpl2026';

  // Audit Logs (FR-08)
  const auditLogs = [
    { timestamp: '18/06/2026 15:28:10 WIB', status: 'TERBUKA', action: 'Membuka Halaman Detail Kuis', result: 'Valid (Tercatat)' },
    { timestamp: '18/06/2026 15:29:45 WIB', status: 'SEGERA DITUTUP', action: 'Mengisi Password Inline', result: 'Valid (Tercatat)' },
    { timestamp: '18/06/2026 15:30:02 WIB', status: 'DITUTUP', action: 'Menekan Tombol Mulai (Waktu Habis)', result: 'Ditolak Server (Tercatat)' }
  ];

  // DOM Elements
  const testerToolbar = document.getElementById('testerToolbar');
  const btnToggleTesterCollapse = document.getElementById('btnToggleTesterCollapse');
  const stateSelector = document.getElementById('stateSelector');
  const btnFastForward = document.getElementById('btnFastForward');
  const btnToggleViewport = document.getElementById('btnToggleViewport');
  const viewportWrapper = document.getElementById('viewportWrapper');
  const btnViewLog = document.getElementById('btnViewLog');

  // LMS Header & Nav
  const btnToggleDrawer = document.getElementById('btnToggleDrawer');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const lmsSidebar = document.getElementById('lmsSidebar');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const serverClockText = document.getElementById('serverClockText');
  const navBtnDashboard = document.getElementById('navBtnDashboard');
  const navBtnCourse = document.getElementById('navBtnCourse');
  const navLogo = document.getElementById('navLogo');
  const crumbCourseLink = document.getElementById('crumbCourseLink');
  const crumbQuizName = document.getElementById('crumbQuizName');
  const btnOpenFromDash = document.getElementById('btnOpenFromDash');
  const menuItemDPL = document.getElementById('menuItemDPL');

  // Views & Skeletons
  const viewQuizDetail = document.getElementById('viewQuizDetail');
  const viewDashboard = document.getElementById('viewDashboard');
  const skeletonLoading = document.getElementById('skeletonLoading');
  const quizContentWrapper = document.getElementById('quizContentWrapper');

  // Detail Quiz Elements (B1 - B7)
  const quizTitle = document.getElementById('quizTitle');
  const statusBanner = document.getElementById('statusBanner');
  const bannerIcon = document.getElementById('bannerIcon');
  const bannerLabel = document.getElementById('bannerLabel');
  const bannerTimer = document.getElementById('bannerTimer');
  const bannerSubtext = document.getElementById('bannerSubtext');
  const timeDurationWarning = document.getElementById('timeDurationWarning');
  const cardBatasWaktu = document.getElementById('cardBatasWaktu');
  const cardDurasi = document.getElementById('cardDurasi');
  const cardKesempatan = document.getElementById('cardKesempatan');
  const cardKesempatanHint = document.getElementById('cardKesempatanHint');
  const cardSoal = document.getElementById('cardSoal');
  const blockB4 = document.getElementById('blockB4');
  const inputQuizPassword = document.getElementById('inputQuizPassword');
  const btnTogglePasswordVisibility = document.getElementById('btnTogglePasswordVisibility');
  const btnSubmitPassword = document.getElementById('btnSubmitPassword');
  const passwordErrorMessage = document.getElementById('passwordErrorMessage');
  const linkPengumumanDosen = document.getElementById('linkPengumumanDosen');
  const btnMainCTA = document.getElementById('btnMainCTA');
  const ctaSubtext = document.getElementById('ctaSubtext');
  const btnToggleAccordion = document.getElementById('btnToggleAccordion');
  const accordionContent = document.getElementById('accordionContent');
  const btnHubungiDosen = document.getElementById('btnHubungiDosen');
  const btnKembaliMK = document.getElementById('btnKembaliMK');

  // Dashboard Elements (FR-02)
  const dashQuiz1Badge = document.getElementById('dashQuiz1Badge');
  const dashCardTimestamp = document.getElementById('dashCardTimestamp');

  // Modals
  const modalConfirmPreStart = document.getElementById('modalConfirmPreStart');
  const modalQuizName = document.getElementById('modalQuizName');
  const modalQuizDuration = document.getElementById('modalQuizDuration');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const btnProceedModal = document.getElementById('btnProceedModal');
  const modalContactLecturer = document.getElementById('modalContactLecturer');
  const btnCloseContactModal = document.getElementById('btnCloseContactModal');
  const btnCopyDraft = document.getElementById('btnCopyDraft');
  const txtMessageDraft = document.getElementById('txtMessageDraft');
  const modalAuditLog = document.getElementById('modalAuditLog');
  const btnCloseAuditModal = document.getElementById('btnCloseAuditModal');
  const auditTableBody = document.getElementById('auditTableBody');
  const modalExamSimulation = document.getElementById('modalExamSimulation');
  const btnFinishExamSim = document.getElementById('btnFinishExamSim');
  const examTimerDigits = document.getElementById('examTimerDigits');

  // --- INITIALIZATION ---
  function init() {
    startServerClock();
    setupEventListeners();
    renderState('S1', false);
    renderAuditTable();

    // Auto-collapse toolbar on very small screen so it doesn't take space
    if (window.innerWidth <= 480 && testerToolbar) {
      testerToolbar.classList.add('collapsed');
    }
  }

  // --- SERVER CLOCK (FR-01: Waktu Server Resmi WIB) ---
  function startServerClock() {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeStr = `${hours}.${minutes}.${seconds} WIB`;
      if (serverClockText) {
        serverClockText.textContent = timeStr;
      }
      if (dashCardTimestamp) {
        dashCardTimestamp.textContent = `Status per ${hours}.${minutes} WIB`;
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // --- FORMAT SECONDS KE STRING HH:MM:SS ---
  function formatCountdown(totalSec) {
    if (totalSec <= 0) return '00:00:00';
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // --- START REAL-TIME COUNTDOWN TIMER (FR-01, FR-06) ---
  function startCountdownTimer(initialSec, prefix) {
    clearInterval(countdownTimerInterval);
    activeCountdownSeconds = initialSec;
    bannerTimer.textContent = prefix + formatCountdown(activeCountdownSeconds);

    countdownTimerInterval = setInterval(() => {
      activeCountdownSeconds--;
      if (activeCountdownSeconds <= 0) {
        clearInterval(countdownTimerInterval);
        bannerTimer.textContent = 'WAKTU HABIS';
        // OTOMATIS BERPINDAH KE STATE S4 (Ditutup) TANPA REFRESH
        logAccess('Tenggat Waktu Tercapai (Otomatis Server)', 'DITUTUP');
        renderState('S4', false);
      } else {
        bannerTimer.textContent = prefix + formatCountdown(activeCountdownSeconds);
      }
    }, 1000);
  }

  // --- RENDER SCREEN STATE (DENGAN SKELETON LOADING UXR-07) ---
  function renderState(stateKey, withSkeleton = true) {
    currentStateKey = stateKey;
    const state = STATES[stateKey];
    if (!state) return;

    function applyState() {
      // Titles & Breadcrumbs
      if (quizTitle) quizTitle.textContent = state.quizTitle;
      if (crumbQuizName) crumbQuizName.textContent = state.crumbName;
      if (modalQuizName) modalQuizName.textContent = state.quizTitle;
      if (modalQuizDuration) modalQuizDuration.textContent = state.durasi;

      // Reset banner classes
      statusBanner.className = 'status-banner ' + state.bannerClass;
      bannerIcon.innerHTML = state.icon;
      bannerLabel.textContent = state.label;
      bannerSubtext.textContent = state.subtext;

      // Handle Countdown or Static Timer Text
      if (state.initialSeconds) {
        startCountdownTimer(state.initialSeconds, state.timerPrefix);
      } else {
        clearInterval(countdownTimerInterval);
        bannerTimer.textContent = state.staticTimerText || '';
      }

      // Warning bila sisa waktu < durasi pengerjaan (FR-06)
      if (state.showDurationWarning) {
        timeDurationWarning.style.display = 'flex';
      } else {
        timeDurationWarning.style.display = 'none';
      }

      // Kartu Informasi Penting (B3)
      cardBatasWaktu.textContent = state.batasWaktu;
      cardDurasi.textContent = state.durasi;
      cardKesempatan.textContent = state.sisaKesempatan;
      cardKesempatanHint.textContent = state.kesempatanHint;
      cardSoal.textContent = state.jumlahSoal;

      // Blok Password (B4)
      if (state.hasPassword) {
        blockB4.style.display = 'block';
        passwordValidated = false;
        inputQuizPassword.value = '';
        passwordErrorMessage.style.display = 'none';
        btnMainCTA.disabled = true;
        btnMainCTA.className = 'btn-cta btn-disabled';
        btnMainCTA.textContent = 'Masukkan Password Terlebih Dahulu';
        ctaSubtext.style.display = 'block';
        ctaSubtext.textContent = state.ctaReason;
      } else {
        blockB4.style.display = 'none';
        btnMainCTA.textContent = state.ctaText;
        btnMainCTA.disabled = !state.ctaEnabled;
        btnMainCTA.className = state.ctaEnabled ? 'btn-cta btn-primary' : 'btn-cta btn-disabled';
        
        if (!state.ctaEnabled && state.ctaReason) {
          ctaSubtext.style.display = 'block';
          ctaSubtext.textContent = state.ctaReason;
        } else {
          ctaSubtext.style.display = 'none';
          ctaSubtext.textContent = '';
        }
      }

      // Sync Dashboard Badge (FR-02: Single Source of Truth)
      updateDashboardBadge(stateKey);

      // Sync Selector jika dipicu eksternal
      if (stateSelector.value !== stateKey) {
        stateSelector.value = stateKey;
      }
    }

    if (withSkeleton && skeletonLoading && quizContentWrapper) {
      skeletonLoading.style.display = 'flex';
      quizContentWrapper.style.display = 'none';
      setTimeout(() => {
        applyState();
        skeletonLoading.style.display = 'none';
        quizContentWrapper.style.display = 'block';
      }, 300);
    } else {
      if (skeletonLoading) skeletonLoading.style.display = 'none';
      if (quizContentWrapper) quizContentWrapper.style.display = 'block';
      applyState();
    }
  }

  // --- UPDATE DASHBOARD BADGE (FR-02) ---
  function updateDashboardBadge(stateKey) {
    const state = STATES[stateKey];
    if (!state || !dashQuiz1Badge) return;

    let badgeClass = 'badge-status-pill ';
    let icon = '';

    if (stateKey === 'S1') {
      badgeClass += 'badge-open';
      icon = '✓';
    } else if (stateKey === 'S2') {
      badgeClass += 'badge-pwd';
      icon = '🔒';
    } else if (stateKey === 'S3') {
      badgeClass += 'badge-closing';
      icon = '⏳';
    } else if (stateKey === 'S4') {
      badgeClass += 'badge-closed';
      icon = '✕';
    } else if (stateKey === 'S5') {
      badgeClass += 'badge-neutral';
      icon = '⊘';
    } else if (stateKey === 'S6') {
      badgeClass += 'badge-neutral';
      icon = '⏱';
    } else {
      badgeClass += 'badge-neutral';
      icon = '?';
    }

    dashQuiz1Badge.className = badgeClass;
    dashQuiz1Badge.innerHTML = `<span>${icon}</span> <span>${state.label}</span>`;
  }

  // --- PASSWORD VERIFICATION (FR-03 & Bagian 15) ---
  function verifyPassword() {
    const val = inputQuizPassword.value.trim();
    if (val === CORRECT_PASSWORD) {
      passwordValidated = true;
      passwordErrorMessage.style.display = 'none';
      btnMainCTA.disabled = false;
      btnMainCTA.className = 'btn-cta btn-primary';
      btnMainCTA.textContent = 'Mulai Mengerjakan';
      ctaSubtext.style.display = 'none';

      // Log aktivitas
      logAccess('Password Benar dimasukkan', 'TERBUKA (Password Verified)');
      
      // Auto open confirmation modal
      openModal(modalConfirmPreStart);
    } else {
      passwordValidated = false;
      passwordErrorMessage.style.display = 'flex';
      btnMainCTA.disabled = true;
      btnMainCTA.className = 'btn-cta btn-disabled';
      btnMainCTA.textContent = 'Masukkan Password Terlebih Dahulu';
      ctaSubtext.style.display = 'block';
      ctaSubtext.textContent = 'Password belum sesuai. Silakan periksa kembali.';

      // Log aktivitas
      logAccess('Percobaan Password Salah', 'Ditolak');
    }
  }

  // --- AUDIT LOGGING (FR-08) ---
  function logAccess(action, status) {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} WIB`;
    auditLogs.unshift({
      timestamp: `${dateStr} ${timeStr}`,
      status: status || STATES[currentStateKey].label,
      action: action,
      result: 'Tercatat Resmi'
    });
    renderAuditTable();
  }

  function renderAuditTable() {
    if (!auditTableBody) return;
    auditTableBody.innerHTML = '';
    auditLogs.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.timestamp}</strong></td>
        <td><span class="audit-badge ${item.status.includes('DITUTUP') ? 'badge-closed' : 'badge-open'}">${item.status}</span></td>
        <td>${item.action}</td>
        <td><span style="color:#059669; font-weight:700;">✓ ${item.result}</span></td>
      `;
      auditTableBody.appendChild(tr);
    });
  }

  // --- MODAL UTILITIES (Semantic <dialog> & Mobile Safe) ---
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.removeAttribute('hidden');
    if (typeof modalEl.showModal === 'function') {
      try {
        if (!modalEl.open) {
          modalEl.showModal();
        }
      } catch (e) {
        modalEl.setAttribute('open', '');
      }
    } else {
      modalEl.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden'; // cegah background scrolling di mobile
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    if (typeof modalEl.close === 'function') {
      try {
        if (modalEl.open) {
          modalEl.close();
        }
      } catch (e) {
        modalEl.removeAttribute('open');
      }
    } else {
      modalEl.removeAttribute('open');
    }
    modalEl.setAttribute('hidden', 'true');
    document.body.style.overflow = '';
  }

  // --- EXAM SIMULATION (TIMER HITUNG MUNDUR) ---
  let examTimerInterval = null;
  function startExamSimulation() {
    closeModal(modalConfirmPreStart);
    openModal(modalExamSimulation);
    logAccess('Memulai Pengerjaan Kuis (Attempt #1)', 'BERLANGSUNG');

    let secondsLeft = 12 * 60; // 12 Menit
    function tick() {
      const m = Math.floor(secondsLeft / 60);
      const s = secondsLeft % 60;
      examTimerDigits.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      if (secondsLeft <= 0) {
        clearInterval(examTimerInterval);
        finishExam();
      }
      secondsLeft--;
    }
    clearInterval(examTimerInterval);
    tick();
    examTimerInterval = setInterval(tick, 1000);
  }

  function finishExam() {
    clearInterval(examTimerInterval);
    closeModal(modalExamSimulation);
    logAccess('Mengirim Jawaban Kuis (Selesai)', 'SELESAI');
    alert('Kuis berhasil diselesaikan dan nilai telah tersimpan di LMS UMM.');
    // Ubah state menjadi S5 (Kesempatan Habis)
    renderState('S5', true);
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // 0. Toggle Collapse Tester Toolbar
    if (btnToggleTesterCollapse) {
      btnToggleTesterCollapse.addEventListener('click', () => {
        testerToolbar.classList.toggle('collapsed');
      });
    }

    // 1. Selector State PRD
    stateSelector.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'S7') {
        switchView('dashboard');
      } else {
        switchView('quizDetail');
        renderState(val, true);
      }
    });

    // 2. Fast Forward Waktu Habis (Simulasi Otomatis Tanpa Refresh FR-01)
    if (btnFastForward) {
      btnFastForward.addEventListener('click', () => {
        switchView('quizDetail');
        // Set ke S3 lalu hitung mundur 3 detik langsung habis
        renderState('S3', false);
        activeCountdownSeconds = 3;
        bannerTimer.textContent = 'sisa 00:00:03 (Simulasi...)';
      });
    }

    // 3. Toggle Viewport Frame (360x640 Mobile Simulation)
    btnToggleViewport.addEventListener('click', () => {
      const isMobileFrame = viewportWrapper.classList.toggle('mode-mobile-frame');
      btnToggleViewport.classList.toggle('active', isMobileFrame);
      btnToggleViewport.querySelector('.tool-text').textContent = isMobileFrame ? 'Desktop Mode' : 'Frame 360×640';
    });

    // 4. View Log Akses (FR-08)
    btnViewLog.addEventListener('click', () => {
      openModal(modalAuditLog);
    });

    // 5. Drawer Toggle (Mobile Navigation)
    btnToggleDrawer.addEventListener('click', () => {
      lmsSidebar.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    btnCloseDrawer.addEventListener('click', closeDrawer);
    drawerBackdrop.addEventListener('click', closeDrawer);
    if (menuItemDPL) {
      menuItemDPL.addEventListener('click', () => {
        closeDrawer();
        switchView('quizDetail');
      });
    }

    function closeDrawer() {
      lmsSidebar.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    // 6. Accordion Instruksi Dosen (B6)
    btnToggleAccordion.addEventListener('click', () => {
      const expanded = btnToggleAccordion.getAttribute('aria-expanded') === 'true';
      btnToggleAccordion.setAttribute('aria-expanded', !expanded);
      if (expanded) {
        accordionContent.setAttribute('hidden', 'true');
      } else {
        accordionContent.removeAttribute('hidden');
      }
    });

    // 7. Password Visibility Toggle
    btnTogglePasswordVisibility.addEventListener('click', () => {
      const isPassword = inputQuizPassword.getAttribute('type') === 'password';
      inputQuizPassword.setAttribute('type', isPassword ? 'text' : 'password');
    });

    // 8. Password Check on button click or Enter key
    btnSubmitPassword.addEventListener('click', verifyPassword);
    inputQuizPassword.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        verifyPassword();
      }
    });

    // 9. Tautan Pengumuman Dosen
    linkPengumumanDosen.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Pengumuman Dosen (WhatsApp Grup MK DPL A):\n"Password pengerjaan kuis ini adalah: dpl2026. Kerjakan dengan teliti."');
    });

    // 10. CTA Utama (Mulai Mengerjakan / Coba Muat Ulang)
    btnMainCTA.addEventListener('click', () => {
      if (currentStateKey === 'S8') {
        // Coba muat ulang: pulihkan ke state S1
        btnMainCTA.textContent = 'Memuat status server...';
        setTimeout(() => {
          renderState('S1', true);
          logAccess('Muat Ulang Berhasil', 'TERBUKA');
        }, 500);
        return;
      }

      if (currentStateKey === 'S1' || currentStateKey === 'S3' || (currentStateKey === 'S2' && passwordValidated)) {
        // Buka Modal Konfirmasi Pra-Mulai (FR-07)
        openModal(modalConfirmPreStart);
      }
    });

    // 11. Modal Konfirmasi Pra-Mulai (FR-07)
    btnCancelModal.addEventListener('click', () => {
      closeModal(modalConfirmPreStart);
      logAccess('Membatalkan Konfirmasi Mulai', STATES[currentStateKey].label);
    });

    btnProceedModal.addEventListener('click', startExamSimulation);

    // 12. Modal Hubungi Dosen (FR-05)
    btnHubungiDosen.addEventListener('click', () => {
      openModal(modalContactLecturer);
      logAccess('Membuka Bantuan Hubungi Dosen', STATES[currentStateKey].label);
    });

    btnCloseContactModal.addEventListener('click', () => {
      closeModal(modalContactLecturer);
    });

    btnCopyDraft.addEventListener('click', () => {
      txtMessageDraft.select();
      navigator.clipboard.writeText(txtMessageDraft.value).then(() => {
        alert('Teks draf pesan berhasil disalin ke clipboard! Anda dapat menempelkannya di WhatsApp atau Email Dosen.');
      }).catch(() => {
        alert('Teks berhasil disorot, silakan tekan Ctrl+C untuk menyalin.');
      });
    });

    // 13. Modal Riwayat Akses
    btnCloseAuditModal.addEventListener('click', () => {
      closeModal(modalAuditLog);
    });

    // 14. Selesaikan Simulasi Ujian
    btnFinishExamSim.addEventListener('click', finishExam);

    // 15. Dialog native escape cancel handler
    [modalConfirmPreStart, modalContactLecturer, modalAuditLog, modalExamSimulation].forEach(dialog => {
      if (dialog) {
        dialog.addEventListener('cancel', () => {
          closeModal(dialog);
        });
      }
    });

    // 16. Navigasi Antar Halaman (FR-02)
    navBtnDashboard.addEventListener('click', () => switchView('dashboard'));
    navBtnCourse.addEventListener('click', () => switchView('quizDetail'));
    navLogo.addEventListener('click', () => switchView('quizDetail'));
    crumbCourseLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
    });
    btnKembaliMK.addEventListener('click', () => switchView('dashboard'));
    btnOpenFromDash.addEventListener('click', () => {
      switchView('quizDetail');
      renderState(currentStateKey, true);
    });

    // 17. Multi-Quiz Dashboard State Triggers (Point 4 & 9)
    document.querySelectorAll('[data-open-state]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetState = btn.getAttribute('data-open-state');
        switchView('quizDetail');
        renderState(targetState, true);
      });
    });
  }

  // --- SWITCH VIEW (Quiz Detail vs Dashboard) ---
  function switchView(viewName) {
    if (viewName === 'dashboard') {
      viewQuizDetail.style.display = 'none';
      viewDashboard.style.display = 'block';
      navBtnDashboard.classList.add('active');
      navBtnCourse.classList.remove('active');
      updateDashboardBadge(currentStateKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      viewDashboard.style.display = 'none';
      viewQuizDetail.style.display = 'block';
      navBtnCourse.classList.add('active');
      navBtnDashboard.classList.remove('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Jalankan saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
