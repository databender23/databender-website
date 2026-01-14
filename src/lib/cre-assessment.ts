// CRE Portfolio Analytics Assessment

export interface CREQuestion {
  id: string;
  category: "portfolioVisibility" | "investorReporting";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

// Company Profile questions (not scored)
export interface CREProfileQuestion {
  id: string;
  question: string;
  type: "select" | "multiselect" | "text";
  options?: { value: string; label: string }[];
  required: boolean;
}

export const profileQuestions: CREProfileQuestion[] = [
  {
    id: "companyName",
    question: "Company Name",
    type: "text",
    required: false,
  },
  {
    id: "propertyCount",
    question: "Number of Properties Managed",
    type: "select",
    options: [
      { value: "1-5", label: "1-5 properties" },
      { value: "6-15", label: "6-15 properties" },
      { value: "16-30", label: "16-30 properties" },
      { value: "30+", label: "30+ properties" },
    ],
    required: true,
  },
  {
    id: "propertyTypes",
    question: "Property Types",
    type: "multiselect",
    options: [
      { value: "multifamily", label: "Multifamily" },
      { value: "office", label: "Office" },
      { value: "retail", label: "Retail" },
      { value: "industrial", label: "Industrial" },
      { value: "mixed-use", label: "Mixed-use" },
      { value: "other", label: "Other" },
    ],
    required: true,
  },
  {
    id: "externalInvestors",
    question: "Do You Report to External Investors?",
    type: "select",
    options: [
      { value: "institutional", label: "Yes, institutional LPs" },
      { value: "family-office", label: "Yes, family office or individual investors" },
      { value: "occasional", label: "Occasionally (partners, family members)" },
      { value: "none", label: "No external investors" },
    ],
    required: true,
  },
];

export const creQuestions: CREQuestion[] = [
  // Portfolio Visibility (4 questions)
  {
    id: "pm-systems",
    category: "portfolioVisibility",
    question: "How many different property management systems are in use across your portfolio?",
    options: [
      { value: 7, label: "1 system (standardized)", description: "Single PM system across all properties" },
      { value: 4, label: "2-3 systems", description: "A few systems requiring some consolidation" },
      { value: 1, label: "4+ systems", description: "Multiple systems across properties" },
      { value: 0, label: "Don't know / varies", description: "Each property may use different systems" },
    ],
  },
  {
    id: "unified-view",
    category: "portfolioVisibility",
    question: "How long does it take to get a unified view of occupancy across all properties?",
    options: [
      { value: 7, label: "Minutes (automated dashboard)", description: "Real-time visibility across portfolio" },
      { value: 4, label: "Hours (some manual work)", description: "Quick consolidation with minor effort" },
      { value: 2, label: "Days (significant manual consolidation)", description: "Requires pulling from multiple sources" },
      { value: 0, label: "We can't get a unified view easily", description: "No consolidated view available" },
    ],
  },
  {
    id: "noi-tracking",
    category: "portfolioVisibility",
    question: "How do you currently track portfolio-wide NOI?",
    options: [
      { value: 7, label: "Real-time dashboard updated automatically", description: "Automated NOI tracking" },
      { value: 4, label: "Monthly spreadsheet consolidation", description: "Regular manual process" },
      { value: 2, label: "Quarterly manual process", description: "Periodic consolidation" },
      { value: 0, label: "We don't track portfolio-wide NOI", description: "Property-by-property only" },
    ],
  },
  {
    id: "ad-hoc-questions",
    category: "portfolioVisibility",
    question: "When an investor asks an unexpected portfolio question, how long does it take to answer?",
    options: [
      { value: 7, label: "Minutes (data is accessible)", description: "Information at your fingertips" },
      { value: 4, label: "Hours (requires some digging)", description: "Needs some research" },
      { value: 2, label: "Days (requires manual research)", description: "Significant effort required" },
      { value: 0, label: "Often can't answer definitively", description: "Data not readily available" },
    ],
  },
  // Investor Reporting (4 questions)
  {
    id: "reporting-time",
    category: "investorReporting",
    question: "How long does quarterly investor reporting take?",
    options: [
      { value: 7, label: "Less than a day (mostly automated)", description: "Streamlined reporting process" },
      { value: 5, label: "1-3 days", description: "Manageable with some manual work" },
      { value: 2, label: "1-2 weeks", description: "Significant time investment" },
      { value: 0, label: "2+ weeks", description: "Major quarterly effort" },
    ],
  },
  {
    id: "report-confidence",
    category: "investorReporting",
    question: "How confident are you in investor report accuracy?",
    options: [
      { value: 7, label: "Very confident (data is verified automatically)", description: "Automated validation" },
      { value: 4, label: "Somewhat confident (occasional errors found)", description: "Generally reliable" },
      { value: 2, label: "Not very confident (often find issues after sending)", description: "Post-delivery corrections common" },
      { value: 0, label: "We frequently catch errors", description: "Accuracy is a known concern" },
    ],
  },
  {
    id: "self-service",
    category: "investorReporting",
    question: "Do investors have self-service access to portfolio data?",
    options: [
      { value: 7, label: "Yes, real-time investor portal", description: "24/7 access to current data" },
      { value: 4, label: "Partially (some reports available)", description: "Limited self-service" },
      { value: 1, label: "No, all reporting is push-based", description: "Investors rely on you for updates" },
      { value: 0, label: "Investors have asked for it but we don't offer it", description: "Unmet demand" },
    ],
  },
  {
    id: "benchmarking",
    category: "investorReporting",
    question: "Can you easily benchmark property performance against each other?",
    options: [
      { value: 7, label: "Yes, standardized metrics across portfolio", description: "Apples-to-apples comparison" },
      { value: 4, label: "Partially (some properties, some metrics)", description: "Limited comparison capability" },
      { value: 2, label: "Difficult due to different systems/formats", description: "Data inconsistencies" },
      { value: 0, label: "No, each property is tracked separately", description: "No cross-property view" },
    ],
  },
];

export interface CREScores {
  portfolioVisibility: number;
  investorReporting: number;
  total: number;
  maxTotal: number;
  tier: "mature" | "growingPains" | "foundationNeeded" | "significantGaps";
  lowestCategory: "portfolioVisibility" | "investorReporting";
  dynamicInsights: string[];
  recommendations: string[];
}

export interface CREProfile {
  companyName?: string;
  propertyCount: string;
  propertyTypes: string[];
  externalInvestors: string;
}

export function calculateCREScores(
  answers: Record<string, number>,
  profile: CREProfile
): CREScores {
  const categoryScores = {
    portfolioVisibility: 0,
    investorReporting: 0,
  };

  // Calculate raw scores
  creQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
    }
  });

  const total = categoryScores.portfolioVisibility + categoryScores.investorReporting;
  const maxTotal = 56;

  // Determine tier
  let tier: CREScores["tier"];
  if (total >= 42) tier = "mature";
  else if (total >= 28) tier = "growingPains";
  else if (total >= 14) tier = "foundationNeeded";
  else tier = "significantGaps";

  // Determine lowest category
  const lowestCategory: CREScores["lowestCategory"] =
    categoryScores.portfolioVisibility <= categoryScores.investorReporting
      ? "portfolioVisibility"
      : "investorReporting";

  // Generate dynamic insights based on answers
  const dynamicInsights: string[] = [];

  if (answers["pm-systems"] === 1 || answers["pm-systems"] === 0) {
    dynamicInsights.push(
      "With 4+ property management systems, consolidation is always painful. The solution isn't necessarily migrating everything. A data layer that sits above your existing systems can unify reporting without forcing PM changes."
    );
  }

  if (answers["unified-view"] === 2 || answers["unified-view"] === 0) {
    dynamicInsights.push(
      "Getting a unified view shouldn't take days. When data lives in multiple systems, the manual work compounds. An automated data layer eliminates the consolidation step entirely."
    );
  }

  if (answers["noi-tracking"] === 2) {
    dynamicInsights.push(
      "Quarterly NOI tracking means you're always looking backward. Decisions get made on stale data. Real-time visibility changes what's possible."
    );
  }

  if (answers["reporting-time"] === 0) {
    dynamicInsights.push(
      "Two-plus weeks for quarterly reporting is common but painful. The irony: most of the data exists. It's just scattered. Automated reporting isn't about new data. It's about connecting what you already have."
    );
  }

  if (answers["self-service"] === 1 || answers["self-service"] === 0) {
    dynamicInsights.push(
      "Investor self-service is increasingly expected, especially from institutional LPs. It also reduces your reporting burden. Win-win when done right."
    );
  }

  if (profile.externalInvestors === "institutional") {
    dynamicInsights.push(
      "With institutional LPs, reporting expectations are high. The firms that look polished gain trust and attract more capital. The ones sending manually-compiled spreadsheets look behind."
    );
  }

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];

  if (categoryScores.portfolioVisibility < categoryScores.investorReporting) {
    recommendations.push("Prioritize building unified portfolio visibility before enhancing reporting");
    recommendations.push("Consider a data integration layer to connect disparate PM systems");
    recommendations.push("Implement automated dashboards for key operational metrics");
  } else {
    recommendations.push("Focus on streamlining investor reporting processes");
    recommendations.push("Explore investor portal solutions for self-service access");
    recommendations.push("Standardize metrics across properties for easier benchmarking");
  }

  return {
    portfolioVisibility: categoryScores.portfolioVisibility,
    investorReporting: categoryScores.investorReporting,
    total,
    maxTotal,
    tier,
    lowestCategory,
    dynamicInsights,
    recommendations,
  };
}

