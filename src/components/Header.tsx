import React from 'react';
import {
  Menu,
  Clock,
  Wifi,
  WifiOff,
  History,
  BookOpen,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { MICROCOPY } from '../constants/microcopy';

export const Header: React.FC = () => {
  const {
    serverTime,
    isOffline,
    isTimeRunning,
    setIsCourseDrawerOpen,
    setIsAuditLogModalOpen,
    setScreen,
    currentScreen,
  } = useQuiz();

  const formattedHours = String(serverTime.getHours()).padStart(2, '0');
  const formattedMinutes = String(serverTime.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(serverTime.getSeconds()).padStart(2, '0');

  return (
    <header className="bg-red-800 text-white shadow-md sticky top-0 z-30 border-b border-red-900 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Left: Mobile Drawer Trigger & UMM LMS Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsCourseDrawerOpen(true)}
            aria-label="Buka menu mata kuliah dan navigasi"
            className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-red-700 active:bg-red-900 touch-target focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          <button
            type="button"
            onClick={() => setScreen('S7')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-black text-amber-300 text-sm tracking-wider shadow-inner group-hover:bg-white/20 transition-colors">
              UMM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight leading-tight">
                  LMS UMM
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-400 text-red-950">
                  Quiz Clarity
                </span>
              </div>
              <p className="text-[11px] text-red-100/90 leading-tight hidden xs:block">
                Universitas Muhammadiyah Malang
              </p>
            </div>
          </button>
        </div>

        {/* Center: Live Server Time (Explicit WIB) */}
        <div className="flex items-center gap-1.5 bg-red-950/70 border border-red-700/60 rounded-full px-2.5 py-1 text-xs text-red-50 shadow-inner">
          <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="font-mono font-semibold tracking-wide text-xs">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}{' '}
            <span className="text-amber-300 font-bold">WIB</span>
          </span>
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isTimeRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
            title={isTimeRunning ? 'Server ticking' : 'Server paused'}
          />
        </div>

        {/* Right: Network Status, FR-08 Audit History & User Info */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Network Indicator */}
          {isOffline ? (
            <span
              title="Koneksi Offline (Simulasi)"
              className="flex items-center gap-1 text-[11px] font-bold text-rose-200 bg-rose-950/80 border border-rose-600/80 px-2 py-1 rounded-full animate-pulse"
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Offline</span>
            </span>
          ) : (
            <span
              title="Koneksi Server Online"
              className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-200 bg-emerald-950/50 border border-emerald-600/50 px-2 py-0.5 rounded-full"
            >
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span>Server Online</span>
            </span>
          )}

          {/* FR-08 Quick Action Button */}
          <button
            type="button"
            onClick={() => setIsAuditLogModalOpen(true)}
            title="Riwayat Akses Kuis (FR-08)"
            aria-label="Buka Riwayat Akses Kuis (FR-08)"
            className="flex items-center justify-center p-2 rounded-lg bg-red-900/60 hover:bg-red-700 active:bg-red-950 border border-red-700/60 touch-target focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <History className="w-4 h-4 text-red-100" />
            <span className="hidden sm:inline-block ml-1.5 text-xs font-semibold text-red-100">
              Riwayat (FR-08)
            </span>
          </button>

          {/* Quick link back to course list */}
          <button
            type="button"
            onClick={() => setScreen('S7')}
            title="Daftar Kuis Mata Kuliah"
            className={`hidden md:flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors touch-target ${
              currentScreen === 'S7'
                ? 'bg-white text-red-900 border-white'
                : 'bg-red-900/60 text-white border-red-700/60 hover:bg-red-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mata Kuliah</span>
          </button>

          {/* Student Profile (Persona Rian Pratama) */}
          <div className="flex items-center gap-1.5 pl-1 sm:pl-2 border-l border-red-700/70">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-red-950 font-extrabold flex items-center justify-center text-xs shadow border border-amber-300">
              RP
            </div>
            <div className="hidden lg:block text-left text-[11px] leading-tight">
              <p className="font-bold text-white leading-none">
                {MICROCOPY.header.profileName}
              </p>
              <p className="text-red-200 text-[10px]">
                {MICROCOPY.header.profileNim}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
