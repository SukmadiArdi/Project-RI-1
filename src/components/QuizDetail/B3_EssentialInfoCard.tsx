import React from 'react';
import { Calendar, Clock, RefreshCw, FileQuestion } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { formatWibDateTime } from '../../utils/dateFormatter';
import { MICROCOPY } from '../../constants/microcopy';

export const B3_EssentialInfoCard: React.FC = () => {
  const { activeQuiz } = useQuiz();

  const remainingAttempts = Math.max(0, activeQuiz.maxAttempts - activeQuiz.userAttempts);

  return (
    <div className="mx-3 sm:mx-4 mb-2.5">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-2.5 sm:p-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>{MICROCOPY.infoTitle}</span>
          <span className="text-[10px] text-slate-400 font-normal">WIB (UTC+7)</span>
        </h2>

        {/* Grid 2 kolom di mobile (360px), 4 kolom di desktop sesuai FR-04 & UXR-04 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {/* Item 1: Batas Waktu */}
          <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-red-600 shrink-0" />
              <span>{MICROCOPY.labels.deadline}</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1 leading-snug break-words">
              {formatWibDateTime(activeQuiz.closeTime)}
            </span>
          </div>

          {/* Item 2: Durasi Pengerjaan */}
          <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-red-600 shrink-0" />
              <span>{MICROCOPY.labels.duration}</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">
              {activeQuiz.durationMinutes} Menit
            </span>
          </div>

          {/* Item 3: Sisa Kesempatan */}
          <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-red-600 shrink-0" />
              <span>{MICROCOPY.labels.attempts}</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">
              {remainingAttempts} dari {activeQuiz.maxAttempts} kali
              {activeQuiz.userAttempts > 0 && (
                <span className="block text-[10px] font-medium text-slate-500">
                  (Digunakan: {activeQuiz.userAttempts})
                </span>
              )}
            </span>
          </div>

          {/* Item 4: Jumlah Soal */}
          <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <FileQuestion className="w-3 h-3 text-red-600 shrink-0" />
              <span>{MICROCOPY.labels.questions}</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">
              {activeQuiz.questionCount} Butir Soal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
