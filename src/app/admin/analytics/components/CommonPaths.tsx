"use client";

import { useState, useEffect } from "react";

interface PathData {
  path: string;
  pages: string[];
  count: number;
  converted: number;
  conversionRate: number;
  avgDuration: number;
}

interface CommonPathsProps {
  days: number;
}

function getPageName(path: string): string {
  if (path === "/") return "Home";
  const segments = path.slice(1).split("/");
  const lastSegment = segments[segments.length - 1] || segments[0];
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}

export default function CommonPaths({ days }: CommonPathsProps) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaths() {
      try {
        const response = await fetch(`/api/admin/analytics/paths?days=${days}`);
        if (response.ok) {
          const data = await response.json();
          setPaths(data.commonPaths || []);
        }
      } catch (error) {
        console.error("Failed to fetch paths:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPaths();
  }, [days]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Common User Paths</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Common User Paths</h3>
        <p className="text-text-muted text-sm text-center py-4">
          Not enough session data to analyze paths
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...paths.map(p => p.count));

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Common User Paths</h3>
        <span className="text-xs text-text-muted">Top 10 journeys</span>
      </div>

      <div className="space-y-3">
        {paths.map((pathData, index) => (
          <div key={pathData.path} className="relative">
            {/* Background bar */}
            <div
              className="absolute inset-0 bg-teal-500/10 rounded-lg"
              style={{ width: `${(pathData.count / maxCount) * 100}%` }}
            />

            <div className="relative p-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {pathData.pages.map((page, i) => (
                      <span key={i} className="flex items-center">
                        <span className="text-sm font-medium text-text-primary truncate max-w-[100px]" title={page}>
                          {getPageName(page)}
                        </span>
                        {i < pathData.pages.length - 1 && (
                          <svg className="w-4 h-4 text-text-muted mx-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-text-primary">{pathData.count}</div>
                    <div className="text-text-muted">sessions</div>
                  </div>
                  {pathData.conversionRate > 0 && (
                    <div className="text-center">
                      <div className="font-semibold text-teal-600">{pathData.conversionRate}%</div>
                      <div className="text-text-muted">conv.</div>
                    </div>
                  )}
                  {pathData.avgDuration > 0 && (
                    <div className="text-center">
                      <div className="font-semibold text-text-primary">{formatDuration(pathData.avgDuration)}</div>
                      <div className="text-text-muted">avg</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
