import React, { useState } from 'react';
import { X, History, Copy, Check, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { StatusBadge } from '../StatusBadge';

export const AuditLogModal: React.FC = () => {
  const {
    isAuditLogModalOpen,
    setIsAuditLogModalOpen,
    accessLogs,
    exportAuditProofSlip,
    logAccess,
    activeQuiz,
  } = useQuiz();

  const [copied, setCopied] = useState(false);

  if (!isAuditLogModalOpen) return null;

  const handleCopySlip = () => {
    const slip = exportAuditProofSlip();
    navigator.clipboard.writeText(slip);
    setCopied(true);
    logAccess(activeQuiz.id, 'Mengekspor Bukti Riwayat Akses', 'FR-08 Audit Slip');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-log-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 drawer-backdrop animate-in fade-in duration-200"
        onClick={() => setIsAuditLogModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-red-800 text-white p-4 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10">
              <History className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 id="audit-log-title" className="text-base sm:text-lg font-bold">
                Riwayat Akses Kuis (FR-08)
              </h2>
              <p className="text-xs text-red-200">
                Bukti Audit Akses Sah Mahasiswa — LMS UMM
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuditLogModalOpen(false)}
            aria-label="Tutup riwayat akses"
            className="p-1.5 rounded-lg hover:bg-red-700 text-white touch-target flex items-center justify-center focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader Notice */}
        <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-950 flex items-start gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Fitur <strong>FR-08</strong> mencatat riwayat akses kuis secara otomatis berdasarkan waktu server WIB sebagai pengganti screenshot manual saat mahasiswa perlu membuktikan waktu akses ke dosen.
          </p>
        </div>

        {/* Logs Table / List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {accessLogs.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-6">
              Belum ada riwayat akses yang tercatat.
            </p>
          ) : (
            accessLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-extrabold text-slate-900 text-sm">
                    {log.action}
                  </span>
                  <StatusBadge
                    token={log.statusAtAccess}
                    labelOverride={log.statusLabel}
                    size="sm"
                  />
                </div>
                <p className="text-slate-600 font-medium">{log.quizTitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Waktu: <strong>{log.serverTimeFormatted}</strong></span>
                  <span>IP/Perangkat: {log.ipAddress}</span>
                </div>
                {log.note && (
                  <p className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {log.note}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-500">
            Total {accessLogs.length} catatan audit tersimpan.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopySlip}
              className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-red-700 hover:bg-red-800 touch-target flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Bukti Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Bukti Resmi Dosen</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsAuditLogModalOpen(false)}
              className="py-2 px-3.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 touch-target"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
