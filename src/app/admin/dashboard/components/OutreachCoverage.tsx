"use client";

import Link from "next/link";

interface OutreachCoverageProps {
  data: {
    linkedin: { contacted: number; total: number };
    email: { contacted: number; total: number };
    untouched: number;
  };
}

function formatPercent(contacted: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((contacted / total) * 100)}%`;
}

export default function OutreachCoverage({ data }: OutreachCoverageProps) {
  const channels = [
    {
      label: "LinkedIn",
      icon: "🔗",
      contacted: data.linkedin.contacted,
      total: data.linkedin.total,
      color: "bg-blue-500",
      href: "/admin/leads?excludeChannels=linkedin",
    },
    {
      label: "Email",
      icon: "📧",
      contacted: data.email.contacted,
      total: data.email.total,
      color: "bg-teal-500",
      href: "/admin/leads?excludeChannels=email",
    },
  ];

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        📡 Outreach Coverage
      </h2>

      <div className="space-y-4 mb-6">
        {channels.map((channel) => (
          <div key={channel.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">
                {channel.icon} {channel.label}
              </span>
              <span className="text-sm text-text-muted">
                {channel.contacted}/{channel.total} ({formatPercent(channel.contacted, channel.total)})
              </span>
            </div>
            <div className="h-3 bg-bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${channel.color} rounded-full transition-all`}
                style={{
                  width: `${channel.total > 0 ? (channel.contacted / channel.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Untouched leads alert */}
      {data.untouched > 0 && (
        <Link
          href="/admin/leads?contactStatus=not_contacted"
          className="block p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-600">⚠️</span>
              <span className="text-sm font-medium text-amber-800">
                {data.untouched} leads haven&apos;t been contacted
              </span>
            </div>
            <span className="text-xs text-amber-600">View →</span>
          </div>
        </Link>
      )}

      {data.untouched === 0 && data.linkedin.total > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-sm font-medium text-green-800">
              All leads have been contacted!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