export const tierDescriptions = {
  mature: {
    title: "Mature Portfolio Analytics",
    description:
      "Your portfolio analytics are in solid shape. You have visibility across properties, reporting is manageable, and data is reasonably connected.",
    opportunity:
      "At this stage, the opportunity is optimization: automating what's still manual, adding predictive capabilities, or building investor-facing dashboards that update themselves.",
    recommendedConversation: "Advanced analytics, automation, or retainer relationship.",
    nextSteps: [
      "Explore predictive analytics for portfolio performance",
      "Consider automated investor dashboards",
      "Evaluate opportunities for process automation",
    ],
  },
  growingPains: {
    title: "Growing Pains",
    description:
      "You're in the middle. Better than spreadsheets, but not quite where you need to be.",
    opportunity:
      "Targeted work on your biggest gaps would have outsized impact. The good news: you have foundation to build on.",
    recommendedConversation: "Portfolio Analytics or Investor Reporting engagement to address specific gaps.",
    nextSteps: [
      "Address your lowest-scoring category first",
      "Consolidate data sources for unified visibility",
      "Streamline your reporting workflow",
    ],
  },
  foundationNeeded: {
    title: "Data Foundation Needed",
    description:
      "Your systems are disconnected and visibility is limited. Before advanced analytics, you need foundation work: connecting systems, standardizing data, creating a single source of truth.",
    opportunity:
      "This isn't a criticism. Most property managers in growth mode hit this wall. You've outgrown spreadsheets but haven't built what comes next.",
    recommendedConversation: "Data Foundation engagement before analytics work.",
    nextSteps: [
      "Audit and document current data sources",
      "Prioritize system integration opportunities",
      "Establish data governance standards",
    ],
  },
  significantGaps: {
    title: "Significant Gaps",
    description:
      "There's significant opportunity to improve, but foundational work comes first. Multiple PM systems with no integration, manual everything, and limited visibility are common at your stage.",
    opportunity:
      "The good news: fixing this isn't as expensive as you might think. Modern tools and approaches make building a data foundation accessible.",
    recommendedConversation: "Discovery call to understand your specific situation.",
    nextSteps: [
      "Start with a data audit to understand current state",
      "Identify quick wins for immediate improvement",
      "Build a phased roadmap for data modernization",
    ],
  },
};

export const categoryLabels = {
  portfolioVisibility: "Portfolio Visibility",
  investorReporting: "Investor Reporting",
};
