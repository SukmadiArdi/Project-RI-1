import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, User } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const B6_LecturerInstructions: React.FC = () => {
  const { activeQuiz } = useQuiz();
  // FR-04: Collapsible, default tertutup
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mx-3 sm:mx-4 mb-2.5">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors touch-target focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-inset"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-700 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Instruksi Pengerjaan dari Dosen
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>{isOpen ? 'Tutup' : 'Lihat'}</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="px-3 pb-3 pt-1 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 leading-relaxed animate-in fade-in duration-150">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 mb-2">
              <p className="whitespace-pre-line text-slate-800">
                {activeQuiz.lecturerInstructions}
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>Pengampu: {activeQuiz.lecturerName}</span>
              </span>
              <span>DPL Kelas A</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
