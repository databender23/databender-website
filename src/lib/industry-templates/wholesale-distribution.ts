import type { IndustryTemplate } from "./types";

export const wholesaleDistributionTemplate: IndustryTemplate = {
  industry: "wholesale-distribution",
  industryDescriptor: "wholesale distributors",

  // Current state
  currentTools: [
    { category: "ERP", tools: "NetSuite, SAP Business One, Epicor, or similar" },
    { category: "WMS", tools: "Fishbowl, 3PL systems, or ERP-integrated" },
    { category: "CRM", tools: "Salesforce, HubSpot, or spreadsheets" },
    { category: "Pricing", tools: "Spreadsheets, ERP price lists, rep knowledge" },
  ],
  currentStateNote:
    "These systems handle day-to-day operations. But getting visibility into customer profitability, inventory health, or pricing consistency still requires painful manual work.",

  // The Gap
  gapHeadline: "Your Distribution Data Is Siloed",
  toolOptimizations: [
    { tool: "ERP", optimizesFor: "transactions, not customer intelligence" },
    { tool: "WMS", optimizesFor: "inventory counts, not inventory optimization" },
    { tool: "CRM", optimizesFor: "pipeline tracking, not profitability analysis" },
    { tool: "Spreadsheets", optimizesFor: "one-off analysis, not operational decisions" },
  ],
  gapSummary:
    "None of these tools answer: 'Which customers actually make us money?' or 'Where is margin leaking?'",
  failedQueries: [
    {
      query: "What's our true margin by customer after cost-to-serve?",
      whyFails: "Revenue in ERP, shipping costs elsewhere, returns scattered. True profitability invisible.",
    },
    {
      query: "Which SKUs are dead stock vs. fast movers?",
      whyFails: "Inventory turns by SKU requires manual analysis. Problems hide in averages.",
    },
    {
      query: "Are reps pricing consistently within our guardrails?",
      whyFails: "Pricing scattered across systems and rep heads. Below-margin deals slip through.",
    },
    {
      query: "What should we order and when?",
      whyFails: "Demand forecasting based on gut feel. Surprised by seasonality every year.",
    },
  ],
  gapConsequence:
    "15-25% of revenue tied up in wrong inventory. Money-losing customers treated like VIPs. Margin leaks undetected.",

  // Cost
  inefficiencies: [
    { issue: "Excess inventory", impact: "15-25% of revenue tied up" },
    { issue: "Pricing inconsistency", impact: "2-5% margin leakage" },
    { issue: "Customer blind spots", impact: "Unprofitable accounts serviced" },
  ],
  totalCostStatementTemplate:
    "For a {companySize} distributor, improving inventory turns by 50% and recovering 2% margin through pricing discipline represents real working capital and profit recovery.",

  // Solution
  opportunityHeadline: "Distribution Intelligence at Your Fingertips",
  opportunityIntro:
    "Imagine seeing customer profitability, inventory health, and pricing performance in one place, updated daily.",
  benefits: [
    "True customer profitability after cost-to-serve",
    "Inventory optimization with dead stock alerts",
    "Pricing guardrails with exception alerts",
    "Demand forecasting that actually predicts",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-warehouse licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working dashboards in 4-6 weeks. Not an 18-month enterprise timeline.",
    },
    {
      title: "Your infrastructure",
      description: "Deploys on your systems. Customer and pricing data stays under your control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$250K+ enterprise BI", newApproach: "$75-150K one-time" },
    { metric: "Timeline", traditional: "12-18 months", newApproach: "4-6 weeks" },
    { metric: "Licensing", traditional: "Per-user, forever", newApproach: "One-time, you own it" },
    { metric: "Data", traditional: "Vendor cloud, their terms", newApproach: "Your servers, your control" },
  ],
  mathConclusion:
    "Freeing up 30% of working capital in inventory and recovering 2% margin pays for the system many times over.",

  // Questions
  questionsIntro: "Before we talk, ask yourself:",
  questions: [
    "Do you know which customers are profitable after cost-to-serve?",
    "What percentage of your inventory hasn't moved in 6 months?",
    "How do you ensure pricing consistency across your sales team?",
    "Could you improve inventory turns by 50%? What would that free up?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible with your distribution data.",

  // Animation content
  searchQuery: "customer profitability by cost-to-serve",
  dmsName: "NetSuite",
  practiceAreas: ["Sales", "Operations", "Purchasing", "Finance"],

  // Templates
  introHookTemplate:
    "Your distribution operation generates valuable data every day. Orders, inventory movements, customer transactions. But turning that data into competitive advantage still requires painful manual analysis. That was acceptable when the nationals were the only ones with data capabilities. It's not acceptable anymore.",
  keyInsightTemplate:
    "Modern data tools have made powerful distribution analytics accessible to mid-sized wholesalers. The visibility gap between you and Amazon or the nationals is closing fast.",
};
