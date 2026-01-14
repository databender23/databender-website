"use client";

interface ChannelQualityProps {
  data: Array<{
    source: string;
    avgScore: number;
    leads: number;
  }>;
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-600";
  if (score >= 50) return "text-amber-600";
  if (score >= 30) return "text-orange-500";
  return "text-gray-500";
}

function getScoreBg(score: number): string {
  if (score >= 70) return "bg-green-100";
  if (score >= 50) return "bg-amber-100";
  if (score >= 30) return "bg-orange-100";
  return "bg-gray-100";
}

function formatSourceName(source: string): string {
  const sourceMap: Record<string, string> = {
    google: "Google (Organic)",
    linkedin: "LinkedIn",
    direct: "Direct",
    referral: "Referral",
    twitter: "Twitter/X",
    facebook: "Facebook",
    bing: "Bing",
    email: "Email Campaign",
  };
  return sourceMap[source.toLowerCase()] || source;
}

export default function ChannelQuality({ data }: ChannelQualityProps) {
  if (data.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          📈 Channel Quality
        </h2>
        <p className="text-text-muted text-sm">
          No channel data available yet. Lead sources will appear here.
        </p>
      </div>
    );
  }

  // Sort by average score descending
  const sortedData = [...data].sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          📈 Channel Quality
        </h2>
        <span className="text-xs text-text-muted">by avg lead score</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-text-muted border-b border-border">
              <th className="pb-2 font-medium">Source</th>
              <th className="pb-2 font-medium text-right">Leads</th>
              <th className="pb-2 font-medium text-right">Avg Score</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedData.slice(0, 6).map((channel, index) => (
              <tr
                key={channel.source}
                className={index < sortedData.length - 1 ? "border-b border-border/50" : ""}
              >
                <td className="py-3">
                  <span className="font-medium text-text-primary">
                    {formatSourceName(channel.source)}
                  </span>
                </td>
                <td className="py-3 text-right text-text-secondary">
                  {channel.leads}
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-sm font-bold ${getScoreColor(channel.avgScore)} ${getScoreBg(channel.avgScore)}`}
                  >
                    {Math.round(channel.avgScore)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-muted">
            💡 <strong>Insight:</strong>{" "}
            {sortedData[0].avgScore >= 60
              ? `${formatSourceName(sortedData[0].source)} brings your highest-quality leads`
              : "Focus on channels that bring higher-scoring leads"}
          </p>
        </div>
      )}
    </div>
  );
}
