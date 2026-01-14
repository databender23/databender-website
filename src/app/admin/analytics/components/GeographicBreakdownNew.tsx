"use client";

interface CountryMetrics {
  country: string;
  sessions: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  avgScore: number;
}

interface RegionMetrics {
  region: string;
  sessions: number;
  conversions: number;
  conversionRate: number;
}

interface GeographicBreakdownProps {
  countries: CountryMetrics[];
  regions: RegionMetrics[];
  summary: {
    totalCountries: number;
    topCountry: string;
    usPercent: number;
  };
  loading?: boolean;
}

function getCountryFlag(country: string): string {
  // Simple emoji flags for common countries
  const flags: Record<string, string> = {
    "US": "🇺🇸",
    "United States": "🇺🇸",
    "GB": "🇬🇧",
    "United Kingdom": "🇬🇧",
    "CA": "🇨🇦",
    "Canada": "🇨🇦",
    "AU": "🇦🇺",
    "Australia": "🇦🇺",
    "DE": "🇩🇪",
    "Germany": "🇩🇪",
    "FR": "🇫🇷",
    "France": "🇫🇷",
    "IN": "🇮🇳",
    "India": "🇮🇳",
    "BR": "🇧🇷",
    "Brazil": "🇧🇷",
    "JP": "🇯🇵",
    "Japan": "🇯🇵",
    "MX": "🇲🇽",
    "Mexico": "🇲🇽",
  };
  return flags[country] || "🌍";
}

export default function GeographicBreakdownNew({ countries, regions, summary, loading }: GeographicBreakdownProps) {
  if (loading) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Geographic Distribution</h3>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  const maxSessions = countries[0]?.sessions || 1;

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Geographic Distribution</h3>
        <span className="text-xs text-text-muted">
          {summary.totalCountries} countries
        </span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-bg-secondary rounded-lg p-3">
          <p className="text-xs text-text-muted">Top Country</p>
          <p className="text-sm font-semibold text-text-primary">
            {getCountryFlag(summary.topCountry)} {summary.topCountry}
          </p>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3">
          <p className="text-xs text-text-muted">US Traffic</p>
          <p className="text-sm font-semibold text-text-primary">{summary.usPercent}%</p>
        </div>
      </div>

      {/* Countries List */}
      {countries.length === 0 ? (
        <p className="text-text-muted text-sm">No geographic data available</p>
      ) : (
        <div className="space-y-2">
          {countries.slice(0, 8).map((country, index) => (
            <div key={country.country} className="flex items-center gap-2">
              <span className="text-sm text-text-muted w-4">{index + 1}</span>
              <span className="text-sm">{getCountryFlag(country.country)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm text-text-secondary truncate">
                    {country.country}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-sm text-text-primary font-medium">
                      {country.sessions}
                    </span>
                    {country.conversions > 0 && (
                      <span className="text-[10px] text-teal-600">
                        {country.conversions}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${(country.sessions / maxSessions) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* US Regions (if available) */}
      {regions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
            Top US States
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.slice(0, 5).map((region) => (
              <span
                key={region.region}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-bg-secondary text-text-secondary"
              >
                {region.region}
                <span className="font-medium text-text-primary">{region.sessions}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
