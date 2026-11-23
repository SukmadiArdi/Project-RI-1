import React, { useState } from 'react';
import { Key, Eye, EyeOff, AlertCircle, ExternalLink } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { MICROCOPY } from '../../constants/microcopy';

export const B4_PasswordBlock: React.FC = () => {
  const {
    activeQuiz,
    passwordInput,
    passwordError,
    setPasswordInput,
    setIsAnnouncementModalOpen,
    currentEvaluation,
  } = useQuiz();

  const [showPassword, setShowPassword] = useState(false);

  // Hanya tampil jika kuis memerlukan password (FR-03)
  if (!activeQuiz.passwordRequired) {
    return null;
  }

  // Jika kuis sudah ditutup atau kesempatan habis, password input tidak perlu aktif
  const isReadOnly =
    currentEvaluation.token === 'status/closed' ||
    currentEvaluation.token === 'status/no-attempt' ||
    currentEvaluation.token === 'status/unknown';

  return (
    <div className="mx-3 sm:mx-4 mb-2.5">
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 sm:p-3 shadow-xs">
        {/* Label & Prompt */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <label
            htmlFor="quiz-password-input"
            className="text-xs font-bold text-amber-950 flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-amber-700" />
            <span>Password Kuis</span>
          </label>

          {/* Tautan pengumuman dosen sesuai FR-03 & Bagian 14 */}
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="text-xs font-semibold text-red-700 hover:text-red-900 underline flex items-center gap-1 touch-target focus:outline-none"
          >
            <span>{MICROCOPY.passwordBlock.link}</span>
            <ExternalLink className="w-3 h-3 text-red-700" />
          </button>
        </div>

        <p className="text-xs text-amber-900/90 mb-2 leading-relaxed">
          {MICROCOPY.passwordBlock.prompt}
        </p>

        {/* Inline Password Input */}
        <div className="relative">
          <input
            id="quiz-password-input"
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            disabled={isReadOnly}
            placeholder={MICROCOPY.passwordBlock.inputPlaceholder}
            className={`w-full text-sm font-mono px-3 py-2 pr-10 rounded-lg border bg-white focus:outline-none transition-colors touch-target ${
              passwordError
                ? 'border-rose-400 ring-2 ring-rose-200 text-rose-950'
                : 'border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 text-slate-900'
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
            aria-describedby={passwordError ? 'password-error-message' : undefined}
          />

          <button
            type="button"
            disabled={isReadOnly}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-md focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Error message spesifik jika password salah sesuai Bagian 14 */}
        {passwordError && (
          <div
            id="password-error-message"
            role="alert"
            className="mt-2 p-2 bg-rose-100/90 border border-rose-300 rounded-lg flex items-start gap-1.5 text-xs text-rose-900 font-medium animate-in fade-in duration-150"
          >
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <span className="leading-snug">{passwordError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
