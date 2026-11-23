import React, { useState } from 'react';
import {
  Sliders,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Monitor,
  Clock,
  Wifi,
  WifiOff,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Plus,
  Minus,
  Key,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export const SimulatorControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    applyPreset,
    currentScreen,
    activeQuizId,
    advanceServerTime,
    toggleTimeRunning,
    isTimeRunning,
    toggleOffline,
    isOffline,
    mobileViewportMode,
    setMobileViewportMode,
    resetQuizAttempts,
    activeQuiz,
  } = useQuiz();

  return (
    <aside
      aria-label="Panel Simulator Pengujian"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 max-w-sm w-[92vw] sm:w-80 shadow-2xl transition-all select-none"
    >
      {/* Minimized Floating Pill or Header */}
      <div
        className={`bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-xl overflow-hidden transition-all ${
          isOpen ? 'ring-2 ring-red-500' : 'hover:bg-slate-800'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left touch-target focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-red-600 text-white">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <span className="font-extrabold text-xs sm:text-sm tracking-tight block">
                Simulator Pengujian PRD
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Uji 9 State (S1–S9) & Viewport
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-[11px] font-bold text-amber-400">
              {isOpen ? 'Tutup' : 'Buka'}
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="p-3.5 pt-2 border-t border-slate-800 bg-slate-950 text-xs space-y-3.5 max-h-[75vh] overflow-y-auto">
            {/* Viewport Frame Mode Toggle (UXR-04 Check) */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Simulasi Viewport (Prioritas Mobile-First)
              </span>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setMobileViewportMode(true)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-bold text-xs transition-colors touch-target ${
                    mobileViewportMode
                      ? 'bg-red-700 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>HP (360×640)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileViewportMode(false)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-bold text-xs transition-colors touch-target ${
                    !mobileViewportMode
                      ? 'bg-red-700 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop Responsif</span>
                </button>
              </div>
            </div>

            {/* State Matrix Presets (S1 - S8) */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Pilih Cepat State Layar (Bagian 12)
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => applyPreset('S1')}
                  className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/80 text-left text-emerald-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S1: Terbuka</span>
                  <span className="text-[10px] text-emerald-300">Normal 2.5 jam</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S2')}
                  className="p-2 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-800/80 text-left text-amber-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S2: Perlu Password</span>
                  <span className="text-[10px] text-amber-300">Inline input B4</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S3')}
                  className="p-2 rounded-lg bg-yellow-950/60 hover:bg-yellow-900 border border-yellow-800/80 text-left text-yellow-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S3: Segera Ditutup</span>
                  <span className="text-[10px] text-yellow-300">Sisa 8 mnt &lt; 12 mnt</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S4')}
                  className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-left text-rose-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S4: Ditutup</span>
                  <span className="text-[10px] text-rose-300">Lewat batas WIB</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S5')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left text-slate-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S5: Kesempatan Habis</span>
                  <span className="text-[10px] text-slate-400">1 dari 1 terpakai</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S6')}
                  className="p-2 rounded-lg bg-blue-950/60 hover:bg-blue-900 border border-blue-800/80 text-left text-blue-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S6: Belum Dibuka</span>
                  <span className="text-[10px] text-blue-300">Mulai besok 11 WIB</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S7')}
                  className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/80 text-left text-red-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S7: Dashboard MK</span>
                  <span className="text-[10px] text-red-300">Badge konsisten</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('S8')}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-left text-neutral-200 transition-colors touch-target"
                >
                  <span className="font-extrabold block text-xs">S8: Gagal Memuat</span>
                  <span className="text-[10px] text-neutral-400">Offline / error</span>
                </button>
              </div>
            </div>

            {/* Server Clock Controls */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Simulasi Waktu Server (WIB)
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  aria-label="Kurangi Waktu 1 Jam"
                  onClick={() => advanceServerTime(-60)}
                  className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] font-bold flex items-center gap-1 touch-target"
                >
                  <Minus className="w-3 h-3" /> 1 Jam
                </button>
                <button
                  type="button"
                  aria-label="Tambah Waktu 10 Menit"
                  onClick={() => advanceServerTime(10)}
                  className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] font-bold flex items-center gap-1 touch-target"
                >
                  <Plus className="w-3 h-3" /> 10 Mnt
                </button>
                <button
                  type="button"
                  aria-label="Tambah Waktu 1 Jam"
                  onClick={() => advanceServerTime(60)}
                  className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] font-bold flex items-center gap-1 touch-target"
                >
                  <Plus className="w-3 h-3" /> 1 Jam
                </button>
                <button
                  type="button"
                  onClick={toggleTimeRunning}
                  className={`p-1.5 rounded-lg font-bold text-xs flex items-center justify-center touch-target ${
                    isTimeRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  title={isTimeRunning ? 'Jeda waktu server' : 'Jalankan waktu server'}
                >
                  {isTimeRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Network & Attempts Reset */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleOffline}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 touch-target transition-colors ${
                  isOffline
                    ? 'bg-rose-700 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                <span>{isOffline ? 'Simulasi Offline ON' : 'Uji Offline (S8)'}</span>
              </button>

              <button
                type="button"
                onClick={() => resetQuizAttempts(activeQuiz.id)}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1 touch-target"
                title="Reset kesempatan kuis yang aktif"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Attempt</span>
              </button>
            </div>

            {/* Dummy Password Note */}
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Password Kuis S2:</span>{' '}
                <code className="text-white bg-slate-800 px-1 py-0.5 rounded font-mono">
                  DPL2026UMM
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
