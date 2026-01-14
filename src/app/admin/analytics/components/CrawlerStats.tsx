"use client";

import { useState, useEffect } from "react";

interface CrawlerData {
  name: string;
  category: string;
  pageviews: number;
  uniquePages: number;
  lastSeen: string;
}

interface CrawlerSummary {
  totalCrawlerPageviews: number;
  totalHumanPageviews: number;
  crawlerPercent: number;
  uniqueCrawlers: number;
}

interface CrawlerStatsProps {
  days: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Search Engine": "bg-blue-500",
  "AI": "bg-purple-500",
  "Social": "bg-pink-500",
  "SEO Tool": "bg-orange-500",
  "Archive": "bg-gray-500",
  "Monitoring": "bg-green-500",
  "Security": "bg-red-500",
  "Feed Reader": "bg-yellow-500",
  "Other": "bg-gray-400",
};

const CATEGORY_BG_COLORS: Record<string, string> = {
  "Search Engine": "bg-blue-100 text-blue-700",
  "AI": "bg-purple-100 text-purple-700",
  "Social": "bg-pink-100 text-pink-700",
  "SEO Tool": "bg-orange-100 text-orange-700",
  "Archive": "bg-gray-100 text-gray-700",
  "Monitoring": "bg-green-100 text-green-700",
  "Security": "bg-red-100 text-red-700",
  "Feed Reader": "bg-yellow-100 text-yellow-700",
  "Other": "bg-gray-100 text-gray-600",
};

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CrawlerStats({ days }: CrawlerStatsProps) {
  const [crawlers, setCrawlers] = useState<CrawlerData[]>([]);
  const [byCategory, setByCategory] = useState<Record<string, number>>({});
  const [summary, setSummary] = useState<CrawlerSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"crawlers" | "categories">("crawlers");

  useEffect(() => {
    async function fetchCrawlers() {
      try {
        const response = await fetch(`/api/admin/analytics/crawlers?days=${days}`);
        if (response.ok) {
          const data = await response.json();
          setCrawlers(data.crawlers || []);
          setByCategory(data.byCategory || {});
          setSummary(data.summary || null);
        }
      } catch (error) {
        console.error("Failed to fetch crawlers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCrawlers();
  }, [days]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Search Engine & Bot Activity</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (!summary || crawlers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Search Engine & Bot Activity</h3>
        <p className="text-text-muted text-sm text-center py-4">
          No crawler activity detected in this period
        </p>
      </div>
    );
  }

  const maxPageviews = Math.max(...crawlers.map(c => c.pageviews));
  const categoryTotal = Object.values(byCategory).reduce((sum, v) => sum + v, 0);

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Search Engine & Bot Activity</h3>
        <span className="text-xs text-text-muted">
          {summary.crawlerPercent}% of traffic
        </span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-bg-secondary rounded-lg">
          <div className="text-2xl font-bold text-text-primary">{summary.totalCrawlerPageviews.toLocaleString()}</div>
          <div className="text-xs text-text-muted">Bot Pageviews</div>
        </div>
        <div className="text-center p-3 bg-bg-secondary rounded-lg">
          <div className="text-2xl font-bold text-text-primary">{summary.uniqueCrawlers}</div>
          <div className="text-xs text-text-muted">Unique Bots</div>
        </div>
        <div className="text-center p-3 bg-bg-secondary rounded-lg">
          <div className="text-2xl font-bold text-teal-600">{summary.totalHumanPageviews.toLocaleString()}</div>
          <div className="text-xs text-text-muted">Human Pageviews</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-border">
        <button
          onClick={() => setActiveTab("crawlers")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "crawlers"
              ? "border-teal-500 text-teal-600"
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          By Crawler
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "categories"
              ? "border-teal-500 text-teal-600"
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          By Category
        </button>
      </div>

      {activeTab === "crawlers" ? (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {crawlers.slice(0, 15).map((crawler) => (
            <div key={crawler.name} className="flex items-center gap-3 py-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-text-primary truncate">
                    {crawler.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_BG_COLORS[crawler.category] || CATEGORY_BG_COLORS.Other}`}>
                    {crawler.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                  <span>{crawler.uniquePages} pages</span>
                  <span>Last: {formatDate(crawler.lastSeen)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${CATEGORY_COLORS[crawler.category] || CATEGORY_COLORS.Other}`}
                    style={{ width: `${(crawler.pageviews / maxPageviews) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary w-12 text-right">
                  {crawler.pageviews}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(byCategory)
            .sort((a, b) => b[1] - a[1])
            .map(([category, count]) => (
              <div key={category} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[category] || CATEGORY_COLORS.Other}`} />
                <span className="flex-1 text-sm text-text-primary">{category}</span>
                <div className="w-32 h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${CATEGORY_COLORS[category] || CATEGORY_COLORS.Other}`}
                    style={{ width: `${(count / categoryTotal) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary w-16 text-right">
                  {count.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
