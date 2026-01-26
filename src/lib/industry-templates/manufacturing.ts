import type { IndustryTemplate } from "./types";

export const manufacturingTemplate: IndustryTemplate = {
  industry: "manufacturing",
  industryDescriptor: "scale-up manufacturers",

  // Current state
  currentTools: [
    { category: "ERP", tools: "SAP, Oracle, Epicor, or similar" },
    { category: "MES/Production", tools: "Shop floor systems, PLCs" },
    { category: "Quality", tools: "QMS, inspection systems" },
    { category: "Reporting", tools: "Excel, manual consolidation" },
  ],
  currentStateNote:
    "These systems run your operations. But getting a unified view across production, quality, and finance still requires heroic spreadsheet work.",

  // The Gap
  gapHeadline: "Your Systems Don't Talk to Each Other",
  toolOptimizations: [
    { tool: "ERP", optimizesFor: "transactions and financials, not real-time production visibility" },
    { tool: "MES", optimizesFor: "machine data, not business context" },
    { tool: "Quality systems", optimizesFor: "compliance records, not trend analysis" },
    { tool: "Excel", optimizesFor: "one-off analysis, not continuous monitoring" },
  ],
  gapSummary:
    "None of these tools answer: 'What's actually driving our costs?' or 'Where are we losing margin?'",
  failedQueries: [
    {
      query: "What's the true cost per unit including all overhead?",
      whyFails: "Requires pulling from ERP, production, and quality systems. Takes a week.",
    },
    {
      query: "Which products are actually profitable after all costs?",
      whyFails: "Standard costs don't reflect reality. Nobody knows until year-end.",
    },
    {
      query: "Why did scrap rate spike last month?",
      whyFails: "Quality data lives in a separate system. Root cause analysis is manual.",
    },
    {
      query: "How does OEE compare across shifts and lines?",
      whyFails: "Different systems, different definitions. Benchmarking is guesswork.",
    },
  ],
  gapConsequence:
    "Decisions get made on outdated information. Unprofitable products get prioritized. Quality issues aren't caught until they become customer complaints.",

  // Cost
  inefficiencies: [
    { issue: "Margin leakage", impact: "2-5% of revenue lost to hidden inefficiencies" },
    { issue: "Manual reporting", impact: "40+ hours per month consolidating data" },
    { issue: "Quality escapes", impact: "Defects caught at customer, not production" },
  ],
  totalCostStatementTemplate:
    "For a {companySize} manufacturer, even a 1% improvement in yield or a 5% reduction in scrap represents significant six-figure annual savings.",

  // Solution
  opportunityHeadline: "A Unified View of Your Operations",
  opportunityIntro:
    "Imagine seeing real-time cost per unit, quality trends, and production efficiency—all in one place, updated automatically.",
  benefits: [
    "True product profitability visible daily, not quarterly",
    "Quality trends identified before they reach customers",
    "OEE and efficiency benchmarked across lines and shifts",
    "Cost drivers traced from floor to financial statements",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-user licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working dashboards in 6-8 weeks. Not a year-long ERP project.",
    },
    {
      title: "Your infrastructure",
      description: "Deploys on-premise or in your cloud. Data stays under your control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$500K+ enterprise BI", newApproach: "$75-150K one-time" },
    { metric: "Timeline", traditional: "12-24 months", newApproach: "6-8 weeks" },
    { metric: "Licensing", traditional: "Per-user, forever", newApproach: "One-time, you own it" },
    { metric: "Integration", traditional: "Rip and replace", newApproach: "Works with existing systems" },
  ],
  mathConclusion:
    "A 1% improvement in yield or scrap rate typically pays for the entire system in the first year.",

  // Questions
  questionsIntro: "Before we talk, it might be worth considering:",
  questions: [
    "How long does it take to get true cost per unit across all products?",
    "Do you know which products are actually profitable after all overhead?",
    "How quickly can you trace a quality issue back to root cause?",
    "Could you benchmark efficiency across lines and shifts today?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible with your data.",

  // Animation content
  searchQuery: "cost variance by product line",
  dmsName: "SAP",
  practiceAreas: ["Production", "Supply Chain", "Quality", "Maintenance"],

  // Templates
  introHookTemplate:
    "Your operations generate data constantly—from the shop floor to the ERP. But turning that data into actionable insights still requires weeks of manual consolidation. That was acceptable when the alternative was multi-million dollar enterprise platforms. It's not acceptable anymore.",
  keyInsightTemplate:
    "Modern data tools have made sophisticated manufacturing analytics accessible to mid-sized companies. The visibility gap between you and the Fortune 500 is closing fast.",
};
