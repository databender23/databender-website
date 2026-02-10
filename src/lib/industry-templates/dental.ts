import type { IndustryTemplate } from "./types";

export const dentalTemplate: IndustryTemplate = {
  industry: "dental",
  industryDescriptor: "dental service organizations",

  // Current state
  currentTools: [
    { category: "Practice Management", tools: "Dentrix, Eaglesoft, Open Dental, Denticon" },
    { category: "Imaging", tools: "DEXIS, Carestream" },
    { category: "Patient Communication", tools: "Weave, RevenueWell, Lighthouse 360" },
    { category: "Reporting", tools: "Excel, basic PM reports" },
  ],
  currentStateNote:
    "These systems run your practices well. But when you need to understand what's actually happening across 15, 30, or 50 locations? You're back to exporting data and building spreadsheets. That's not a data strategy. That's a workaround.",

  // The Gap
  gapHeadline: "Your Locations Are Data Islands",
  toolOptimizations: [
    { tool: "Practice management", optimizesFor: "scheduling and billing at each location, not cross-DSO visibility" },
    { tool: "Patient communication", optimizesFor: "appointment reminders, not no-show pattern analysis" },
    { tool: "Imaging systems", optimizesFor: "clinical workflows, not case acceptance tracking" },
    { tool: "Excel", optimizesFor: "one-off analysis, not real-time operational intelligence" },
  ],
  gapSummary:
    "None of these tools answer: 'Which locations are actually profitable?' or 'Why does one office have 40% treatment acceptance and another has 65%?'",
  failedQueries: [
    {
      query: "What's the true profitability by location after all costs?",
      whyFails: "Requires pulling from PM, payroll, supply orders. Nobody has time.",
    },
    {
      query: "How does provider productivity compare across locations?",
      whyFails: "Different schedules, different patient mixes. Apples to oranges without normalization.",
    },
    {
      query: "Which payer contracts are actually making us money?",
      whyFails: "Fee schedules live in spreadsheets. Actual reimbursement data sits in PM. Nobody connects them.",
    },
    {
      query: "Why are no-shows 18% at one location and 8% at another?",
      whyFails: "Pattern analysis requires data science. Your team has Excel.",
    },
    {
      query: "Where is supply cost variance bleeding margin?",
      whyFails: "Each office orders independently. Comparison requires manual aggregation.",
    },
  ],
  gapConsequence:
    "Underperforming locations fly under the radar. High-performing dentists leave because they see others coasting. PE partners ask questions you can't answer quickly. Payer contracts get renewed on autopilot.",

  // Cost
  inefficiencies: [
    { issue: "Per-location margin blindness", impact: "5-15% margin variance undetected across locations" },
    { issue: "Treatment acceptance leakage", impact: "Each 5% improvement = significant production per provider" },
    { issue: "No-show costs", impact: "Average no-show costs $200+ in lost chair time" },
    { issue: "Supply cost variance", impact: "10-25% cost difference between locations, same procedures" },
  ],
  totalCostStatementTemplate:
    "For a {companySize} DSO, a 5% improvement in treatment acceptance or a 10% reduction in no-shows represents mid-six-figure annual impact across the platform.",

  // Solution
  opportunityHeadline: "Operational Intelligence for the Whole Platform",
  opportunityIntro:
    "Imagine seeing real-time performance by location, provider, and procedure—with alerts when something needs attention before it becomes a problem.",
  benefits: [
    "Per-location P&L updated daily, not monthly",
    "Provider productivity benchmarked fairly across locations",
    "Treatment acceptance rates tracked and compared",
    "No-show patterns identified with root cause analysis",
    "Supply cost variance flagged automatically",
    "Payer contract performance visible for renegotiation leverage",
    "Chair utilization optimized across the schedule",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-location licensing. No subscription treadmill as you grow.",
    },
    {
      title: "Weeks, not months",
      description: "Working dashboards in 6-8 weeks. Not a year-long enterprise implementation.",
    },
    {
      title: "DSO-native design",
      description: "Built for multi-location visibility, not retrofitted single-practice tools.",
    },
    {
      title: "PE-ready reporting",
      description: "Investor-grade metrics and portfolio views. Answer diligence questions instantly.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$250K+ enterprise BI", newApproach: "$75-125K one-time" },
    { metric: "Timeline", traditional: "9-12 months", newApproach: "6-8 weeks" },
    { metric: "Licensing", traditional: "Per-location, forever", newApproach: "One-time, you own it" },
    { metric: "Scalability", traditional: "New location = new license", newApproach: "Add locations at no cost" },
  ],
  mathConclusion:
    "A 2% improvement in treatment acceptance across the platform typically pays for the entire system in the first year.",

  // Questions
  questionsIntro: "Before we talk, ask yourself:",
  questions: [
    "How long does it take to get a true P&L by location?",
    "Can you benchmark provider productivity fairly across locations today?",
    "Do you know your treatment acceptance rate by provider, procedure, and location?",
    "Could you identify which payer contracts are underwater within a week?",
    "What would 10% fewer no-shows mean for your bottom line?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's possible with your data.",

  // Animation content
  searchQuery: "Treatment acceptance by provider and location",
  dmsName: "Dentrix",
  practiceAreas: ["Clinical Ops", "Revenue Cycle", "Provider Mgmt", "Procurement"],

  // Templates
  introHookTemplate:
    "Your DSO generates thousands of data points every day across every location. But turning that data into useful intelligence still requires weeks of analyst time and endless spreadsheet wrangling. That was tolerable when you had 5 locations. At 20, 30, 50? It's holding you back.",
  keyInsightTemplate:
    "Modern data tools have made powerful multi-location analytics accessible to DSOs of any size. The visibility gap between large platforms with dedicated data teams and growing DSOs like yours is closing fast.",
};
