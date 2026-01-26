import type { IndustryTemplate } from "./types";

export const accountingTemplate: IndustryTemplate = {
  industry: "accounting",
  industryDescriptor: "mid-sized CPA firms",

  // Current state
  currentTools: [
    { category: "Practice Management", tools: "CCH Axcess, Thomson Reuters CS, or Wolters Kluwer" },
    { category: "Document Management", tools: "SharePoint, GoFileRoom, or network file shares" },
    { category: "Tax Software", tools: "UltraTax, Lacerte, or ProSystem fx" },
    { category: "Research", tools: "Checkpoint or CCH IntelliConnect" },
  ],
  currentStateNote:
    "These tools run your practice. But they weren't designed to answer the question that matters most: 'What does our firm actually know about this situation?'",

  // The Gap
  gapHeadline: "Your Firm's Knowledge Is Trapped in Silos",
  toolOptimizations: [
    { tool: "CCH Axcess / CS Suite", optimizesFor: "workflow and compliance, not knowledge retrieval" },
    { tool: "SharePoint / GoFileRoom", optimizesFor: "document storage, not intelligent search" },
    { tool: "UltraTax / ProSystem fx", optimizesFor: "tax calculations, not finding prior approaches" },
    { tool: "Checkpoint / IntelliConnect", optimizesFor: "external research, not your own work product" },
  ],
  gapSummary:
    "None of these tools help you answer: 'How has our firm handled this exact situation before?'",
  failedQueries: [
    {
      query: "How did we handle the 754 election for the Smith family partnership?",
      whyFails: "Buried in last year's workpapers. No way to search by technical approach.",
    },
    {
      query: "What's our standard methodology for complex estate valuations?",
      whyFails: "Lives in Janet's head. Or maybe in that memo from 2019. Nobody remembers where.",
    },
    {
      query: "Do we have any precedent for this M&A tax structure?",
      whyFails: "Tax, audit, and advisory teams each have pieces. Nobody sees the full picture.",
    },
    {
      query: "What did we advise this client about their state nexus issues last year?",
      whyFails: "Email search returns 150 threads. Workpaper search returns another 40 files.",
    },
  ],
  gapConsequence:
    "Your staff either spend hours digging through prior year workpapers, reinvent approaches that partners solved years ago, or interrupt senior people who should be managing client relationships.",

  // Cost
  inefficiencies: [
    { issue: "Searching for prior approaches", impact: "6-10 hours per week per professional" },
    { issue: "Partner/manager interruptions", impact: "$300-600 per interruption in lost focus" },
    { issue: "New staff ramp-up", impact: "12-18 months to learn the firm's methodology" },
    { issue: "Knowledge loss at retirement", impact: "30+ years of expertise walks out the door" },
  ],
  totalCostStatementTemplate:
    "Conservative estimate for a {companySize} firm: $400K-$800K annually in duplicated effort and lost productivity. That doesn't count the client opportunities missed because you couldn't quickly demonstrate relevant experience.",

  // Solution
  opportunityHeadline: "A Firm Intelligence Layer",
  opportunityIntro:
    "Imagine if any professional could ask a question and get an instant, sourced answer drawn from everything your firm has ever worked on.",
  benefits: [
    "Staff answer their own technical questions instead of interrupting partners",
    "New hires productive in weeks, not months",
    "Prior year workpapers and memos instantly findable by situation, not just client name",
    "Institutional knowledge preserved when partners retire",
    "Cross-practice insights surface automatically (tax implications in audit findings, advisory opportunities from tax work)",
  ],
  differentiators: [
    {
      title: "You own it",
      description: "One-time investment. No per-seat licensing. No subscription that grows every year.",
    },
    {
      title: "Weeks, not months",
      description: "Working system in 6-8 weeks. Not a year-long implementation project.",
    },
    {
      title: "Your infrastructure",
      description: "Deploys on your systems. Client data stays under your complete control.",
    },
    {
      title: "Senior attention",
      description: "Built by experienced practitioners. Not offshore teams or junior consultants following scripts.",
    },
  ],

  // Comparison
  comparison: [
    { metric: "Cost", traditional: "$400K+ enterprise KM platform", newApproach: "$75-125K one-time" },
    { metric: "Timeline", traditional: "12-18 months", newApproach: "6-8 weeks" },
    { metric: "Licensing", traditional: "Per-seat, escalating annually", newApproach: "One-time, you own it" },
    { metric: "Data", traditional: "Vendor cloud, their terms", newApproach: "Your servers, your control" },
  ],
  mathConclusion:
    "The ROI math isn't close. Even a 15% reduction in time spent searching for prior approaches pays for the entire system in year one.",

  // Questions
  questionsIntro: "Before we talk, consider:",
  questions: [
    "How many hours per week do your professionals spend searching for information that exists somewhere in the firm?",
    "What happens to 30 years of institutional knowledge when your founding partners retire?",
    "How long does it take a new senior associate to learn your firm's methodology?",
    "Can you quickly pull relevant experience when a prospect asks 'Have you handled anything like this before?'",
    "How often do tax, audit, and advisory teams miss cross-selling opportunities because they don't see each other's work?",
  ],

  // CTA
  ctaIntro:
    "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's changed and whether it's relevant to your firm.",

  // Animation content
  searchQuery: "754 election partnership",
  dmsName: "SharePoint",
  practiceAreas: ["Tax", "Audit", "Advisory", "Wealth Management"],

  // Templates
  introHookTemplate:
    "Your professionals are spending 1-2 hours per day searching for workpapers, memos, and approaches that exist somewhere in the firm. That was acceptable when the alternative was expensive enterprise software. It's not acceptable anymore.",
  keyInsightTemplate:
    "AI has made senior onshore talent 3-5x more productive at knowledge work. The economics shifted fast. Mid-sized CPA firms can now afford solutions that only Big 4 firms could justify two years ago.",
};
