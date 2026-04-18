'use client';

import { useState } from 'react';

type Bounty = {
  id: string;
  title: string;
  reward: number;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  progress: number;
};

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  Hard: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800',
};

const difficultyDot: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500',
  Medium: 'bg-amber-500',
  Hard: 'bg-rose-500',
};

// Consistent color per tag keyword
const TAG_COLORS: Record<string, string> = {
  frontend: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  bugfix: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  ux: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
  data: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800',
  dashboard: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800',
  algorithm: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
  ranking: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
};

function tagStyle(tag: string): string {
  const lower = tag.toLowerCase();
  return TAG_COLORS[lower] ?? 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600';
}

export function BountyCard({ title, reward, tags, difficulty, progress }: Bounty) {
  const [hovered, setHovered] = useState(false);

  // Progress bar fill color based on progress
  const progressColor =
    progress >= 80 ? 'bg-emerald-500' :
    progress >= 50 ? 'bg-brand-500' :
    progress >= 25 ? 'bg-amber-500' :
    'bg-rose-500';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        card group relative overflow-hidden p-4 sm:p-5
        cursor-pointer select-none
        transition-all duration-200 ease-out
        hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700
        hover:-translate-y-0.5
        ${hovered ? 'ring-2 ring-brand-500/40 dark:ring-brand-400/40' : 'ring-1 ring-transparent'}
      `}
    >
      {/* Subtle background gradient on hover */}
      <div
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-200
          bg-gradient-to-br from-brand-50 to-transparent
          dark:from-brand-900/20 dark:to-transparent
          ${hovered ? 'opacity-100' : ''}
        `}
      />

      <div className="relative flex flex-col gap-4">
        {/* Top row: tags + difficulty */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold transition-transform duration-150 ${tagStyle(tag)} ${hovered ? 'scale-105' : ''}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            className={`
              inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-bold shrink-0
              ${difficultyStyles[difficulty]}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${difficultyDot[difficulty]} animate-pulse`} />
            {difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100 transition-colors duration-150 group-hover:text-brand-700 dark:group-hover:text-brand-400">
          {title}
        </h3>

        {/* Footer: reward + progress */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400 tabular-nums">
              ${reward}
            </span>
            <span className="ml-1 text-xs font-medium text-slate-400"> bounty</span>
          </div>

          <div className="flex-1 max-w-[140px]">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1.5">
              <span>Progress</span>
              <span className={`
                tabular-nums font-semibold
                ${progress >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                  progress >= 50 ? 'text-brand-600 dark:text-brand-400' :
                  progress >= 25 ? 'text-amber-600 dark:text-amber-400' :
                  'text-rose-600 dark:text-rose-400'}
              `}>
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className={`
                  h-full rounded-full transition-all duration-500 ease-out
                  ${progressColor}
                  ${hovered ? '' : ''}
                `}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Click indicator */}
      <div className={`absolute bottom-3 right-3 transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] font-semibold text-brand-500 dark:text-brand-400">Click →</span>
      </div>
    </div>
  );
}
