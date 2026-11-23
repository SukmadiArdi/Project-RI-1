import React from 'react';
import { QuizStatusToken } from '../types/quiz';
import { STATUS_TOKENS } from '../constants/designTokens';

interface StatusBadgeProps {
  token: QuizStatusToken;
  labelOverride?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  token,
  labelOverride,
  showIcon = true,
  size = 'md',
}) => {
  const config = STATUS_TOKENS[token] || STATUS_TOKENS['status/unknown'];
  const Icon = config.icon;
  const labelText = labelOverride || config.label;

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs gap-1'
      : 'px-2.5 py-1 text-sm gap-1.5 font-semibold'; // UXR-04: minimal 14px (text-sm)

  return (
    <span
      role="status"
      aria-label={`${config.label}: ${config.ariaDescription}`}
      className={`inline-flex items-center rounded-full border font-medium tracking-wide transition-colors ${config.badgeBg} ${config.badgeBorder} ${sizeClasses}`}
    >
      {showIcon && (
        <Icon
          className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${config.badgeIconColor} shrink-0`}
          aria-hidden="true"
        />
      )}
      <span className="font-bold tracking-tight">{labelText}</span>
    </span>
  );
};
