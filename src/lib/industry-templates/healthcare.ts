import type { IndustryTemplate } from "./types";

export const healthcareTemplate: IndustryTemplate = {
  industry: "healthcare",
  industryDescriptor: "healthcare organizations",

  // Current state
  currentTools: [
    { category: "EHR/EMR", tools: "Epic, Cerner, or similar" },
    { category: "Practice Management", tools: "Athenahealth, AdvancedMD" },
    { category: "Billing/RCM", tools: "Waystar, Availity, clearinghouses" },
    { category: "Reporting", tools: "Excel, basic BI tools" },
  ],
  currentStateNote:
    "These systems capture data well. The question is whether you can actually use that data to make decisions. Probably not without a lot of manual work.",

  // The Gap
  gapHeadline: "Your Data Is Scattered Across Systems",
  toolOptimizations: [
    { tool: "Epic/Cerner", optimizesFor: "clinical documentation, not operational insights" },
    { tool: "Practice management", optimizesFor: "scheduling and billing, not profitability analysis" },
    { tool: "RCM tools", optimizesFor: "claim submission, not denial pattern analysis" },
    { tool: "Excel", optimizesFor: "one-off analysis, not real-time visibility" },
  ],
  gapSummary:
    "None of these tools answer: 'Which locations are actually profitable?' or 'Where are we losing money on payer contracts?'",
  failedQueries: [
    {
      query: "What's the true cost per procedure at each location?",
      whyFails: "Requires pulling from 4 systems and 2 weeks of analyst time.",
    },
    {
      query: "Which payer contracts are underwater?",
      whyFails: "Nobody knows until quarterly finance review—too late to act.",
    },
    {
      query: "Why did denials spike last month?",
      whyFails: "Data sits in the clearinghouse. Pattern analysis requires manual export.",
    },
    {
      query: "How does provider productivity compare across locations?",
      whyFails: "Different systems, different definitions. Apples to oranges.",
    },
  ],
  gapConsequence:
    "Decisions get made on gut feel instead of data. Underperforming locations go unnoticed. Payer contracts get renewed without negotiation leverage.",

  // Cost
  inefficiencies: [
    { issue: "Revenue leakage", impact: "3-8% of net revenue lost to preventable denials" },
    { issue: "Manual reporting", impact: "20-40 hours per month per location" },
    { issue: "Blind spots", impact: "Unprofitable service lines subsidized for months" },
  ],
  totalCostStatementTemplate:
    "For a {companySize} organization, even a 2% improvement in collections or a 10% reduction in denials represents significant six-figure annual impact.",

  // Solution
  opportunityHeadline: "Operational Intelligence That Drives Margin",
  opportunityIntro:
    "Imagine seeing real-time profitability by location, provider, and payer—with alerts when something needs attention.",
  benefits: [
    "Per-location P&L updated daily, not quarterly",
    "Denial patterns identified before they become trends",
    "Payer contract performance visible for renegotiation",
    "Provider productivity benchmarked fairly across locations",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-provider licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working dashboards in 6-8 weeks. Not a year-long implementation.",
    },
    {
      title: "HIPAA-compliant",
      description: "Deploys on your infrastructure. PHI never leaves your control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$300K+ enterprise BI", newApproach: "$75-150K one-time" },
    { metric: "Timeline", traditional: "12-18 months", newApproach: "6-8 weeks" },
    { metric: "Licensing", traditional: "Per-provider, forever", newApproach: "One-time, you own it" },
    { metric: "Data", traditional: "Vendor cloud, BAA complexity", newApproach: "Your servers, your control" },
  ],
  mathConclusion:
    "A 1% improvement in net collections or denial rate typically pays for the entire system in the first year.",

  // Questions
  questionsIntro: "Before we talk, it might be worth considering:",
  questions: [
    "How long does it take to get a true P&L by location or service line?",
    "Do you know which payer contracts are actually profitable?",
    "How quickly can you identify why denials spiked?",
    "Could you benchmark provider productivity across locations today?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible with your data.",

  // Animation content
  searchQuery: "Blue Cross denial rate by location",
  dmsName: "Epic",
  practiceAreas: ["Clinical Ops", "Revenue Cycle", "Compliance", "Quality"],

  // Templates
  introHookTemplate:
    "Your organization generates enormous amounts of data every day. But turning that data into useful insights still requires weeks of analyst time and multiple system exports. That was acceptable when the alternative was million-dollar enterprise platforms. It's not acceptable anymore.",
  keyInsightTemplate:
    "AI and modern data tools have made powerful analytics accessible to organizations of any size. The gap between what PE-backed platforms can see and what you can see is closing fast.",
};
