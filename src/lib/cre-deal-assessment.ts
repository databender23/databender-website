// CRE Deal Intelligence Assessment - For Brokers & Investors

export interface DealQuestion {
  id: string;
  category: "ownershipData" | "dueDiligence" | "pipelinePrioritization";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

// Company Profile questions (not scored)
export interface DealProfile {
  companyName?: string;
  dealVolume: string;
  propertyTypes: string[];
  teamSize: string;
}

export interface DealProfileQuestion {
  id: string;
  question: string;
  type: "select" | "multiselect" | "text";
  options?: { value: string; label: string }[];
  required: boolean;
}

export const profileQuestions: DealProfileQuestion[] = [
  {
    id: "companyName",
    question: "Company Name",
    type: "text",
    required: false,
  },
  {
    id: "dealVolume",
    question: "How many deals do you evaluate per year?",
    type: "select",
    options: [
      { value: "1-10", label: "1-10 deals" },
      { value: "11-50", label: "11-50 deals" },
      { value: "51-100", label: "51-100 deals" },
      { value: "100+", label: "100+ deals" },
    ],
    required: true,
  },
  {
    id: "propertyTypes",
    question: "Property Types You Target",
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
    id: "teamSize",
    question: "Deal Team Size",
    type: "select",
    options: [
      { value: "1-2", label: "1-2 people" },
      { value: "3-5", label: "3-5 people" },
      { value: "6-10", label: "6-10 people" },
      { value: "10+", label: "10+ people" },
    ],
    required: true,
  },
];

export const dealQuestions: DealQuestion[] = [
  // Ownership Data (4 questions)
  {
    id: "owner-identification",
    category: "ownershipData",
    question: "How often do you reach the actual decision-maker on first contact?",
    options: [
      { value: 7, label: "Most of the time (75%+)", description: "We have reliable ownership data" },
      { value: 4, label: "About half the time", description: "Hit or miss depending on the property" },
      { value: 2, label: "Rarely (less than 25%)", description: "Usually takes multiple attempts" },
      { value: 0, label: "Almost never", description: "LLC structures make it very difficult" },
    ],
  },
  {
    id: "data-quality",
    category: "ownershipData",
    question: "How would you describe your ownership data quality?",
    options: [
      { value: 7, label: "Clean and verified", description: "We trust it for outreach" },
      { value: 4, label: "Mostly usable with some gaps", description: "Occasional duplicates or outdated info" },
      { value: 2, label: "Messy but workable", description: "Requires manual cleanup regularly" },
      { value: 0, label: "Unreliable", description: "Major issues with duplicates, wrong contacts" },
    ],
  },
  {
    id: "llc-tracing",
    category: "ownershipData",
    question: "When a property is owned by an LLC, how long does it take to find the decision-maker?",
    options: [
      { value: 7, label: "Minutes (automated lookup)", description: "Tools or data do the work" },
      { value: 4, label: "Hours (some manual research)", description: "Mix of tools and digging" },
      { value: 2, label: "Days (significant manual effort)", description: "Mostly manual research" },
      { value: 0, label: "Often can't find them", description: "LLC structures are a major blocker" },
    ],
  },
  {
    id: "contact-verification",
    category: "ownershipData",
    question: "How do you verify contact information before outreach?",
    options: [
      { value: 7, label: "Automated verification system", description: "Contacts are validated before use" },
      { value: 4, label: "Spot-check manually", description: "Verify some before campaigns" },
      { value: 2, label: "Minimal verification", description: "Trust the data we have" },
      { value: 0, label: "No verification", description: "Find out when calls bounce" },
    ],
  },
  // Due Diligence (3 questions)
  {
    id: "data-room-time",
    category: "dueDiligence",
    question: "How long does it take to review a typical data room?",
    options: [
      { value: 7, label: "1-2 days", description: "Streamlined process with tools" },
      { value: 4, label: "3-5 days", description: "Manageable with focused effort" },
      { value: 2, label: "1-2 weeks", description: "Significant manual review" },
      { value: 0, label: "2+ weeks", description: "Document-by-document review" },
    ],
  },
  {
    id: "red-flag-detection",
    category: "dueDiligence",
    question: "How often do you discover red flags after you're committed to a deal?",
    options: [
      { value: 7, label: "Rarely (less than 10%)", description: "Thorough upfront review" },
      { value: 4, label: "Sometimes (10-25%)", description: "Occasional surprises" },
      { value: 2, label: "Often (25-50%)", description: "Regular post-commitment discoveries" },
      { value: 0, label: "Frequently (50%+)", description: "Major issue with due diligence process" },
    ],
  },
  {
    id: "document-extraction",
    category: "dueDiligence",
    question: "How do you extract key terms from leases and financial documents?",
    options: [
      { value: 7, label: "Automated extraction", description: "AI or software pulls key terms" },
      { value: 4, label: "Templates with manual entry", description: "Structured but hands-on" },
      { value: 2, label: "Manual review and notes", description: "Read and summarize by hand" },
      { value: 0, label: "Ad hoc process", description: "Different approach each time" },
    ],
  },
  // Pipeline Prioritization (4 questions)
  {
    id: "target-scoring",
    category: "pipelinePrioritization",
    question: "How do you decide which targets to pursue first?",
    options: [
      { value: 7, label: "Data-driven scoring model", description: "Prioritized by likelihood to trade" },
      { value: 4, label: "Criteria-based filtering", description: "Set filters but no formal scoring" },
      { value: 2, label: "Gut feel and experience", description: "Rely on team judgment" },
      { value: 0, label: "Work the list in order", description: "No systematic prioritization" },
    ],
  },
  {
    id: "market-signals",
    category: "pipelinePrioritization",
    question: "How do you identify motivated sellers?",
    options: [
      { value: 7, label: "Track multiple signals automatically", description: "Hold period, taxes, loan maturity, etc." },
      { value: 4, label: "Monitor some signals manually", description: "Check a few indicators" },
      { value: 2, label: "Rely on market intel", description: "Broker network and word of mouth" },
      { value: 0, label: "Wait for listings", description: "Mostly reactive to market" },
    ],
  },
  {
    id: "debt-awareness",
    category: "pipelinePrioritization",
    question: "How do you identify properties with upcoming loan maturities?",
    options: [
      { value: 7, label: "Systematic tracking", description: "Loan maturities are core to our deal scoring" },
      { value: 4, label: "Partial visibility", description: "Some debt data but not systematic" },
      { value: 2, label: "Ad hoc research", description: "Sometimes check when relevant" },
      { value: 0, label: "We don't track this", description: "Loan timing isn't part of our targeting" },
    ],
  },
  {
    id: "pipeline-visibility",
    category: "pipelinePrioritization",
    question: "Can you see your entire pipeline status at a glance?",
    options: [
      { value: 7, label: "Yes, real-time application", description: "Full visibility across all deals" },
      { value: 4, label: "Mostly, with some manual updates", description: "CRM that needs maintenance" },
      { value: 2, label: "Partially, in spreadsheets", description: "Manual tracking across files" },
      { value: 0, label: "No unified view", description: "Information scattered across team" },
    ],
  },
];

export interface DealScores {
  ownershipData: number;
  dueDiligence: number;
  pipelinePrioritization: number;
  total: number;
  maxTotal: number;
  tier: "optimized" | "functional" | "manual" | "reactive";
  lowestCategory: "ownershipData" | "dueDiligence" | "pipelinePrioritization";
  dynamicInsights: string[];
  recommendations: string[];
}

export function calculateDealScores(
  answers: Record<string, number>,
  profile: DealProfile
): DealScores {
  const categoryScores = {
    ownershipData: 0,
    dueDiligence: 0,
    pipelinePrioritization: 0,
  };

  // Calculate raw scores
  dealQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
    }
  });

  const total = categoryScores.ownershipData + categoryScores.dueDiligence + categoryScores.pipelinePrioritization;
  const maxTotal = 77; // 11 questions * 7 max points

  // Determine tier
  let tier: DealScores["tier"];
  if (total >= 52) tier = "optimized";
  else if (total >= 35) tier = "functional";
  else if (total >= 18) tier = "manual";
  else tier = "reactive";

  // Determine lowest category
  const scores = [
    { category: "ownershipData" as const, score: categoryScores.ownershipData },
    { category: "dueDiligence" as const, score: categoryScores.dueDiligence },
    { category: "pipelinePrioritization" as const, score: categoryScores.pipelinePrioritization },
  ];
  const lowestCategory = scores.sort((a, b) => a.score - b.score)[0].category;

  // Generate dynamic insights based on answers
  const dynamicInsights: string[] = [];

  if (answers["owner-identification"] <= 2) {
    dynamicInsights.push(
      "If you're reaching decision-makers less than half the time, you're wasting outreach on the wrong people. Ownership resolution isn't glamorous work, but it's the foundation of everything else."
    );
  }

  if (answers["llc-tracing"] <= 2) {
    dynamicInsights.push(
      "Spending days to trace through LLC structures is common but costly. We sorted through 1.69 million records for a client in hours. The technology exists to do this faster."
    );
  }

  if (answers["data-room-time"] <= 2) {
    dynamicInsights.push(
      "Two weeks per data room review means you're either passing on deals or committing before you should. AI can read documents overnight. You review a summary in the morning."
    );
  }

  if (answers["red-flag-detection"] <= 2) {
    dynamicInsights.push(
      "Finding red flags after commitment is expensive. It's not about being more careful. It's about having systems that catch issues before you're in too deep."
    );
  }

  if (answers["target-scoring"] <= 2) {
    dynamicInsights.push(
      "Working a list without scoring means your best reps are spending time on deals that won't trade. Data-driven prioritization isn't just efficient. It changes win rates."
    );
  }

  if (answers["debt-awareness"] <= 2) {
    dynamicInsights.push(
      "$957B in CRE loans mature in 2025. That's nearly triple the 20-year average. Properties facing refinancing pressure are more likely to trade. If you're not tracking loan maturities, you're missing motivated sellers."
    );
  }

  if (profile.dealVolume === "100+") {
    dynamicInsights.push(
      "At 100+ deals per year, every efficiency gain multiplies. The firms doing this volume well have systematized their deal flow. The ones struggling are doing everything manually."
    );
  }

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];

  if (lowestCategory === "ownershipData") {
    recommendations.push("Prioritize ownership data cleanup and verification");
    recommendations.push("Implement automated LLC tracing for faster owner identification");
    recommendations.push("Build verified contact lists before outreach campaigns");
    recommendations.push("Consolidate your data sources into a single system of record");
  } else if (lowestCategory === "dueDiligence") {
    recommendations.push("Explore AI-powered document review for data rooms");
    recommendations.push("Create standardized extraction templates for key terms");
    recommendations.push("Build a red-flag checklist that runs automatically");
    recommendations.push("Define your must-have data points before opening any data room");
  } else {
    recommendations.push("Develop a scoring model based on your actual transaction data");
    recommendations.push("Track motivated-seller signals systematically, including loan maturities");
    recommendations.push("Build debt visibility into your deal pipeline (the $957B maturity wave is a targeting opportunity)");
    recommendations.push("Centralize pipeline visibility across the team");
  }

  return {
    ownershipData: categoryScores.ownershipData,
    dueDiligence: categoryScores.dueDiligence,
    pipelinePrioritization: categoryScores.pipelinePrioritization,
    total,
    maxTotal,
    tier,
    lowestCategory,
    dynamicInsights,
    recommendations,
  };
}

