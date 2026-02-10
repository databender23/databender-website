import type { IndustryTemplate } from "./types";

export const legalTemplate: IndustryTemplate = {
  industry: "legal",
  industryDescriptor: "mid-sized law firms",

  // Current state
  currentTools: [
    { category: "Document Management", tools: "iManage or NetDocuments" },
    { category: "Practice Management", tools: "Clio, PracticePanther, or similar" },
    { category: "Email", tools: "Outlook / Exchange" },
    { category: "Research", tools: "Westlaw, LexisNexis" },
  ],
  currentStateNote:
    "These are solid tools. The question isn't whether to replace them. The question is whether they're working together intelligently. They're probably not.",

  // The Gap
  gapHeadline: "Knowledge Silos Are Costing You",
  toolOptimizations: [
    { tool: "iManage", optimizesFor: "document storage and version control" },
    { tool: "Outlook", optimizesFor: "communication, not knowledge retrieval" },
    { tool: "Westlaw", optimizesFor: "external legal research, not your own work product" },
    { tool: "Practice management", optimizesFor: "billing and matter tracking" },
  ],
  gapSummary:
    "None of these tools optimize for answering: 'What does our firm actually know about this?'",
  failedQueries: [
    {
      query: "How did we structure earnouts in our last 5 healthcare M&A deals?",
      whyFails: "Scattered across 50+ documents in different matters. No way to search by deal structure.",
    },
    {
      query: "What's our standard approach to non-compete clauses in Illinois?",
      whyFails: "Lives in Sarah's head. Or maybe Tom's old emails. Nobody's sure.",
    },
    {
      query: "Do we have any precedent for this exact situation?",
      whyFails: "127 search results. None ranked by relevance to your actual question.",
    },
    {
      query: "What did we advise this client last time they asked about X?",
      whyFails: "Email search returns 200 threads. Good luck.",
    },
  ],
  gapConsequence:
    "Your attorneys either spend hours digging, reinvent work that's already been done, or interrupt a senior partner who's billing at $800/hour.",

  // Cost
  inefficiencies: [
    { issue: "Duplicate research", impact: "2-3 hours per week per attorney" },
    { issue: "Partner interruptions", impact: "$400-800 per interruption in lost productivity" },
    { issue: "New attorney ramp-up", impact: "6-12 months to full productivity" },
  ],
  totalCostStatementTemplate:
    "Conservative estimate for a {companySize} firm: the math adds up fast. That's before counting the business development opportunities missed because nobody could quickly pull relevant experience.",

  // Solution
  opportunityHeadline: "A Firm Intelligence Layer",
  opportunityIntro:
    "Imagine if every attorney could ask a question and get an instant, sourced answer drawn from everything the firm has ever done.",
  benefits: [
    "Associates answer their own questions instead of interrupting partners",
    "New attorneys productive in weeks, not months",
    "Pitch decks assembled in hours with real, relevant experience",
    "Institutional knowledge preserved when partners retire",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-seat licensing. No subscription treadmill.",
    },
    {
      title: "Weeks, not months",
      description: "Working system in 6-8 weeks. Not a year-long implementation.",
    },
    {
      title: "Your infrastructure",
      description: "Deploys on your systems. Your data stays under your control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$500K+ enterprise platform", newApproach: "$75-150K one-time" },
    { metric: "Timeline", traditional: "12-18 months", newApproach: "6-8 weeks" },
    { metric: "Licensing", traditional: "Per-seat, forever", newApproach: "One-time, you own it" },
    { metric: "Data", traditional: "Vendor cloud, their terms", newApproach: "Your servers, your control" },
  ],
  mathConclusion:
    "The ROI math isn't close. Even a 10% reduction in wasted search time pays for the entire system in year one.",

  // Questions
  questionsIntro: "Before we talk, ask yourself:",
  questions: [
    "How many hours per week do your attorneys spend searching for information that probably exists somewhere?",
    "What happens to 30 years of institutional knowledge when your most senior partners retire?",
    "How long does it take a new partner to become fully productive?",
    "Could you assemble a pitch deck with relevant firm experience in under an hour?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's changed and whether it's relevant to your firm.",

  // Animation content
  searchQuery: "MedTech Partners earnout",
  dmsName: "iManage",
  practiceAreas: ["Real Estate", "Corporate M&A", "Employment", "Trusts & Estates"],

  // Templates
  introHookTemplate:
    "Your attorneys are spending 2+ hours per week searching for information that already exists somewhere in the firm. That was acceptable when the alternative was expensive enterprise software and 18-month implementations. It's not acceptable anymore.",
  keyInsightTemplate:
    "AI has made senior onshore talent 3-5x more productive. The economics shifted fast. Mid-sized firms can now afford solutions that only AmLaw 100 firms could justify two years ago.",
};
