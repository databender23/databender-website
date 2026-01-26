/**
 * Prospect Landing Pages Data
 *
 * Personalized, password-protected landing pages for audit delivery.
 * Structure mirrors the PDF audit template narrative.
 */

export interface ProspectPage {
  slug: string;
  password: string;

  // === COMPANY PROFILE ===
  companyName: string;
  companyLogo?: string;
  industry: "legal" | "healthcare" | "manufacturing" | "cre" | "general";
  industryDescriptor: string; // "mid-sized law firms", "healthcare organizations"
  companySize: string;
  companyLocation: string;
  leadership?: string;
  recentNews: string[];

  // === CONTACT ===
  contactName: string;
  contactTitle?: string;
  contactPhoto?: string;

  // === THE ECONOMICS HAVE CHANGED ===
  introHook: string; // Personalized opening paragraph
  keyInsight: string; // The blockquote insight

  // === LIKELY CURRENT STATE ===
  currentTools: {
    category: string;
    tools: string;
  }[];
  currentStateNote: string; // "These are solid tools..."

  // === THE GAP ===
  gapHeadline: string;
  toolOptimizations: {
    tool: string;
    optimizesFor: string;
  }[];
  gapSummary: string;
  failedQueries: {
    query: string;
    whyFails: string;
  }[];
  gapConsequence: string;

  // === COST OF THE GAP ===
  inefficiencies: {
    issue: string;
    impact: string;
  }[];
  totalCostStatement: string;

  // === THE OPPORTUNITY ===
  opportunityHeadline: string;
  opportunityIntro: string;
  benefits: string[];
  differentiators: {
    title: string;
    description: string;
  }[];

  // === THE MATH ===
  comparison: {
    metric: string;
    traditional: string;
    newApproach: string;
  }[];
  mathConclusion: string;

  // === QUESTIONS ===
  questionsIntro: string;
  questions: string[];

  // === CTA ===
  ctaIntro: string;

  // === META ===
  createdDate: string;
  softExpirationDays: number;
}

export interface ProspectSession {
  sessionId: string;
  slug: string;
  startTime: string;
  endTime?: string;
  scrollDepth: number;
  sectionsViewed: string[];
  timeOnPageSeconds: number;
  ctaClicked: boolean;
  deviceType: "mobile" | "desktop" | "tablet";
  browser?: string;
  location?: string;
  visitNumber: number;
}

/**
 * Prospect pages data
 */
export const prospectPages: ProspectPage[] = [
  {
    slug: "lp-2026",
    password: "levenfeld",

    // Company Profile
    companyName: "Levenfeld Pearlstein LLC",
    companyLogo: "https://www.lplegal.com/wp-content/themes/levenfeld-pearlstein/images/lp-logo-main.png",
    industry: "legal",
    industryDescriptor: "mid-sized law firms",
    companySize: "80 attorneys",
    companyLocation: "Chicago, IL",
    leadership: "Jessa Baker, CEO",
    recentNews: [
      "4 new partners joined in January 2026",
      "Recognized in Chambers USA 2025 for Real Estate",
      "Expanded healthcare practice with 3 new associates",
    ],

    // Contact
    contactName: "Jessa Baker",
    contactTitle: "CEO",

    // The Economics Have Changed
    introHook:
      "Your attorneys are spending 2-3 hours per day searching for information that already exists somewhere in the firm. That was acceptable when the alternative was expensive enterprise software and 18-month implementations. It's not acceptable anymore.",
    keyInsight:
      "AI has made senior onshore talent 3-5x more productive. The economics shifted fast. Mid-sized firms can now afford solutions that only AmLaw 100 firms could justify two years ago.",

    // Likely Current State
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

    // Cost of the Gap
    inefficiencies: [
      { issue: "Duplicate research", impact: "8-12 hours per week per attorney" },
      { issue: "Partner interruptions", impact: "$400-800 per interruption in lost productivity" },
      { issue: "New attorney ramp-up", impact: "6-12 months to full productivity" },
    ],
    totalCostStatement:
      "Conservative estimate for an 80-attorney firm: $500K-$1M annually in lost productivity. That's before counting the business development opportunities missed because nobody could quickly pull relevant experience.",

    // The Opportunity
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

    // The Math
    comparison: [
      { metric: "Cost", traditional: "$500K+ enterprise platform", newApproach: "$75-150K one-time" },
      { metric: "Timeline", traditional: "12-18 months", newApproach: "6-8 weeks" },
      { metric: "Licensing", traditional: "Per-seat, forever", newApproach: "One-time, you own it" },
      { metric: "Data", traditional: "Vendor cloud, their terms", newApproach: "Your servers, your control" },
    ],
    mathConclusion:
      "The ROI math isn't close. Even a 10% reduction in wasted search time pays for the entire system in year one.",

    // Questions
    questionsIntro:
      "Before we talk, it might be worth considering:",
    questions: [
      "How many hours per week do your attorneys spend searching for information that probably exists somewhere?",
      "What happens to 30 years of institutional knowledge when your most senior partners retire?",
      "How long does it take a new partner to become fully productive?",
      "Could you assemble a pitch deck with relevant firm experience in under an hour?",
    ],

    // CTA
    ctaIntro:
      "If any of those questions hit close to home, let's have a conversation. No pitch. Just a discussion about what's changed and whether it's relevant to LP.",

    // Meta
    createdDate: "2026-01-26",
    softExpirationDays: 30,
  },
];

/**
 * Get a prospect page by slug
 */
export function getProspectPageBySlug(slug: string): ProspectPage | null {
  return prospectPages.find((page) => page.slug === slug) || null;
}

/**
 * Check if a prospect page has soft-expired
 */
export function isProspectPageExpired(page: ProspectPage): boolean {
  const createdDate = new Date(page.createdDate);
  const expirationDate = new Date(createdDate);
  expirationDate.setDate(expirationDate.getDate() + page.softExpirationDays);
  return new Date() > expirationDate;
}

/**
 * Get all prospect page slugs (for static generation)
 */
export function getAllProspectSlugs(): string[] {
  return prospectPages.map((page) => page.slug);
}
