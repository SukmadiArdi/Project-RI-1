import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
      {/* Title skeleton */}
      <div className="h-7 bg-slate-300 rounded w-3/4 mb-4" />

      {/* Banner skeleton */}
      <div className="h-16 bg-slate-200 rounded-xl border border-slate-300 w-full" />

      {/* Info card 4-grid skeleton */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="h-16 bg-slate-100 rounded-lg" />
          <div className="h-16 bg-slate-100 rounded-lg" />
          <div className="h-16 bg-slate-100 rounded-lg" />
          <div className="h-16 bg-slate-100 rounded-lg" />
        </div>
      </div>

      {/* Password block skeleton */}
      <div className="h-20 bg-slate-100 rounded-xl border border-slate-200" />

      {/* Instructions skeleton */}
      <div className="h-12 bg-white rounded-xl border border-slate-200" />

      {/* CTA skeleton */}
      <div className="h-12 bg-slate-300 rounded-xl w-full" />
    </div>
  );
};
