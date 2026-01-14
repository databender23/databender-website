"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SourceQualityTable from "./components/SourceQualityTable";
import ContentPerformance from "./components/ContentPerformance";
import TopReferrers from "./components/TopReferrers";
import GeographicBreakdownNew from "./components/GeographicBreakdownNew";
import CompanyIntelligence from "./components/CompanyIntelligence";
import TrendChart from "./components/TrendChart";

// Icons for KPI cards
const SessionsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const VisitorsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const CompaniesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const LeadsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrafficIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ScoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

// Types for API responses
interface OverviewData {
  period: { start: string; end: string; days: number };
  metrics: {
    pageviews: number;
    uniqueVisitors: number;
    sessions: number;
    conversions: number;
    conversionRate: string;
    chatOpens: number;
    chatMessages: number;
    botPageviews: number;
    returningVisitors: number;
    newVisitors: number;
    avgSessionDuration: number;
    bounceRate: string;
  };
  dailyPageviews: { date: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  companyIdentification?: {
    identifiedCompanies: number;
    identifiedSessions: number;
    topCompanies: { name: string; domain: string; visits: number }[];
  };
  leadScoring?: {
    averageScore: number;
  };
}

interface SourcesData {
  sources: {
    source: string;
    sessions: number;
    visitors: number;
    leads: number;
    conversionRate: number;
    avgBehaviorScore: number;
  }[];
  topReferrers: {
    domain: string;
    visitors: number;
    leads: number;
    avgScore: number;
  }[];
}

interface ContentData {
  pages: {
    page: string;
    views: number;
    uniqueVisitors: number;
    leads: number;
    conversionRate: number;
  }[];
}

interface GeographicData {
  countries: {
    country: string;
    sessions: number;
    uniqueVisitors: number;
    conversions: number;
    conversionRate: number;
    avgScore: number;
  }[];
  regions: {
    region: string;
    sessions: number;
    conversions: number;
    conversionRate: number;
  }[];
  summary: {
    totalCountries: number;
    topCountry: string;
    usPercent: number;
  };
}

interface CompaniesData {
  summary: {
    totalIdentified: number;
    tierBreakdown: Record<string, number>;
    totalConverted: number;
    totalHighIntent: number;
  };
  companies: {
    company: string;
    domain: string;
    industry: string;
    visitors: number;
    sessions: number;
    behaviorScore: number;
    pagesViewed: string[];
    keyPages: string[];
    lastVisit: string;
    isLead: boolean;
    leadStatus?: string;
    contactedVia?: string[];
  }[];
}

type DateRange = "7" | "30" | "90" | "custom";

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  index: number;
}

