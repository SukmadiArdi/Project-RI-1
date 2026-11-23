import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Mail, Phone, ExternalLink } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { formatWibDateTimeNarrative } from '../../utils/dateFormatter';
import { MICROCOPY } from '../../constants/microcopy';

export const ContactLecturerModal: React.FC = () => {
  const {
    isContactLecturerOpen,
    setIsContactLecturerOpen,
    activeQuiz,
    logAccess,
  } = useQuiz();

  const [copied, setCopied] = useState(false);

  if (!isContactLecturerOpen) return null;

  const defaultMessage = `Yth. Bapak ${activeQuiz.lecturerName}, perkenalkan saya ${MICROCOPY.header.profileName} (NIM: ${MICROCOPY.header.profileNim}) mahasiswa kelas ${activeQuiz.courseName}. 

Saya bermaksud mengonfirmasi terkait akses kuis "${activeQuiz.title}" yang tercatat ditutup sejak ${formatWibDateTimeNarrative(
    activeQuiz.closeTime
  )}.

Mohon izin dan arahan Bapak apakah terdapat kesempatan untuk mengikuti kuis susulan. Lampiran bukti akses kuis telah saya simpan pada sistem Quiz Clarity. Terima kasih banyak atas perhatian Bapak.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultMessage);
    setCopied(true);
    logAccess(activeQuiz.id, 'Menyalin Template Pesan Dosen', 'Klarifikasi akses kuis');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    logAccess(activeQuiz.id, 'Membuka Kontak WhatsApp Dosen');
    const encoded = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-lecturer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 drawer-backdrop animate-in fade-in duration-200"
        onClick={() => setIsContactLecturerOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="bg-red-800 text-white p-4 flex items-center justify-between border-b border-red-900">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-300" />
            <h2 id="contact-lecturer-title" className="text-base sm:text-lg font-bold">
              Hubungi Dosen Pengampu
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsContactLecturerOpen(false)}
            aria-label="Tutup kontak dosen"
            className="p-1.5 rounded-lg hover:bg-red-700 text-white touch-target flex items-center justify-center focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Lecturer Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Dosen Pengampu:</p>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                {activeQuiz.lecturerName}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Prodi Informatika — Fakultas Teknik UMM
              </p>
            </div>
            <div className="flex flex-col gap-1 text-right text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <Phone className="w-3.5 h-3.5" /> 0812-3456-7890
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <Mail className="w-3.5 h-3.5" /> wahyudi@umm.ac.id
              </span>
            </div>
          </div>

          {/* Pre-filled Message */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Template Pesan Klarifikasi & Permohonan Susulan:
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1 touch-target focus:outline-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Pesan</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-slate-100 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {defaultMessage}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 touch-target flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin ke Clipboard' : 'Salin Teks Pesan'}</span>
          </button>
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 touch-target flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Kirim via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
