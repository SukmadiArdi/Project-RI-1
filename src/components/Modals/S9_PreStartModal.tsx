import React from 'react';
import { AlertCircle, Clock, RefreshCw, X, Play } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { MICROCOPY } from '../../constants/microcopy';

export const S9_PreStartModal: React.FC = () => {
  const {
    isConfirmationModalOpen,
    cancelStartQuiz,
    confirmStartQuiz,
    activeQuiz,
  } = useQuiz();

  if (!isConfirmationModalOpen) return null;

  const remainingAttempts = Math.max(0, activeQuiz.maxAttempts - activeQuiz.userAttempts);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-prestart-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 drawer-backdrop animate-in fade-in duration-200"
        onClick={cancelStartQuiz}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-red-800 text-white p-4 flex items-center justify-between border-b border-red-900">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <h2
              id="modal-prestart-title"
              className="text-base sm:text-lg font-bold tracking-tight"
            >
              {MICROCOPY.modalConfirmation.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={cancelStartQuiz}
            aria-label="Tutup modal konfirmasi"
            className="p-1.5 rounded-lg hover:bg-red-700 text-white touch-target flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
            <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {MICROCOPY.modalConfirmation.body(
                activeQuiz.durationMinutes,
                remainingAttempts
              )}
            </p>
          </div>

          {/* Quick Recap info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Durasi Pengerjaan</span>
              <span className="font-extrabold text-slate-900 text-sm">
                {activeQuiz.durationMinutes} Menit
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Sisa Kesempatan</span>
              <span className="font-extrabold text-slate-900 text-sm">
                {remainingAttempts} kali
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic text-center">
            Peringatan: Pastikan browser tidak ditutup saat kuis berlangsung.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={cancelStartQuiz}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 touch-target focus:outline-none transition-colors"
          >
            {MICROCOPY.modalConfirmation.cancelButton}
          </button>
          <button
            type="button"
            onClick={confirmStartQuiz}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 shadow-sm touch-target flex items-center justify-center gap-1.5 focus:outline-none transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{MICROCOPY.modalConfirmation.confirmButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
