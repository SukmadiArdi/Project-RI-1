import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertTriangle, ArrowLeft, Send } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { SAMPLE_QUESTIONS } from '../data/mockQuizzes';
import { formatCountdown } from '../utils/dateFormatter';

export const QuizAttemptView: React.FC = () => {
  const { activeQuiz, finishAttempt, setScreen } = useQuiz();

  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    activeQuiz.durationMinutes * 60
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Timer pengerjaan 12 menit berjalan mundur
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Calculate simple score
    let correct = 0;
    SAMPLE_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / SAMPLE_QUESTIONS.length) * 100);

    setTimeout(() => {
      finishAttempt(finalScore);
    }, 600);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 space-y-4">
      {/* Quiz Top bar with Countdown Timer */}
      <div className="bg-red-800 text-white rounded-2xl p-4 shadow-md sticky top-[48px] z-20 flex items-center justify-between gap-2 border-b border-red-900">
        <div>
          <span className="text-[11px] font-bold text-red-200 block">
            {activeQuiz.courseName}
          </span>
          <h2 className="font-extrabold text-sm sm:text-base leading-tight truncate max-w-[200px] sm:max-w-none">
            {activeQuiz.title}
          </h2>
        </div>

        {/* Live Attempt Timer */}
        <div className="bg-red-950/80 border border-amber-400/60 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-inner">
          <Clock className="w-4 h-4 text-amber-300 animate-spin" />
          <div className="text-right">
            <span className="text-[10px] text-amber-200 block uppercase font-bold leading-none">
              Sisa Waktu
            </span>
            <span className="font-mono text-base font-black text-amber-300 leading-none">
              {formatCountdown(remainingSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {SAMPLE_QUESTIONS.map((item, index) => {
          const isAnswered = selectedAnswers[item.id] !== undefined;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-4 shadow-xs transition-colors ${
                isAnswered ? 'border-red-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Soal Nomor {index + 1} dari {SAMPLE_QUESTIONS.length}
                </span>
                {isAnswered && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Terjawab</span>
                  </span>
                )}
              </div>

              <p className="text-sm font-bold text-slate-900 mb-3 leading-relaxed">
                {item.question}
              </p>

              <div className="space-y-2">
                {item.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[item.id] === optIdx;
                  return (
                    <label
                      key={optIdx}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all touch-target ${
                        isSelected
                          ? 'bg-red-50/80 border-red-500 ring-1 ring-red-400 text-red-950 font-medium'
                          : 'bg-slate-50/50 hover:bg-slate-100/70 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${item.id}`}
                        checked={isSelected}
                        onChange={() => handleSelectAnswer(item.id, optIdx)}
                        className="mt-0.5 text-red-600 focus:ring-red-500 w-4 h-4 shrink-0"
                      />
                      <span className="text-xs sm:text-sm leading-snug">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit footer */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-3 sm:px-4 rounded-xl shadow-lg flex items-center justify-between gap-3">
        <span className="text-xs text-slate-600 font-medium">
          {answeredCount} dari {SAMPLE_QUESTIONS.length} soal dijawab
        </span>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="py-2.5 px-5 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-md flex items-center gap-2 touch-target focus:outline-none"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Mengirim jawaban...' : 'Kumpulkan Jawaban'}</span>
        </button>
      </div>
    </div>
  );
};
