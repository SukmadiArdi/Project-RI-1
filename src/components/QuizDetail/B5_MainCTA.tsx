import React from 'react';
import { Play, Lock, AlertCircle, RefreshCw, MessageSquare, ChevronRight } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { MICROCOPY } from '../../constants/microcopy';

export const B5_MainCTA: React.FC = () => {
  const {
    currentEvaluation,
    openConfirmationModal,
    retryLoading,
    setIsContactLecturerOpen,
    setScreen,
    isLoading,
    isOffline,
  } = useQuiz();

  const { canAttempt, token, reasonDisabled } = currentEvaluation;

  // Render S8: Gagal memuat / Offline
  if (token === 'status/unknown' || isOffline) {
    return (
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-2.5 sm:p-0 sm:mx-4 sm:mb-3 sm:static sm:border-0 sm:shadow-none shadow-lg">
        <div className="max-w-xl mx-auto flex flex-col gap-2">
          <p className="text-xs text-rose-800 font-medium text-center">
            {MICROCOPY.statusMessages.loadFailed}
          </p>
          <button
            type="button"
            onClick={retryLoading}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-red-700 hover:bg-red-800 active:bg-red-900 text-white shadow-md transition-all touch-target focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Memuat ulang...' : MICROCOPY.cta.retry}</span>
          </button>
        </div>
      </div>
    );
  }

  // Render State Dapat Dikerjakan (S1, S2, S3)
  if (canAttempt) {
    return (
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-2.5 sm:p-0 sm:mx-4 sm:mb-3 sm:static sm:border-0 sm:shadow-none shadow-lg">
        <div className="max-w-xl mx-auto">
          <button
            type="button"
            onClick={openConfirmationModal}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm sm:text-base bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-md transition-all touch-target focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform active:scale-[0.99]"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>{MICROCOPY.cta.start}</span>
          </button>
        </div>
      </div>
    );
  }

  // Render State Tidak Dapat Dikerjakan (S4, S5, S6)
  return (
    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-2.5 sm:p-0 sm:mx-4 sm:mb-3 sm:static sm:border-0 sm:shadow-none shadow-lg">
      <div className="max-w-xl mx-auto flex flex-col gap-2">
        {/* Tombol Utama Nonaktif */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed touch-target"
        >
          <Lock className="w-4 h-4 text-slate-400" />
          <span>{MICROCOPY.cta.notReady}</span>
        </button>

        {/* Alasan eksplisit tepat di bawah CTA sesuai FR-01 & FR-05 */}
        {reasonDisabled && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-0.5">Keterangan Akses:</p>
            <p>{reasonDisabled}</p>
          </div>
        )}

        {/* Tindakan lanjutan langsung jika ditutup atau kesempatan habis */}
        {(token === 'status/closed' || token === 'status/no-attempt') && (
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setIsContactLecturerOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 touch-target focus:outline-none"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{MICROCOPY.cta.contactLecturer}</span>
            </button>
            <button
              type="button"
              onClick={() => setScreen('S7')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 touch-target focus:outline-none"
            >
              <span>{MICROCOPY.cta.backToCourse}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
