"use client";

interface ReferrerData {
  domain: string;
  visitors: number;
  leads: number;
  avgScore: number;
}

interface Props {
  referrers: ReferrerData[];
  isLoading?: boolean;
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function LinkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

function getScoreBadge(score: number): { bg: string; text: string; label: string } {
  if (score >= 70) return { bg: "bg-green-100", text: "text-green-700", label: "High" };
  if (score >= 40) return { bg: "bg-amber-100", text: "text-amber-700", label: "Med" };
  return { bg: "bg-gray-100", text: "text-gray-600", label: "Low" };
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-2 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
          <div className="h-5 bg-gray-200 rounded w-12" />
        </div>
      ))}
    </div>
  );
}

export default function TopReferrers({ referrers, isLoading }: Props) {
  const maxVisitors = referrers[0]?.visitors || 1;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 mb-0.5">
              Referrals
            </p>
            <h3 className="text-base font-semibold text-text-primary">
              Top Referrers
            </h3>
          </div>
          <ExternalLinkIcon className="w-4 h-4 text-text-muted" />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : referrers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <LinkIcon className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-sm text-text-muted">No referrer data</p>
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {referrers.map((referrer) => {
            const scoreBadge = getScoreBadge(referrer.avgScore);
            const barWidth = (referrer.visitors / maxVisitors) * 100;

            return (
              <a
                key={referrer.domain}
                href={`https://${referrer.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Favicon placeholder */}
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold text-sm flex-shrink-0">
                    {referrer.domain[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate max-w-[140px]" title={referrer.domain}>
                      {referrer.domain}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-text-muted">
                        {referrer.visitors.toLocaleString()} visitors
                      </p>
                      {/* Mini bar visualization */}
                      <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-400 rounded-full"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Quality score badge */}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${scoreBadge.bg} ${scoreBadge.text}`}>
                    {referrer.avgScore.toFixed(0)}
                  </span>
                  <ExternalLinkIcon className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
