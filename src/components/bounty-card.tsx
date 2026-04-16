export type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress?: number;
  /** Link the card somewhere (optional) */
  href?: string;
  /** Callback when "View Bounty" is clicked */
  onClick?: () => void;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

const difficultyBarColors = {
  Easy: "bg-emerald-400",
  Medium: "bg-amber-400",
  Hard: "bg-rose-400",
};

function ProgressBar({ progress, difficulty }: { progress: number; difficulty: BountyCardProps["difficulty"] }) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
        <span>Progress</span>
        <span>{clamped}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${difficultyBarColors[difficulty]}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export function BountyCard({ title, reward, tags, difficulty, progress = 0, href, onClick }: BountyCardProps) {
  const cardContent = (
    <div className="card p-4 sm:p-5 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      {/* Header: title + meta */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words group-hover:text-brand-600 transition-colors">
            {title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0 flex flex-col items-end gap-1">
          <div className="text-xl sm:text-2xl font-bold tabular-nums">${reward.toLocaleString()}</div>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar progress={progress} difficulty={difficulty} />

      {/* CTA hint */}
      <div className="mt-3 flex items-center justify-end">
        <span className="text-xs font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View Bounty →
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline" onClick={onClick}>
        {cardContent}
      </a>
    );
  }

  return <div onClick={onClick}>{cardContent}</div>;
}
