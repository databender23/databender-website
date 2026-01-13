"use client";

import { useState, useEffect } from "react";

interface CompanyData {
  companyName: string;
  companyDomain: string;
  companyIndustry?: string;
  visitCount: number;
  uniqueVisitors: number;
  pageviews: number;
  pagesViewed: string[];
  lastVisit: string;
  firstVisit: string;
  isConverted: boolean;
  conversionTypes: string[];
  avgSessionDuration: number;
  maxScrollDepth: number;
  engagementScore: number;
  viewedContactPage: boolean;
  viewedPricingPage: boolean;
  viewedServicesPages: boolean;
  viewedCaseStudies: boolean;
  multipleVisits: boolean;
  interestedServices: string[];
  interestedIndustries: string[];
  leadTier: "Cold" | "Warm" | "Hot" | "Very Hot";
}

interface CompaniesResponse {
  period: { start: string; end: string; days: number };
  summary: {
    totalIdentified: number;
    tierBreakdown: Record<string, number>;
    totalConverted: number;
    totalHighIntent: number;
  };
  companies: CompanyData[];
}

interface IdentifiedCompaniesProps {
  days?: number;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function getTierColor(tier: string): string {
  switch (tier) {
    case "Very Hot":
      return "bg-red-100 text-red-800 border-red-200";
    case "Hot":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Warm":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getTierDot(tier: string): string {
  switch (tier) {
    case "Very Hot":
      return "bg-red-500";
    case "Hot":
      return "bg-orange-500";
    case "Warm":
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
}

export default function IdentifiedCompanies({ days: initialDays = 30 }: IdentifiedCompaniesProps) {
  const [data, setData] = useState<CompaniesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(initialDays);
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [days, tierFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const tierParam = tierFilter !== "all" ? `&tier=${encodeURIComponent(tierFilter)}` : "";
      const response = await fetch(`/api/admin/analytics/companies?days=${days}${tierParam}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch {
      setError("Failed to load company data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Identified Companies</h3>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Identified Companies</h3>
        <div className="bg-error/10 text-error p-4 rounded-lg text-sm">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Identified Companies</h3>
          <p className="text-sm text-text-muted mt-1">
            {data.summary.totalIdentified} companies identified from IP addresses
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-md bg-bg-primary text-text-primary focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="Very Hot">Very Hot</option>
            <option value="Hot">Hot</option>
            <option value="Warm">Warm</option>
            <option value="Cold">Cold</option>
          </select>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-border rounded-md bg-bg-primary text-text-primary focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-bg-secondary rounded-lg p-3">
          <p className="text-xs text-text-muted uppercase tracking-wide">Very Hot</p>
          <p className="text-xl font-bold text-red-600">{data.summary.tierBreakdown["Very Hot"] || 0}</p>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3">
          <p className="text-xs text-text-muted uppercase tracking-wide">Hot</p>
          <p className="text-xl font-bold text-orange-600">{data.summary.tierBreakdown["Hot"] || 0}</p>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3">
          <p className="text-xs text-text-muted uppercase tracking-wide">High Intent</p>
          <p className="text-xl font-bold text-text-primary">{data.summary.totalHighIntent}</p>
        </div>
        <div className="bg-bg-secondary rounded-lg p-3">
          <p className="text-xs text-text-muted uppercase tracking-wide">Converted</p>
          <p className="text-xl font-bold text-teal-600">{data.summary.totalConverted}</p>
        </div>
      </div>

      {/* Companies Table */}
      {data.companies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted">No companies identified in this period.</p>
          <p className="text-sm text-text-muted mt-2">
            Company identification works best with corporate network traffic.
            Residential and mobile IPs typically cannot be identified.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Company</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Tier</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Visits</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Pages</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Score</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Intent Signals</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {data.companies.map((company) => (
                <>
                  <tr
                    key={company.companyDomain}
                    className="border-b border-border/50 hover:bg-bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => setExpandedCompany(
                      expandedCompany === company.companyDomain ? null : company.companyDomain
                    )}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getTierDot(company.leadTier)}`} />
                        <div>
                          <p className="font-medium text-text-primary">{company.companyName}</p>
                          <p className="text-xs text-text-muted">{company.companyDomain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getTierColor(company.leadTier)}`}>
                        {company.leadTier}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="text-text-primary font-medium">{company.visitCount}</span>
                      {company.multipleVisits && (
                        <span className="ml-1 text-xs text-teal-600" title="Multiple visits">*</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center text-text-secondary">{company.pageviews}</td>
                    <td className="py-3 px-2 text-center">
                      <span className="font-medium text-text-primary">{company.engagementScore}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1 flex-wrap">
                        {company.viewedContactPage && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700" title="Viewed contact page">
                            Contact
                          </span>
                        )}
                        {company.viewedPricingPage && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-700" title="Viewed pricing">
                            Pricing
                          </span>
                        )}
                        {company.viewedCaseStudies && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-700" title="Viewed case studies">
                            Cases
                          </span>
                        )}
                        {company.isConverted && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-teal-100 text-teal-700" title="Converted">
                            Converted
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-text-muted">{formatDate(company.lastVisit)}</td>
                  </tr>
                  {expandedCompany === company.companyDomain && (
                    <tr key={`${company.companyDomain}-details`} className="bg-bg-secondary/30">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Visit Details */}
                          <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Visit Details</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-text-muted">First visit:</span> {formatDate(company.firstVisit)}</p>
                              <p><span className="text-text-muted">Unique visitors:</span> {company.uniqueVisitors}</p>
                              <p><span className="text-text-muted">Avg session:</span> {formatDuration(company.avgSessionDuration)}</p>
                              <p><span className="text-text-muted">Max scroll:</span> {company.maxScrollDepth}%</p>
                            </div>
                          </div>

                          {/* Interests */}
                          <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Interests</h4>
                            {company.interestedServices.length > 0 && (
                              <div className="mb-2">
                                <p className="text-xs text-text-muted mb-1">Services:</p>
                                <div className="flex gap-1 flex-wrap">
                                  {company.interestedServices.map((service) => (
                                    <span key={service} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-teal-100 text-teal-700">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {company.interestedIndustries.length > 0 && (
                              <div>
                                <p className="text-xs text-text-muted mb-1">Industries:</p>
                                <div className="flex gap-1 flex-wrap">
                                  {company.interestedIndustries.map((industry) => (
                                    <span key={industry} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-700">
                                      {industry}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {company.interestedServices.length === 0 && company.interestedIndustries.length === 0 && (
                              <p className="text-sm text-text-muted">No specific interests detected</p>
                            )}
                          </div>

                          {/* Pages Viewed */}
                          <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Pages Viewed ({company.pagesViewed.length})</h4>
                            <div className="max-h-24 overflow-y-auto space-y-1">
                              {company.pagesViewed.slice(0, 10).map((page) => (
                                <p key={page} className="text-xs text-text-secondary truncate" title={page}>
                                  {page}
                                </p>
                              ))}
                              {company.pagesViewed.length > 10 && (
                                <p className="text-xs text-text-muted">+{company.pagesViewed.length - 10} more</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer note */}
      <p className="text-xs text-text-muted mt-4 pt-4 border-t border-border">
        Company identification uses reverse DNS lookup. For enhanced accuracy, consider integrating
        Clearbit Reveal or similar services.
      </p>
    </div>
  );
}
