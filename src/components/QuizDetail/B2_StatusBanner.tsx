import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { STATUS_TOKENS } from '../../constants/designTokens';
import { AlertTriangle, Clock } from 'lucide-react';

export const B2_StatusBanner: React.FC = () => {
  const { currentEvaluation, activeQuiz, isOffline } = useQuiz();

  const tokenConfig =
    STATUS_TOKENS[currentEvaluation.token] || STATUS_TOKENS['status/unknown'];
  const Icon = tokenConfig.icon;

  return (
    <div
      role="region"
      aria-label="Status Kuis Terkini"
      className={`sticky top-[49px] sm:top-[53px] z-20 mx-3 sm:mx-4 mb-2.5 rounded-xl border-2 px-3 py-2.5 shadow-sm transition-all duration-200 ${tokenConfig.bannerBg} ${tokenConfig.bannerBorder}`}
    >
      <div className="flex items-start gap-2.5">
        {/* Dual-Encoding: Ikon status dengan warna semantik */}
        <div
          className={`p-1.5 rounded-lg bg-white/80 border shadow-xs shrink-0 ${tokenConfig.bannerBorder}`}
        >
          <Icon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${tokenConfig.bannerIconColor}`}
            aria-hidden="true"
          />
        </div>

        {/* Dual-Encoding: Label teks status (>= 14px) + hitung mundur / penanda waktu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1.5">
            <span
              className={`text-sm sm:text-base font-extrabold tracking-tight ${tokenConfig.bannerText}`}
            >
              {currentEvaluation.bannerTitle}
            </span>

            {/* Khusus kuis berpassword pada state S2 */}
            {activeQuiz.passwordRequired &&
              currentEvaluation.token === 'status/password-required' && (
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-200/90 text-amber-950 border border-amber-300">
                  PERLU PASSWORD
                </span>
              )}
          </div>

          {/* Subtitle / peringatan waktu */}
          {currentEvaluation.bannerSubtitle && (
            <p className="text-xs text-slate-700 font-medium mt-0.5 leading-snug">
              {currentEvaluation.bannerSubtitle}
            </p>
          )}

          {/* UXR-06 & FR-06: Peringatan jika sisa waktu < durasi pengerjaan */}
          {currentEvaluation.isTimeShorterThanDuration && !isOffline && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-200/70 border border-amber-400/80 rounded-md p-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>
                Sisa waktu lebih singkat daripada durasi pengerjaan. Anda mungkin tidak dapat menyelesaikan kuis.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
