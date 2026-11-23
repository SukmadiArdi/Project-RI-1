import React from 'react';
import {
  X,
  BookOpen,
  GraduationCap,
  History,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { MOCK_COURSES } from '../data/mockQuizzes';
import { StatusBadge } from './StatusBadge';
import { evaluateQuizStatus } from '../utils/statusEvaluator';
import { MICROCOPY } from '../constants/microcopy';

export const DrawerNav: React.FC = () => {
  const {
    isCourseDrawerOpen,
    setIsCourseDrawerOpen,
    quizzes,
    activeQuizId,
    selectQuiz,
    setScreen,
    currentScreen,
    serverTime,
    isOffline,
    setIsAuditLogModalOpen,
  } = useQuiz();

  if (!isCourseDrawerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigasi Mata Kuliah"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 drawer-backdrop transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCourseDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="bg-red-800 text-white p-4 flex items-center justify-between border-b border-red-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-black text-amber-300 text-sm border border-white/20">
              UMM
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">LMS UMM</h2>
              <p className="text-xs text-red-200">Daftar Mata Kuliah</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCourseDrawerOpen(false)}
            aria-label="Tutup menu navigasi"
            className="p-2 rounded-lg hover:bg-red-700 active:bg-red-900 text-white touch-target flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Profile snippet */}
        <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-red-900 font-extrabold flex items-center justify-center text-sm shadow">
            RP
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-800">{MICROCOPY.header.profileName}</p>
            <p className="text-slate-500">{MICROCOPY.header.profileNim}</p>
            <p className="text-red-700 font-semibold">{MICROCOPY.header.profileRole}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Menu Utama
            </h3>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setScreen('S7');
                  setIsCourseDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors touch-target ${
                  currentScreen === 'S7'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-red-600" />
                  <span>Dashboard & Mata Kuliah</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCourseDrawerOpen(false);
                  setIsAuditLogModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors touch-target"
              >
                <div className="flex items-center gap-2.5">
                  <History className="w-4 h-4 text-slate-600" />
                  <span>Riwayat Akses Kuis (FR-08)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Mata Kuliah Terdaftar
            </h3>
            <div className="space-y-2">
              {MOCK_COURSES.map((course) => {
                const isSelected = course.id === 'mk-dpl-a';
                return (
                  <div
                    key={course.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-red-50/60 border-red-300 ring-1 ring-red-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {course.code}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {course.credits} SKS
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {course.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{course.lecturer}</p>

                    {isSelected && (
                      <div className="mt-3 pt-2.5 border-t border-red-200/80">
                        <p className="text-[11px] font-bold text-red-900 mb-1.5">
                          Kuis di Mata Kuliah Ini:
                        </p>
                        <div className="space-y-1.5">
                          {quizzes.map((quiz) => {
                            const evalResult = evaluateQuizStatus(
                              quiz,
                              serverTime,
                              isOffline
                            );
                            const isActiveQuiz =
                              quiz.id === activeQuizId && currentScreen !== 'S7';
                            return (
                              <button
                                key={quiz.id}
                                type="button"
                                onClick={() => {
                                  selectQuiz(quiz.id);
                                  setScreen('S1');
                                }}
                                className={`w-full text-left p-2 rounded-lg text-xs font-medium flex items-center justify-between gap-1.5 transition-all touch-target ${
                                  isActiveQuiz
                                    ? 'bg-red-700 text-white shadow-sm'
                                    : 'bg-white/80 hover:bg-red-100/60 text-slate-700 border border-slate-200'
                                }`}
                              >
                                <span className="truncate flex-1 font-semibold">
                                  {quiz.title}
                                </span>
                                <StatusBadge
                                  token={evalResult.token}
                                  labelOverride={evalResult.label}
                                  size="sm"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          <div className="flex items-center justify-center gap-1.5 text-slate-600 font-medium mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Quiz Clarity v1.0 (WCAG AA Compliant)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Worksheet 08 — Rekayasa Interaksi UMM
          </p>
        </div>
      </div>
    </div>
  );
};
