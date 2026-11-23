import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { StatusBadge } from './StatusBadge';
import { evaluateQuizStatus } from '../utils/statusEvaluator';
import { formatWibDateTime } from '../utils/dateFormatter';
import { QuizStatusToken } from '../types/quiz';

export const DashboardView: React.FC = () => {
  const {
    quizzes,
    selectQuiz,
    setScreen,
    serverTime,
    isOffline,
    statusPerTimeText,
  } = useQuiz();

  const [filterToken, setFilterToken] = useState<string>('all');

  const courseQuizzes = quizzes.map((quiz) => {
    const evaluation = evaluateQuizStatus(quiz, serverTime, isOffline);
    return {
      quiz,
      evaluation,
    };
  });

  const filteredQuizzes = courseQuizzes.filter(({ evaluation }) => {
    if (filterToken === 'all') return true;
    return evaluation.token === filterToken;
  });

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-4">
      {/* Course Banner (Desain Perangkat Lunak A) */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-2xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white border border-white/30">
              TIF-3201 · 3 SKS
            </span>
            <span className="text-xs text-red-200">Semester Ganjil 2026/2027</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
            Desain Perangkat Lunak A
          </h1>
          <p className="text-xs sm:text-sm text-red-100">
            Dosen Pengampu: Dr. Ir. Wahyudi, M.T.
          </p>

          {/* FR-02 & UXR-02: Single source of truth indicator with update time */}
          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-red-950/60 border border-red-700/60 rounded-full px-3 py-1 text-xs text-red-100">
            <Info className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-semibold text-amber-200">
              {statusPerTimeText}
            </span>
            <span className="text-white/60 hidden sm:inline">•</span>
            <span className="text-red-200 hidden sm:inline">
              Status kuis sinkron otomatis dengan server
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quizzes Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Daftar Kuis Mata Kuliah
            </h2>
            <p className="text-xs text-slate-500">
              Pilih kuis untuk melihat detail kejelasan akses dan informasi lengkap.
            </p>
          </div>

          {/* Quick status filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              type="button"
              onClick={() => setFilterToken('all')}
              className={`px-2.5 py-1 rounded-full font-bold touch-target transition-colors ${
                filterToken === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua ({quizzes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterToken('status/open')}
              className={`px-2.5 py-1 rounded-full font-bold touch-target transition-colors ${
                filterToken === 'status/open'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Terbuka
            </button>
            <button
              type="button"
              onClick={() => setFilterToken('status/closed')}
              className={`px-2.5 py-1 rounded-full font-bold touch-target transition-colors ${
                filterToken === 'status/closed'
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              Ditutup
            </button>
          </div>
        </div>

        {/* Quizzes List (S7) */}
        <div className="space-y-2.5">
          {filteredQuizzes.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-6">
              Tidak ada kuis dengan filter ini.
            </p>
          ) : (
            filteredQuizzes.map(({ quiz, evaluation }) => (
              <div
                key={quiz.id}
                onClick={() => {
                  selectQuiz(quiz.id);
                  setScreen('S1');
                }}
                className="group p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-red-400 bg-white hover:bg-red-50/20 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 touch-target"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {quiz.code}
                    </span>
                    {/* FR-02: Badge status identik dengan halaman detail */}
                    <StatusBadge
                      token={evaluation.token}
                      labelOverride={evaluation.label}
                    />
                    {quiz.passwordRequired && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        Password
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-red-700 transition-colors">
                    {quiz.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tenggat: {formatWibDateTime(quiz.closeTime)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.durationMinutes} Menit</span>
                    </span>
                    <span>•</span>
                    <span>{quiz.questionCount} Soal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs font-bold text-red-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