function KPICard({ title, value, subtitle, icon, index }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-xl p-6 border-l-4 border-l-teal-500 border border-border hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden"
    >
      {/* Subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-teal-500">{icon}</span>
          <p className="text-xs font-medium text-teal-500 uppercase tracking-wider">{title}</p>
        </div>
        <p className="text-3xl font-bold text-gradient">{value}</p>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

export default function AnalyticsDashboard() {
  // Overview data state
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState("");

  // Sources data state
  const [sourcesData, setSourcesData] = useState<SourcesData | null>(null);
  const [sourcesLoading, setSourcesLoading] = useState(true);

  // Content data state
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [contentLoading, setContentLoading] = useState(true);

  // Geographic data state
  const [geographicData, setGeographicData] = useState<GeographicData | null>(null);
  const [geographicLoading, setGeographicLoading] = useState(true);

  // Companies data state
  const [companiesData, setCompaniesData] = useState<CompaniesData | null>(null);
  const [companiesLoading, setCompaniesLoading] = useState(true);

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange>("7");
  const days = parseInt(dateRange, 10) || 7;

  // Fetch functions
  const fetchOverview = useCallback(async () => {
    setOverviewLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/overview?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch overview");
      const result = await response.json();
      setOverviewData(result);
      setOverviewError("");
    } catch {
      setOverviewError("Failed to load overview data");
    } finally {
      setOverviewLoading(false);
    }
  }, [days]);

  const fetchSources = useCallback(async () => {
    setSourcesLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/sources?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch sources");
      const result = await response.json();
      setSourcesData(result);
    } catch {
      console.error("Failed to load sources data");
    } finally {
      setSourcesLoading(false);
    }
  }, [days]);

  const fetchContent = useCallback(async () => {
    setContentLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/content?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch content");
      const result = await response.json();
      setContentData(result);
    } catch {
      console.error("Failed to load content data");
    } finally {
      setContentLoading(false);
    }
  }, [days]);

  const fetchGeographic = useCallback(async () => {
    setGeographicLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/geographic?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch geographic");
      const result = await response.json();
      setGeographicData(result);
    } catch {
      console.error("Failed to load geographic data");
    } finally {
      setGeographicLoading(false);
    }
  }, [days]);

  const fetchCompanies = useCallback(async () => {
    setCompaniesLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/companies?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch companies");
      const result = await response.json();
      // Transform to expected format
      const transformed: CompaniesData = {
        summary: result.summary,
        companies: result.companies.map((c: {
          companyName: string;
          companyDomain: string;
          companyIndustry?: string;
          uniqueVisitors: number;
          visitCount: number;
          engagementScore: number;
          pagesViewed: string[];
          viewedContactPage: boolean;
          viewedPricingPage: boolean;
          viewedCaseStudies: boolean;
          viewedServicesPages: boolean;
          lastVisit: string;
          isConverted: boolean;
        }) => ({
          company: c.companyName,
          domain: c.companyDomain,
          industry: c.companyIndustry || "Unknown",
          visitors: c.uniqueVisitors,
          sessions: c.visitCount,
          behaviorScore: c.engagementScore,
          pagesViewed: c.pagesViewed,
          keyPages: [
            ...(c.viewedContactPage ? ["Contact"] : []),
            ...(c.viewedPricingPage ? ["Pricing"] : []),
            ...(c.viewedCaseStudies ? ["Case Studies"] : []),
            ...(c.viewedServicesPages ? ["Services"] : []),
          ],
          lastVisit: c.lastVisit,
          isLead: c.isConverted,
          leadStatus: c.isConverted ? "Lead" : undefined,
          contactedVia: [],
        })),
      };
      setCompaniesData(transformed);
    } catch {
      console.error("Failed to load companies data");
    } finally {
      setCompaniesLoading(false);
    }
  }, [days]);

  // Fetch all data when date range changes
  useEffect(() => {
    fetchOverview();
    fetchSources();
    fetchContent();
    fetchGeographic();
    fetchCompanies();
  }, [fetchOverview, fetchSources, fetchContent, fetchGeographic, fetchCompanies]);

  // Calculate derived metrics
  const directTrafficPercent = overviewData
    ? overviewData.topReferrers.find((r) => r.source === "direct")
      ? Math.round(
          ((overviewData.topReferrers.find((r) => r.source === "direct")?.count || 0) /
            overviewData.metrics.sessions) *
            100
        )
      : 0
    : 0;

  const avgBehaviorScore = overviewData?.leadScoring?.averageScore || 0;

  // Prepare trend data
  const trendData = overviewData?.dailyPageviews.map((d) => ({
    date: d.date,
    sessions: d.count, // Using pageviews as sessions approximation
    visitors: Math.round(d.count * 0.8), // Estimate
    leads: 0, // Would need actual lead data per day
  })) || [];

  // Get unique industries from companies for filters
  const availableIndustries = companiesData
    ? [...new Set(companiesData.companies.map((c) => c.industry).filter(Boolean))]
    : [];

  // Calculate company totals
  const companyTotals = companiesData
    ? {
        totalIdentified: companiesData.summary.totalIdentified,
        withLeads: companiesData.companies.filter((c) => c.isLead).length,
        notContacted: companiesData.companies.filter(
          (c) => !c.contactedVia || c.contactedVia.length === 0
        ).length,
      }
    : { totalIdentified: 0, withLeads: 0, notContacted: 0 };

  // KPI data configuration
  const kpiCards = [
    {
      title: "Total Sessions",
      value: overviewData?.metrics.sessions.toLocaleString() || "0",
      icon: <SessionsIcon />,
    },
    {
      title: "Unique Visitors",
      value: overviewData?.metrics.uniqueVisitors.toLocaleString() || "0",
      icon: <VisitorsIcon />,
    },
    {
      title: "Companies ID'd",
      value: overviewData?.companyIdentification?.identifiedCompanies.toString() || "0",
      icon: <CompaniesIcon />,
    },
    {
      title: "Leads Generated",
      value: overviewData?.metrics.conversions.toString() || "0",
      subtitle: `${overviewData?.metrics.conversionRate || 0}% conv. rate`,
      icon: <LeadsIcon />,
    },
    {
      title: "Direct Traffic",
      value: `${directTrafficPercent}%`,
      subtitle: "of total sessions",
      icon: <TrafficIcon />,
    },
    {
      title: "Avg Behavior Score",
      value: avgBehaviorScore.toString(),
      subtitle: "visitor intent",
      icon: <ScoreIcon />,
    },
  ];

  if (overviewLoading && !overviewData) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (overviewError && !overviewData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-error/10 text-error p-4 rounded-xl border border-error/20"
      >
        {overviewError}
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden"
      >
        {/* Subtle glow spot behind header */}
        <div className="absolute -top-20 -left-20 w-80 h-80 glow-spot glow-spot-teal-subtle" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Analytics Dashboard</h1>
            {overviewData && (
              <p className="text-text-muted mt-1">
                {overviewData.period.start} to {overviewData.period.end}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="px-4 py-2.5 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all duration-200 hover:border-teal-500/50 cursor-pointer font-medium"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((card, index) => (
            <KPICard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Two-Column Layout: Left (60%) and Right (40%) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="mb-4">
          <span className="text-xs font-semibold text-teal-500 uppercase tracking-wider">Traffic Analysis</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <SourceQualityTable
              sources={sourcesData?.sources || []}
              isLoading={sourcesLoading}
            />
            <ContentPerformance
              pages={contentData?.pages || []}
              isLoading={contentLoading}
            />
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2 space-y-6">
            <TopReferrers
              referrers={sourcesData?.topReferrers || []}
              isLoading={sourcesLoading}
            />
            <GeographicBreakdownNew
              countries={geographicData?.countries || []}
              regions={geographicData?.regions || []}
              summary={geographicData?.summary || { totalCountries: 0, topCountry: "N/A", usPercent: 0 }}
              loading={geographicLoading}
            />
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Full-Width Section: Company Intelligence */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="relative overflow-hidden"
      >
        {/* Subtle glow spot */}
        <div className="absolute -top-40 -right-40 w-96 h-96 glow-spot glow-spot-teal-subtle" />

        <div className="mb-4">
          <span className="text-xs font-semibold text-teal-500 uppercase tracking-wider">Company Intelligence</span>
        </div>
        <div className="relative">
          <CompanyIntelligence
            companies={companiesData?.companies || []}
            availableIndustries={availableIndustries}
            totals={companyTotals}
            isLoading={companiesLoading}
          />
        </div>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Bottom Section: Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="mb-4">
          <span className="text-xs font-semibold text-teal-500 uppercase tracking-wider">Performance Trends</span>
        </div>
        <TrendChart
          data={trendData}
          isLoading={overviewLoading}
        />
      </motion.div>
    </div>
  );
}
