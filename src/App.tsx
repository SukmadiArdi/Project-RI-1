import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Header } from './components/Header';
import { DrawerNav } from './components/DrawerNav';
import { QuizDetailView } from './components/QuizDetail/QuizDetailView';
import { DashboardView } from './components/DashboardView';
import { QuizAttemptView } from './components/QuizAttemptView';
import { S9_PreStartModal } from './components/Modals/S9_PreStartModal';
import { ContactLecturerModal } from './components/Modals/ContactLecturerModal';
import { LecturerAnnouncementModal } from './components/Modals/LecturerAnnouncementModal';
import { AuditLogModal } from './components/Modals/AuditLogModal';
import { SimulatorControls } from './components/SimulatorControls';

const AppContent: React.FC = () => {
  const { currentScreen, mobileViewportMode } = useQuiz();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 
        Jika mode mobileViewportMode aktif, render dalam frame smartphone 360x640 px
        untuk mempermudah validasi UXR-04 secara instan pada layar monitor apa pun.
      */}
      {mobileViewportMode ? (
        <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 bg-slate-900/90 min-h-screen">
          <div className="text-center mb-2 text-white">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white">
              Simulasi Viewport Smartphone Mobile-First (360 × 640 px)
            </span>
            <p className="text-[11px] text-slate-300 mt-1">
              Verifikasi UXR-04: Blok B1–B5 terlihat di atas lipatan tanpa scroll.
            </p>
          </div>

          {/* Smartphone Bezel (360px x 640px) */}
          <div className="relative w-[360px] h-[640px] bg-slate-50 border-8 border-slate-800 rounded-[36px] shadow-2xl overflow-hidden flex flex-col ring-4 ring-slate-700/50">
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-40 flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Viewport Content Area (360x640) */}
            <div className="flex-1 overflow-y-auto flex flex-col pt-3 bg-slate-100 relative">
              <Header />
              <main className="flex-1 flex flex-col">
                {currentScreen === 'S7' ? (
                  <DashboardView />
                ) : currentScreen === 'ATTEMPT' ? (
                  <QuizAttemptView />
                ) : (
                  <QuizDetailView />
                )}
              </main>
            </div>
          </div>
        </div>
      ) : (
        /* Tampilan Desktop Responsif Normal */
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col pb-8">
            {currentScreen === 'S7' ? (
              <DashboardView />
            ) : currentScreen === 'ATTEMPT' ? (
              <QuizAttemptView />
            ) : (
              <QuizDetailView />
            )}
          </main>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <DrawerNav />
      <S9_PreStartModal />
      <ContactLecturerModal />
      <LecturerAnnouncementModal />
      <AuditLogModal />

      {/* Floating Simulator Controls */}
      <SimulatorControls />
    </div>
  );
};

export function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

export default App;
