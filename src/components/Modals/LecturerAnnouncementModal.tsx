import React from 'react';
import { X, Bell, User, Calendar, ExternalLink } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const LecturerAnnouncementModal: React.FC = () => {
  const {
    isAnnouncementModalOpen,
    setIsAnnouncementModalOpen,
    activeQuiz,
    setPasswordInput,
  } = useQuiz();

  if (!isAnnouncementModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 drawer-backdrop animate-in fade-in duration-200"
        onClick={() => setIsAnnouncementModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="bg-red-800 text-white p-4 flex items-center justify-between border-b border-red-900">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h2 id="announcement-modal-title" className="text-base sm:text-lg font-bold">
              Pengumuman Resmi Dosen
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(false)}
            aria-label="Tutup pengumuman"
            className="p-1.5 rounded-lg hover:bg-red-700 text-white touch-target flex items-center justify-center focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <div className="border-b pb-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeQuiz.lecturerName}</span>
            </span>
            <span>Forum Kelas DPL A</span>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <p className="font-semibold text-amber-950 mb-1">Pemberitahuan Password Kuis:</p>
            <p className="whitespace-pre-line text-slate-800">{activeQuiz.lecturerAnnouncement}</p>
          </div>

          {activeQuiz.correctPassword && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => {
                  setPasswordInput(activeQuiz.correctPassword || '');
                  setIsAnnouncementModalOpen(false);
                }}
                className="text-xs font-bold text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-lg touch-target"
              >
                Gunakan Password Resmi Ini ke Kolom Kuis
              </button>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(false)}
            className="py-2 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 touch-target"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
