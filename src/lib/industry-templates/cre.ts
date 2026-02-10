import type { IndustryTemplate } from "./types";

export const creTemplate: IndustryTemplate = {
  industry: "cre",
  industryDescriptor: "commercial real estate firms",

  // Current state
  currentTools: [
    { category: "Property Management", tools: "Yardi, MRI, AppFolio, or similar" },
    { category: "Accounting", tools: "QuickBooks, Sage, or PM-integrated" },
    { category: "Leasing/CRM", tools: "VTS, Salesforce, or spreadsheets" },
    { category: "Reporting", tools: "Excel, manual consolidation" },
  ],
  currentStateNote:
    "These systems handle day-to-day operations. But getting a true portfolio view for investors or strategic decisions still requires painful manual work.",

  // The Gap
  gapHeadline: "Your Portfolio Data Is Fragmented",
  toolOptimizations: [
    { tool: "Yardi/MRI", optimizesFor: "property accounting, not portfolio intelligence" },
    { tool: "Leasing systems", optimizesFor: "deal tracking, not lease analysis at scale" },
    { tool: "Accounting", optimizesFor: "financial statements, not operational metrics" },
    { tool: "Excel", optimizesFor: "one-off analysis, not real-time visibility" },
  ],
  gapSummary:
    "None of these tools answer: 'Which properties are underperforming?' or 'Where should we focus capital?'",
  failedQueries: [
    {
      query: "What's the true NOI by property after all expenses?",
      whyFails: "Requires reconciling PM data, accounting, and CAM allocations. Takes days.",
    },
    {
      query: "Which leases are expiring in the next 18 months and what's the risk?",
      whyFails: "Lease data scattered across systems. No unified expiration dashboard.",
    },
    {
      query: "How does occupancy trend compare across the portfolio?",
      whyFails: "Different properties in different systems. Manual consolidation required.",
    },
    {
      query: "What's our exposure to any single tenant across all properties?",
      whyFails: "Tenant data not linked across properties. Blind spots everywhere.",
    },
  ],
  gapConsequence:
    "Investor reporting takes weeks instead of days. Underperforming assets go unnoticed. Lease renewals get reactive instead of proactive.",

  // Cost
  inefficiencies: [
    { issue: "Investor reporting", impact: "40+ hours per quarter per fund" },
    { issue: "Missed renewals", impact: "Vacancy costs from reactive leasing" },
    { issue: "Hidden underperformers", impact: "Capital tied up in lagging assets" },
  ],
  totalCostStatementTemplate:
    "For a {companySize} portfolio, even a 1% improvement in occupancy or a week faster investor reporting represents significant value.",

  // Solution
  opportunityHeadline: "Portfolio Intelligence at Your Fingertips",
  opportunityIntro:
    "Imagine seeing real-time portfolio performance, lease exposure, and property benchmarks—all in one place, investor-ready.",
  benefits: [
    "Portfolio-wide NOI and occupancy updated daily",
    "Lease expiration pipeline with renewal probability",
    "Property benchmarking across your portfolio",
    "Investor reports generated in hours, not weeks",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-property licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working dashboards in 6-8 weeks. Not a year-long implementation.",
    },
    {
      title: "Your infrastructure",
      description: "Deploys on your systems. Sensitive tenant and investor data stays under your control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$200K+ enterprise BI", newApproach: "$75-150K one-time" },
    { metric: "Timeline", traditional: "9-12 months", newApproach: "6-8 weeks" },
    { metric: "Licensing", traditional: "Per-property, forever", newApproach: "One-time, you own it" },
    { metric: "Data", traditional: "Vendor cloud, their terms", newApproach: "Your servers, your control" },
  ],
  mathConclusion:
    "Reducing investor reporting time by 50% and catching one underperformer early pays for the system.",

  // Questions
  questionsIntro: "Before we talk, ask yourself:",
  questions: [
    "How long does it take to produce a complete investor report?",
    "Do you have a single view of lease expirations across the portfolio?",
    "How quickly can you identify which properties are underperforming?",
    "Could you benchmark property performance across your portfolio today?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible with your portfolio data.",

  // Animation content
  searchQuery: "lease expirations by tenant risk",
  dmsName: "Yardi",
  practiceAreas: ["Asset Management", "Leasing", "Acquisitions", "Investor Relations"],

  // Templates
  introHookTemplate:
    "Your portfolio generates valuable data every day—rent rolls, lease terms, operating expenses. But turning that data into strategic insight still requires weeks of manual consolidation. That was acceptable when enterprise tools cost millions. It's not acceptable anymore.",
  keyInsightTemplate:
    "Modern data tools have made portfolio analytics accessible to growing CRE firms. The visibility gap between you and the institutional players is closing fast.",
};
