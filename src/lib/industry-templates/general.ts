import type { IndustryTemplate } from "./types";

export const generalTemplate: IndustryTemplate = {
  industry: "general",
  industryDescriptor: "growing companies",

  // Current state
  currentTools: [
    { category: "CRM", tools: "Salesforce, HubSpot, or similar" },
    { category: "Accounting/ERP", tools: "QuickBooks, NetSuite, Sage" },
    { category: "Documents", tools: "SharePoint, Google Drive, Dropbox" },
    { category: "Everything Else", tools: "Excel and Google Sheets" },
  ],
  currentStateNote:
    "These tools work fine for what they do. The problem is they don't talk to each other. And somewhere along the way, Excel became the glue holding everything together.",

  // The Gap
  gapHeadline: "Data Silos Are Holding You Back",
  toolOptimizations: [
    { tool: "CRM", optimizesFor: "tracking deals, not understanding customers" },
    { tool: "Accounting software", optimizesFor: "compliance, not insight" },
    { tool: "Spreadsheets", optimizesFor: "flexibility, not scalability or accuracy" },
    { tool: "Cloud storage", optimizesFor: "file access, not knowledge retrieval" },
  ],
  gapSummary:
    "None of these tools optimize for answering: 'What's actually happening in my business?'",
  failedQueries: [
    {
      query: "Which customers are most profitable when you factor in support costs?",
      whyFails: "Revenue in CRM. Costs in accounting. Support tickets in another system. Good luck combining them.",
    },
    {
      query: "What's our actual pipeline health, not just what sales entered?",
      whyFails: "CRM data is only as good as what reps type in. Nobody trusts it.",
    },
    {
      query: "Why did revenue dip last quarter?",
      whyFails: "Four people spend two days building conflicting reports. Still no clear answer.",
    },
    {
      query: "Are we on track this month?",
      whyFails: "Depends who you ask. Everyone has their own spreadsheet.",
    },
  ],
  gapConsequence:
    "Your team spends hours pulling data, reconciling spreadsheets, and debating whose numbers are right. Meanwhile, decisions wait or get made on gut feel.",

  // Cost
  inefficiencies: [
    { issue: "Manual reporting", impact: "1-3 days per week for someone who should be doing something else" },
    { issue: "Reconciliation and data cleanup", impact: "5-10 hours weekly across the team" },
    { issue: "Delayed decisions", impact: "Opportunities missed, problems caught too late" },
  ],
  totalCostStatementTemplate:
    "Conservative estimate for a {companySize} company: $200K-$500K annually in wasted time and missed opportunities. That's before counting the strategic cost of flying blind.",

  // Solution
  opportunityHeadline: "Business Intelligence That Actually Works",
  opportunityIntro:
    "Imagine if every question had a single, trusted answer. No digging. No reconciliation. No debates about whose numbers are right.",
  benefits: [
    "One dashboard everyone trusts, updated automatically",
    "Reports that used to take days now take seconds",
    "Spot problems before they become crises",
    "Make decisions based on data, not gut feel",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-seat licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working system in 4-8 weeks. Not a year-long implementation.",
    },
    {
      title: "Built for your business",
      description: "Custom solution that fits how you work. Not off-the-shelf software you have to work around.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$300K+ enterprise BI platform", newApproach: "$50-150K one-time" },
    { metric: "Timeline", traditional: "6-12 months", newApproach: "4-8 weeks" },
    { metric: "Licensing", traditional: "Per-seat, forever", newApproach: "One-time, you own it" },
    { metric: "Fit", traditional: "You adapt to the software", newApproach: "Built around your business" },
  ],
  mathConclusion:
    "The ROI math isn't close. If it saves your team just 10 hours per week, it pays for itself in year one.",

  // Questions
  questionsIntro: "Before we talk, it might be worth considering:",
  questions: [
    "How many hours per week does your team spend pulling data and building reports?",
    "When was the last time a decision waited because nobody could get the right numbers?",
    "Do you trust the data in your CRM? Your financial reports?",
    "Could you answer 'how's the business doing?' with confidence, right now?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible and whether it's relevant to your business.",

  // Animation content
  searchQuery: "Q3 revenue by customer segment",
  dmsName: "Data Sources",
  practiceAreas: ["Sales", "Finance", "Operations", "Marketing"],

  // Templates
  introHookTemplate:
    "Your team is spending hours every week pulling data, reconciling spreadsheets, and building reports that are outdated the moment they're finished. That was acceptable when the alternative was expensive enterprise software and year-long implementations. It's not acceptable anymore.",
  keyInsightTemplate:
    "AI has made senior talent dramatically more productive. The economics shifted fast. Growing companies can now afford solutions that only large enterprises could justify two years ago.",
};
