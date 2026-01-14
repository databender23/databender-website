"use client";

interface CityMetrics {
  city: string;
  region: string;
  regionCode: string;
  country: string;
  visitors: number;
  leads: number;
}

interface RegionMetrics {
  region: string;
  sessions: number;
  visitors: number;
  leads: number;
}

interface GeographicBreakdownProps {
  cities: CityMetrics[];
  regions: RegionMetrics[];
  summary: {
    totalCities: number;
    topCity: string;
    topCityRegion: string;
    usPercent: number;
  };
  loading?: boolean;
}

function getStateAbbreviation(regionCode: string, country: string): string {
  // Return state abbreviation for US states
  if (country === "United States" || country === "US") {
    return regionCode || "";
  }
  return "";
}

function formatCityDisplay(city: string, regionCode: string, country: string): string {
  const stateAbbr = getStateAbbreviation(regionCode, country);
  if (stateAbbr) {
    return `${city}, ${stateAbbr}`;
  }
  // For non-US, show country
  if (country && country !== "United States" && country !== "US") {
    return `${city}, ${country}`;
  }
  return city;
}

function LocationIcon() {
  return (
    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function GeographicBreakdownNew({ cities, regions, summary, loading }: GeographicBreakdownProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Geographic Distribution</h3>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  const maxVisitors = cities[0]?.visitors || 1;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
            Location
          </p>
          <h3 className="text-lg font-semibold text-text-primary">Top Markets</h3>
        </div>
        <span className="text-xs text-text-muted">
          {summary.totalCities} cities
        </span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-3 border border-teal-100">
          <p className="text-xs text-text-muted">Top Market</p>
          <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
            <LocationIcon />
            {summary.topCity}{summary.topCityRegion ? `, ${summary.topCityRegion}` : ""}
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-text-muted">US Traffic</p>
          <p className="text-sm font-semibold text-text-primary">{summary.usPercent}%</p>
        </div>
      </div>

      {/* Cities List */}
      {cities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <LocationIcon />
          </div>
          <p className="text-text-muted text-sm">No geographic data available</p>
        </div>
      ) : (
        <div className="space-y-2">
          {cities.slice(0, 8).map((city, index) => (
            <div key={`${city.city}-${city.region}`} className="flex items-center gap-2">
              <span className="text-sm text-text-muted w-4 text-right">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm text-text-secondary truncate">
                    {formatCityDisplay(city.city, city.regionCode, city.country)}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-sm text-text-primary font-medium">
                      {city.visitors}
                    </span>
                    {city.leads > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-600 font-medium">
                        {city.leads} {city.leads === 1 ? "lead" : "leads"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all"
                    style={{ width: `${(city.visitors / maxVisitors) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top States/Regions */}
      {regions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
            Top States
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.slice(0, 6).map((region) => (
              <span
                key={region.region}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-gray-50 text-text-secondary border border-gray-100"
              >
                {region.region}
                <span className="font-semibold text-text-primary">{region.visitors}</span>
                {region.leads > 0 && (
                  <span className="text-teal-600">({region.leads})</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
