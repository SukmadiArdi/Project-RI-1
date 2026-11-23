import React from 'react';
import {
  CheckCircle2,
  Hourglass,
  Lock,
  Clock,
  XCircle,
  Key,
  HelpCircle,
  LucideIcon
} from 'lucide-react';
import { QuizStatusToken } from '../types/quiz';

export interface StatusTokenConfig {
  token: QuizStatusToken;
  label: string;
  icon: LucideIcon;
  // Accessible color tokens with WCAG AA contrast (>= 4.5:1)
  bannerBg: string;
  bannerBorder: string;
  bannerText: string;
  bannerIconColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeIconColor: string;
  ariaDescription: string;
}

export const STATUS_TOKENS: Record<QuizStatusToken, StatusTokenConfig> = {
  'status/open': {
    token: 'status/open',
    label: 'TERBUKA',
    icon: CheckCircle2,
    bannerBg: 'bg-emerald-50 border-emerald-300',
    bannerBorder: 'border-emerald-300',
    bannerText: 'text-emerald-950',
    bannerIconColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-emerald-900',
    badgeIconColor: 'text-emerald-700',
    ariaDescription: 'Kuis terbuka dan dapat dikerjakan saat ini',
  },
  'status/closing-soon': {
    token: 'status/closing-soon',
    label: 'SEGERA DITUTUP',
    icon: Hourglass,
    bannerBg: 'bg-amber-50 border-amber-300',
    bannerBorder: 'border-amber-300',
    bannerText: 'text-amber-950',
    bannerIconColor: 'text-amber-700',
    badgeBg: 'bg-amber-100/90 text-amber-950 border-amber-300',
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-950',
    badgeIconColor: 'text-amber-700',
    ariaDescription: 'Peringatan: Kuis segera ditutup dalam waktu kurang dari 60 menit',
  },
  'status/closed': {
    token: 'status/closed',
    label: 'DITUTUP',
    icon: Lock,
    bannerBg: 'bg-rose-50 border-rose-300',
    bannerBorder: 'border-rose-300',
    bannerText: 'text-rose-950',
    bannerIconColor: 'text-rose-700',
    badgeBg: 'bg-rose-100/90 text-rose-950 border-rose-300',
    badgeBorder: 'border-rose-300',
    badgeText: 'text-rose-950',
    badgeIconColor: 'text-rose-700',
    ariaDescription: 'Kuis telah ditutup dan tidak dapat dikerjakan',
  },
  'status/not-open-yet': {
    token: 'status/not-open-yet',
    label: 'BELUM DIBUKA',
    icon: Clock,
    bannerBg: 'bg-blue-50 border-blue-300',
    bannerBorder: 'border-blue-300',
    bannerText: 'text-blue-950',
    bannerIconColor: 'text-blue-700',
    badgeBg: 'bg-blue-100/90 text-blue-950 border-blue-300',
    badgeBorder: 'border-blue-300',
    badgeText: 'text-blue-950',
    badgeIconColor: 'text-blue-700',
    ariaDescription: 'Kuis belum memasuki jadwal waktu buka pengerjaan',
  },
  'status/no-attempt': {
    token: 'status/no-attempt',
    label: 'KESEMPATAN HABIS',
    icon: XCircle,
    bannerBg: 'bg-slate-100 border-slate-300',
    bannerBorder: 'border-slate-300',
    bannerText: 'text-slate-900',
    bannerIconColor: 'text-slate-600',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
    badgeBorder: 'border-slate-300',
    badgeText: 'text-slate-800',
    badgeIconColor: 'text-slate-600',
    ariaDescription: 'Anda telah menggunakan seluruh batas kesempatan pengerjaan kuis',
  },
  'status/password-required': {
    token: 'status/password-required',
    label: 'PERLU PASSWORD',
    icon: Key,
    bannerBg: 'bg-emerald-50 border-emerald-300',
    bannerBorder: 'border-emerald-300',
    bannerText: 'text-emerald-950',
    bannerIconColor: 'text-emerald-700',
    badgeBg: 'bg-amber-100 text-amber-950 border-amber-300',
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-950',
    badgeIconColor: 'text-amber-700',
    ariaDescription: 'Kuis terbuka namun memerlukan verifikasi password sebelum pengerjaan',
  },
  'status/unknown': {
    token: 'status/unknown',
    label: 'STATUS BELUM DIMUAT',
    icon: HelpCircle,
    bannerBg: 'bg-neutral-100 border-neutral-300',
    bannerBorder: 'border-neutral-300',
    bannerText: 'text-neutral-900',
    bannerIconColor: 'text-neutral-600',
    badgeBg: 'bg-neutral-200 text-neutral-800 border-neutral-300',
    badgeBorder: 'border-neutral-300',
    badgeText: 'text-neutral-800',
    badgeIconColor: 'text-neutral-600',
    ariaDescription: 'Status kuis belum dapat dimuat karena kendala jaringan atau server',
  },
};
