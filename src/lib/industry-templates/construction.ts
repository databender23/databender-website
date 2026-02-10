import type { IndustryTemplate } from "./types";

export const constructionTemplate: IndustryTemplate = {
  industry: "construction",
  industryDescriptor: "construction companies",

  // Current state
  currentTools: [
    { category: "Project Management", tools: "Procore, Buildertrend, or similar" },
    { category: "Accounting", tools: "Sage, QuickBooks, Vista, Foundation" },
    { category: "Field Apps", tools: "PlanGrid, Fieldwire, or custom" },
    { category: "Estimating", tools: "Sage Estimating, ProEst, spreadsheets" },
  ],
  currentStateNote:
    "These systems handle day-to-day operations. But getting a real-time view of job profitability or cash position still requires painful manual work.",

  // The Gap
  gapHeadline: "Your Job Data Is Scattered",
  toolOptimizations: [
    { tool: "Procore", optimizesFor: "project tracking, not financial visibility" },
    { tool: "Sage/Vista", optimizesFor: "accounting compliance, not real-time job costing" },
    { tool: "Field Apps", optimizesFor: "documentation, not billing integration" },
    { tool: "Spreadsheets", optimizesFor: "one-off analysis, not operational intelligence" },
  ],
  gapSummary:
    "None of these tools answer: 'What's our real margin on this job?' or 'Which change orders haven't been billed?'",
  failedQueries: [
    {
      query: "What's our cost-to-complete on the Johnson project?",
      whyFails: "Requires reconciling Procore hours, accounting costs, and committed costs. Takes days.",
    },
    {
      query: "Which change orders were approved but not billed?",
      whyFails: "Field approvals don't automatically flow to billing. Revenue walks out the door.",
    },
    {
      query: "What's our cash position for the next 60 days?",
      whyFails: "Receivables, retainage, and billing cycles scattered across systems. Surprises happen.",
    },
    {
      query: "Which crews are actually hitting their budgets?",
      whyFails: "Labor data in one place, job budgets in another. No performance visibility.",
    },
  ],
  gapConsequence:
    "Margin problems surface at closeout, not week 4. Change orders slip through unbilled. Cash flow surprises become emergencies.",

  // Cost
  inefficiencies: [
    { issue: "Unbilled change orders", impact: "2-5% of revenue never collected" },
    { issue: "Late problem detection", impact: "Contingency eaten by surprises" },
    { issue: "WIP reporting", impact: "40+ hours per month reconciling" },
  ],
  totalCostStatementTemplate:
    "For a {companySize} contractor, recovering just 2% of unbilled change orders and catching margin problems early represents significant recovered value.",

  // Solution
  opportunityHeadline: "Job Intelligence at Your Fingertips",
  opportunityIntro:
    "Imagine seeing real-time job profitability, change order status, and cash position—all in one place, updated daily.",
  benefits: [
    "Cost-to-complete updated daily, not monthly",
    "Change orders tracked from field approval to payment",
    "Cash flow visibility across all projects",
    "WIP reports in minutes, not days",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-project licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working dashboards in 4-6 weeks. Not a year-long implementation.",
    },
    {
      title: "Your infrastructure",
      description: "Deploys on your systems. Job cost and bid data stays under your control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$300K+ enterprise BI", newApproach: "$75-150K one-time" },
    { metric: "Timeline", traditional: "12-18 months", newApproach: "4-6 weeks" },
    { metric: "Licensing", traditional: "Per-project, forever", newApproach: "One-time, you own it" },
    { metric: "Data", traditional: "Vendor cloud, their terms", newApproach: "Your servers, your control" },
  ],
  mathConclusion:
    "Recovering 2% of unbilled change orders and catching one margin problem early pays for the system.",

  // Questions
  questionsIntro: "Before we talk, it might be worth considering:",
  questions: [
    "How long does it take to get a true cost-to-complete on any job?",
    "What percentage of approved change orders get billed within 7 days?",
    "When do you typically find out about margin problems on a job?",
    "How many hours does your team spend on monthly WIP reporting?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible with your project data.",

  // Animation content
  searchQuery: "change orders approved but not billed",
  dmsName: "Procore",
  practiceAreas: ["Commercial", "Residential", "Industrial", "Infrastructure"],

  // Templates
  introHookTemplate:
    "Your projects generate valuable data every day. Job costs, change orders, labor hours. But turning that data into useful insight still requires days of spreadsheet work. That was acceptable when enterprise tools cost millions. It's not acceptable anymore.",
  keyInsightTemplate:
    "Modern data tools have made job costing and analytics accessible to growing contractors. The visibility gap between you and the nationals is closing fast.",
};
