import React from 'react';
import { ChevronRight, Home, BookOpen } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const B1_BreadcrumbTitle: React.FC = () => {
  const { activeQuiz, setScreen } = useQuiz();

  return (
    <div className="pt-2.5 pb-2 px-3 sm:px-4">
      {/* Breadcrumb: Maksimal 2 level di mobile sesuai FR-04 */}
      <nav aria-label="Breadcrumb" className="mb-1.5">
        <ol className="flex items-center text-xs text-slate-500 font-medium">
          <li className="flex items-center">
            <button
              type="button"
              onClick={() => setScreen('S7')}
              className="hover:text-red-700 flex items-center gap-1 focus:outline-none focus:underline"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-600 truncate max-w-[120px] sm:max-w-none">
                {activeQuiz.courseName}
              </span>
            </button>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400 shrink-0" />
            <span
              className="text-slate-800 font-bold truncate max-w-[140px] sm:max-w-none"
              aria-current="page"
            >
              Detail Kuis
            </span>
          </li>
        </ol>
      </nav>

      {/* Judul Kuis & Kode Mata Kuliah */}
      <div className="flex flex-col">
        <h1 className="text-base sm:text-xl font-extrabold text-slate-900 leading-tight tracking-tight">
          {activeQuiz.title}
        </h1>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
          <span className="font-semibold text-red-700 bg-red-50 border border-red-200/60 px-1.5 py-0.2 rounded text-[11px]">
            {activeQuiz.courseCode}
          </span>
          <span>•</span>
          <span className="truncate">{activeQuiz.lecturerName}</span>
        </div>
      </div>
    </div>
  );
};