export const tierDescriptions = {
  optimized: {
    title: "Optimized Deal Flow",
    description:
      "Your deal intelligence is in solid shape. You're finding owners efficiently, reviewing deals quickly, and prioritizing based on data.",
    opportunity:
      "At this stage, the opportunity is marginal gains: automating the remaining manual steps, improving scoring models with more data, or scaling what's working.",
    recommendedConversation: "Advanced automation, predictive analytics, or retainer relationship.",
    nextSteps: [
      "Explore predictive models for deal timing",
      "Consider automated market monitoring",
      "Evaluate opportunities to scale deal volume",
      "Document what's working for team playbooks",
    ],
  },
  functional: {
    title: "Functional but Manual",
    description:
      "You're getting deals done, but there's friction. Some processes work well. Others take longer than they should.",
    opportunity:
      "Targeted improvements to your weakest area would have outsized impact. You have the foundation. It's about removing bottlenecks.",
    recommendedConversation: "Focused engagement on your lowest-scoring category.",
    nextSteps: [
      "Address your biggest bottleneck first",
      "Automate one manual process as a pilot",
      "Build measurement to track improvement",
      "Get baseline metrics before making changes",
    ],
  },
  manual: {
    title: "Heavily Manual",
    description:
      "Most of your deal flow runs on manual effort. It works, but it's slow and doesn't scale.",
    opportunity:
      "This isn't a criticism. Most firms start here. The question is whether you're leaving deals on the table because the process can't keep up.",
    recommendedConversation: "Foundation work before optimization.",
    nextSteps: [
      "Audit current processes for biggest time sinks",
      "Prioritize one area for automation",
      "Build the business case for investment",
      "Talk to your team about where they lose hours",
    ],
  },
  reactive: {
    title: "Reactive Mode",
    description:
      "Deal flow is mostly reactive. You're waiting for opportunities rather than creating them.",
    opportunity:
      "The good news: moving from reactive to proactive has dramatic ROI. Small investments in data and process pay off quickly.",
    recommendedConversation: "Discovery call to understand your specific situation.",
    nextSteps: [
      "Start with ownership data quality",
      "Pick the biggest time sink and fix it first",
      "Build a phased roadmap for improvement",
      "Consider what one win would look like in 30 days",
    ],
  },
};

export const categoryLabels = {
  ownershipData: "Ownership Data",
  dueDiligence: "Due Diligence",
  pipelinePrioritization: "Pipeline Prioritization",
};
