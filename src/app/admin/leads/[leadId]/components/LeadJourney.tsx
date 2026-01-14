"use client";

import type { PageJourneyStep } from "@/lib/analytics/events";

interface LeadJourneyProps {
  pageJourney?: PageJourneyStep[];
  pagesVisited?: string[];
}

function formatJourneyTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getPageName(path: string): string {
  if (path === "/") return "Home";

  // Remove leading slash and split by /
  const segments = path.slice(1).split("/");

  // Get the last meaningful segment
  const lastSegment = segments[segments.length - 1] || segments[0];

  // Convert to title case and replace hyphens with spaces
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getPageIcon(path: string): string {
  if (path === "/") return "home";
  if (path.includes("/services")) return "cog";
  if (path.includes("/industries")) return "building";
  if (path.includes("/case-studies")) return "document";
  if (path.includes("/blog")) return "newspaper";
  if (path.includes("/about")) return "users";
  if (path.includes("/contact")) return "mail";
  if (path.includes("/resources") || path.includes("/guides")) return "book";
  if (path.includes("/assessments")) return "chart";
  return "page";
}

function PageIcon({ type }: { type: string }) {
  const iconPaths: Record<string, React.ReactNode> = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
    cog: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    building: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
    document: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    newspaper: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
      />
    ),
    users: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    ),
    mail: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    book: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
    chart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
    page: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
  };

  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {iconPaths[type] || iconPaths.page}
    </svg>
  );
}

export default function LeadJourney({ pageJourney, pagesVisited }: LeadJourneyProps) {
  // Use pageJourney if available (has timestamps), otherwise fall back to pagesVisited
  const hasDetailedJourney = pageJourney && pageJourney.length > 0;

  if (!hasDetailedJourney && (!pagesVisited || pagesVisited.length === 0)) {
    return (
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Page Journey
        </h3>
        <p className="text-text-muted text-sm text-center py-4">
          No page journey data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
        Page Journey
      </h3>

      {hasDetailedJourney ? (
        // Detailed journey with timestamps
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-border"></div>

          <div className="space-y-4">
            {pageJourney.map((step, index) => {
              const iconType = getPageIcon(step.page);
              const isFirst = index === 0;
              const isLast = index === pageJourney.length - 1;

              return (
                <div key={`${step.page}-${step.timestamp}`} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isFirst
                        ? "bg-teal-500 text-white"
                        : isLast
                        ? "bg-teal-100 text-teal-700 border-2 border-teal-500"
                        : "bg-bg-secondary text-text-muted border border-border"
                    }`}
                  >
                    <PageIcon type={iconType} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-text-primary text-sm">
                        {getPageName(step.page)}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted truncate" title={step.page}>
                      {step.page}
                    </p>
                    {step.timestamp && (
                      <p className="text-xs text-text-muted mt-0.5">
                        {formatJourneyTime(step.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Simple list of pages visited
        <div className="space-y-2">
          {pagesVisited?.map((path, index) => {
            const iconType = getPageIcon(path);
            return (
              <div
                key={`${path}-${index}`}
                className="flex items-center gap-3 py-2 px-3 bg-bg-secondary rounded-md"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                  <PageIcon type={iconType} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-text-primary text-sm">
                    {getPageName(path)}
                  </span>
                  <p className="text-xs text-text-muted truncate">{path}</p>
                </div>
                <span className="text-xs text-text-muted flex-shrink-0">
                  #{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Total Pages</span>
          <span className="text-text-primary font-medium">
            {hasDetailedJourney ? pageJourney.length : pagesVisited?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
