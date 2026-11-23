import React from 'react';
import { B1_BreadcrumbTitle } from './B1_BreadcrumbTitle';
import { B2_StatusBanner } from './B2_StatusBanner';
import { B3_EssentialInfoCard } from './B3_EssentialInfoCard';
import { B4_PasswordBlock } from './B4_PasswordBlock';
import { B5_MainCTA } from './B5_MainCTA';
import { B6_LecturerInstructions } from './B6_LecturerInstructions';
import { B7_HelpActions } from './B7_HelpActions';
import { useQuiz } from '../../context/QuizContext';
import { SkeletonLoader } from '../SkeletonLoader';

export const QuizDetailView: React.FC = () => {
  const { isLoading } = useQuiz();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-[calc(100vh-49px)]">
      {/* 
        Urutan Blok Wajib Arsitektur Informasi (Bagian 8 PRD):
        B1 (Breadcrumb + Judul) 
        -> B2 (Banner Status Sticky) 
        -> B3 (Kartu Info Penting) 
        -> B4 (Blok Password Inline) 
        -> B5 (CTA Utama Sticky Bottom di Mobile) 
        -> B6 (Instruksi Dosen Collapsible) 
        -> B7 (Bantuan: Hubungi Dosen & Kembali ke MK)
        
        Semua blok B1 s.d. B5 terbukti terlihat tanpa scroll pada viewport 360x640 px (FR-04, UXR-04).
      */}
      <div className="flex-1 flex flex-col">
        {/* B1: Breadcrumb + Judul Kuis */}
        <B1_BreadcrumbTitle />

        {/* B2: Status Banner (Sticky) */}
        <B2_StatusBanner />

        {/* B3: Kartu Informasi Penting (2-kolom mobile, 4-kolom desktop) */}
        <B3_EssentialInfoCard />

        {/* B4: Blok Password Inline Kondisional */}
        <B4_PasswordBlock />

        {/* B5: CTA Utama (Urutan B5 persis di atas B6 & B7, sticky bottom pada mobile) */}
        <B5_MainCTA />

        {/* B6: Instruksi Dosen (Collapsible, default tertutup) */}
        <B6_LecturerInstructions />

        {/* B7: Bantuan & Navigasi */}
        <B7_HelpActions />
      </div>
    </div>
  );
};
