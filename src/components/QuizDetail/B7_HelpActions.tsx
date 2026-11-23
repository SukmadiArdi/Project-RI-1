import React from 'react';
import { MessageSquare, ArrowLeft, History, HelpCircle } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { MICROCOPY } from '../../constants/microcopy';

export const B7_HelpActions: React.FC = () => {
  const {
    setIsContactLecturerOpen,
    setIsAuditLogModalOpen,
    setScreen,
  } = useQuiz();

  return (
    <div className="mx-3 sm:mx-4 mb-6">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Bantuan & Navigasi</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Tombol Hubungi Dosen */}
          <button
            type="button"
            onClick={() => setIsContactLecturerOpen(true)}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 touch-target focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-red-700" />
            <span>{MICROCOPY.cta.contactLecturer}</span>
          </button>

          {/* Tombol Kembali ke Mata Kuliah */}
          <button
            type="button"
            onClick={() => setScreen('S7')}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 touch-target focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>{MICROCOPY.cta.backToCourse}</span>
          </button>
        </div>

        {/* FR-08 Tautan Riwayat Akses Kuis */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={() => setIsAuditLogModalOpen(true)}
            className="text-xs font-semibold text-slate-500 hover:text-red-700 underline flex items-center justify-center gap-1 mx-auto py-1 touch-target focus:outline-none"
          >
            <History className="w-3.5 h-3.5" />
            <span>{MICROCOPY.cta.viewAuditLog} (FR-08)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
