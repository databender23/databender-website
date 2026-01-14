"use client";

import { useState, useEffect } from "react";
import type { PageJourneyStep, Session } from "@/lib/analytics/events";

interface LeadJourneyProps {
  leadId: string;
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

function formatSessionDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
}

interface SessionCardProps {
  session: Session;
  isConversionSession?: boolean;
}

function SessionCard({ session, isConversionSession }: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(isConversionSession);

  return (
    <div className={`border rounded-lg ${isConversionSession ? 'border-teal-500 bg-teal-500/5' : 'border-border'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-bg-secondary/50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${session.isConverted ? 'bg-teal-500' : 'bg-gray-300'}`} />
          <div>
            <div className="font-medium text-text-primary text-sm">
              {formatSessionDate(session.startTime)}
              {isConversionSession && (
                <span className="ml-2 text-xs bg-teal-500 text-white px-2 py-0.5 rounded">
                  Conversion
                </span>
              )}
            </div>
            <div className="text-xs text-text-muted flex items-center gap-3">
              <span>{session.pageCount} pages</span>
              {session.duration && <span>{formatDuration(session.duration)}</span>}
              <span className="capitalize">{session.device}</span>
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && session.pagesVisited && session.pagesVisited.length > 0 && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-3 space-y-2">
            {session.pagesVisited.map((path, index) => {
              const iconType = getPageIcon(path);
              const isEntry = index === 0;
              const isExit = index === session.pagesVisited!.length - 1;

              return (
                <div
                  key={`${path}-${index}`}
                  className="flex items-center gap-3 py-1"
                >
                  <div className="w-6 text-center text-xs text-text-muted">
                    {index + 1}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isEntry ? 'bg-teal-500 text-white' :
                    isExit ? 'bg-teal-100 text-teal-700' :
                    'bg-bg-secondary text-text-muted'
                  }`}>
                    <PageIcon type={iconType} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-text-primary">
                      {getPageName(path)}
                    </span>
                    {(isEntry || isExit) && (
                      <span className="ml-2 text-xs text-text-muted">
                        ({isEntry ? 'entry' : 'exit'})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeadJourney({ leadId, pageJourney, pagesVisited }: LeadJourneyProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllSessions, setShowAllSessions] = useState(false);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetch(`/api/admin/leads/${leadId}/sessions`);
        if (response.ok) {
          const data = await response.json();
          setSessions(data.sessions || []);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [leadId]);

  // Use pageJourney if available (has timestamps), otherwise fall back to pagesVisited
  const hasDetailedJourney = pageJourney && pageJourney.length > 0;
  const hasSessions = sessions.length > 0;
  const displaySessions = showAllSessions ? sessions : sessions.slice(0, 3);

  if (loading) {
    return (
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Session History
        </h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (!hasSessions && !hasDetailedJourney && (!pagesVisited || pagesVisited.length === 0)) {
    return (
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Session History
        </h3>
        <p className="text-text-muted text-sm text-center py-4">
          No session data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">
          Session History
        </h3>
        {sessions.length > 0 && (
          <span className="text-xs text-text-muted">
            {sessions.length} session{sessions.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {hasSessions ? (
        // Show sessions with expandable page journeys
        <div className="space-y-3">
          {displaySessions.map((session, index) => (
            <SessionCard
              key={session.sessionId}
              session={session}
              isConversionSession={index === 0 && session.isConverted}
            />
          ))}

          {sessions.length > 3 && (
            <button
              onClick={() => setShowAllSessions(!showAllSessions)}
              className="w-full py-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              {showAllSessions ? 'Show less' : `Show ${sessions.length - 3} more sessions`}
            </button>
          )}
        </div>
      ) : hasDetailedJourney ? (
        // Fallback to detailed journey with timestamps
        <div className="relative">
          <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-border"></div>
          <div className="space-y-4">
            {pageJourney.map((step, index) => {
              const iconType = getPageIcon(step.page);
              const isFirst = index === 0;
              const isLast = index === pageJourney.length - 1;

              return (
                <div key={`${step.page}-${step.timestamp}`} className="relative flex gap-4">
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
                  <div className="flex-1 min-w-0 pb-2">
                    <span className="font-medium text-text-primary text-sm">
                      {getPageName(step.page)}
                    </span>
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
          <span className="text-text-muted">Total Sessions</span>
          <span className="text-text-primary font-medium">{sessions.length || 1}</span>
        </div>
        {sessions.length > 0 && (
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-text-muted">Total Pages Viewed</span>
            <span className="text-text-primary font-medium">
              {sessions.reduce((sum, s) => sum + s.pageCount, 0)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
