"use client";

import { useState } from "react";

interface RegionData {
  region: string;
  regionCode: string;
  country: string;
  visitors: number;
  sessions: number;
  leads: number;
}

interface CityData {
  city: string;
  region: string;
  country: string;
  visitors: number;
  leads: number;
}

interface Props {
  byRegion: RegionData[];
  byCity: CityData[];
  isLoading?: boolean;
}

type ViewMode = "region" | "city";

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    "US": "\u{1F1FA}\u{1F1F8}",
    "United States": "\u{1F1FA}\u{1F1F8}",
    "GB": "\u{1F1EC}\u{1F1E7}",
    "United Kingdom": "\u{1F1EC}\u{1F1E7}",
    "CA": "\u{1F1E8}\u{1F1E6}",
    "Canada": "\u{1F1E8}\u{1F1E6}",
    "AU": "\u{1F1E6}\u{1F1FA}",
    "Australia": "\u{1F1E6}\u{1F1FA}",
    "DE": "\u{1F1E9}\u{1F1EA}",
    "Germany": "\u{1F1E9}\u{1F1EA}",
    "FR": "\u{1F1EB}\u{1F1F7}",
    "France": "\u{1F1EB}\u{1F1F7}",
    "IN": "\u{1F1EE}\u{1F1F3}",
    "India": "\u{1F1EE}\u{1F1F3}",
    "BR": "\u{1F1E7}\u{1F1F7}",
    "Brazil": "\u{1F1E7}\u{1F1F7}",
    "JP": "\u{1F1EF}\u{1F1F5}",
    "Japan": "\u{1F1EF}\u{1F1F5}",
    "MX": "\u{1F1F2}\u{1F1FD}",
    "Mexico": "\u{1F1F2}\u{1F1FD}",
    "NL": "\u{1F1F3}\u{1F1F1}",
    "Netherlands": "\u{1F1F3}\u{1F1F1}",
    "ES": "\u{1F1EA}\u{1F1F8}",
    "Spain": "\u{1F1EA}\u{1F1F8}",
    "IT": "\u{1F1EE}\u{1F1F9}",
    "Italy": "\u{1F1EE}\u{1F1F9}",
    "SG": "\u{1F1F8}\u{1F1EC}",
    "Singapore": "\u{1F1F8}\u{1F1EC}",
  };
  return flags[country] || "\u{1F30D}";
}

function GlobeIcon({ className }: { className?: string }) {
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
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function GeographicBreakdown({
  byRegion,
  byCity,
  isLoading = false,
}: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("region");

  // Calculate summary stats
  const uniqueCountries = new Set(byRegion.map((r) => r.country));
  const totalCountries = uniqueCountries.size;

  const totalVisitors = byRegion.reduce((sum, r) => sum + r.visitors, 0);
  const usVisitors = byRegion
    .filter((r) => r.country === "US" || r.country === "United States")
    .reduce((sum, r) => sum + r.visitors, 0);
  const usPercent = totalVisitors > 0 ? Math.round((usVisitors / totalVisitors) * 100) : 0;

  // Find top country by visitors
  const countryVisitors: Record<string, number> = {};
  byRegion.forEach((r) => {
    const country = r.country === "United States" ? "US" : r.country;
    countryVisitors[country] = (countryVisitors[country] || 0) + r.visitors;
  });
  const topCountry = Object.entries(countryVisitors)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  const currentData = viewMode === "region" ? byRegion : byCity;
  const maxVisitors = currentData[0]?.visitors || 1;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm">
        <div className="p-5 border-b border-border">
          <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-wider mb-1">
            GEOGRAPHY
          </p>
          <h3 className="text-lg font-semibold text-text-primary">
            Visitor Locations
          </h3>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const hasData = byRegion.length > 0 || byCity.length > 0;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-wider mb-1">
              GEOGRAPHY
            </p>
            <h3 className="text-lg font-semibold text-text-primary">
              Visitor Locations
            </h3>
          </div>
          <span className="text-xs text-text-muted bg-gray-100 px-2 py-1 rounded-full">
            {totalCountries} {totalCountries === 1 ? "country" : "countries"}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Summary Stats Bar */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
              {totalCountries}
            </p>
            <p className="text-xs text-text-muted">Countries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-500">{usPercent}%</p>
            <p className="text-xs text-text-muted">From US</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-text-primary">
              {getCountryFlag(topCountry)} {topCountry}
            </p>
            <p className="text-xs text-text-muted">Top Country</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
          <button
            onClick={() => setViewMode("region")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              viewMode === "region"
                ? "bg-white text-teal-600 shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Regions
          </button>
          <button
            onClick={() => setViewMode("city")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              viewMode === "city"
                ? "bg-white text-teal-600 shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Cities
          </button>
        </div>

        {/* Empty State */}
        {!hasData ? (
          <div className="text-center py-12">
            <GlobeIcon className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted font-medium">No location data</p>
            <p className="text-xs text-text-muted mt-1">
              Geographic data will appear as visitors arrive
            </p>
          </div>
        ) : (
          /* Location List */
          <div className="space-y-2">
            {currentData.slice(0, 10).map((item, index) => {
              const isRegion = "sessions" in item;
              const locationName = isRegion
                ? (item as RegionData).region
                : (item as CityData).city;
              const country = item.country;
              const isUS = country === "US" || country === "United States";
              const secondaryText = isRegion
                ? isUS
                  ? "United States"
                  : country
                : isUS
                ? `${(item as CityData).region}, US`
                : `${(item as CityData).region}, ${country}`;
              const visitors = item.visitors;
              const leads = item.leads;
              const conversionRate =
                visitors > 0 ? ((leads / visitors) * 100).toFixed(1) : "0";

              return (
                <div
                  key={`${viewMode}-${index}`}
                  className="group relative p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <span className="text-xs font-medium text-text-muted w-5 text-center">
                      {index + 1}
                    </span>

                    {/* Flag */}
                    <span className="text-lg">{getCountryFlag(country)}</span>

                    {/* Location Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-text-primary truncate">
                            {locationName}
                          </p>
                          <p className="text-xs text-text-muted truncate">
                            {secondaryText}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-text-primary">
                              {visitors.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-text-muted">
                              visitors
                            </p>
                          </div>
                          {leads > 0 && (
                            <div className="text-right">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700">
                                {leads} lead{leads !== 1 ? "s" : ""}
                              </span>
                              <p className="text-[10px] text-teal-600 mt-0.5">
                                {conversionRate}% CVR
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${(visitors / maxVisitors) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show More Indicator */}
        {currentData.length > 10 && (
          <p className="text-xs text-text-muted mt-4 text-center">
            Showing top 10 of {currentData.length}{" "}
            {viewMode === "region" ? "regions" : "cities"}
          </p>
        )}
      </div>
    </div>
  );
}
