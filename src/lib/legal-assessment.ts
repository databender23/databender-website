// Legal AI Readiness Assessment

export interface LegalQuestion {
  id: string;
  category: "aiOpportunity" | "dataReadiness" | "privacyPosture";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

export const legalQuestions: LegalQuestion[] = [
  // AI Opportunity
  {
    id: "document-review-volume",
    category: "aiOpportunity",
    question: "Document review: how much time are we talking?",
    options: [
      { value: 1, label: "Under 50 hours/month", description: "Occasional review needs" },
      { value: 2, label: "50-200 hours/month", description: "Regular workload" },
      { value: 3, label: "200-500 hours/month", description: "Heavy burden" },
      { value: 4, label: "500+ hours/month", description: "It's a bottleneck" },
    ],
  },
  {
    id: "research-time",
    category: "aiOpportunity",
    question: "Legal research: how much time does it actually take?",
    options: [
      { value: 1, label: "1-5 hours/week", description: "Light research load" },
      { value: 2, label: "5-15 hours/week", description: "Moderate load" },
      { value: 3, label: "15-30 hours/week", description: "Research-intensive" },
      { value: 4, label: "30+ hours/week", description: "Research dominates the day" },
    ],
  },
  {
    id: "due-diligence-frequency",
    category: "aiOpportunity",
    question: "Due diligence work: how often does it come up?",
    options: [
      { value: 1, label: "Rarely", description: "A few times per year" },
      { value: 2, label: "Monthly", description: "Regular occurrence" },
      { value: 3, label: "Weekly", description: "Multiple projects per month" },
      { value: 4, label: "Constantly", description: "Core practice area" },
    ],
  },
  {
    id: "contract-volume",
    category: "aiOpportunity",
    question: "Contracts: how many flow through monthly?",
    options: [
      { value: 1, label: "Under 25", description: "Manageable volume" },
      { value: 2, label: "25-75", description: "Steady workflow" },
      { value: 3, label: "75-200", description: "High volume" },
      { value: 4, label: "200+", description: "Capacity constraint" },
    ],
  },
  {
    id: "billing-capture",
    category: "aiOpportunity",
    question: "Time capture: how much gets lost before billing?",
    options: [
      { value: 1, label: "Significant leakage", description: "Hours slip through, hard to quantify" },
      { value: 2, label: "Some lost time", description: "Probably 10-15% doesn't make it to invoices" },
      { value: 3, label: "Mostly captured", description: "Good discipline, occasional misses" },
      { value: 4, label: "Tight process", description: "Real-time capture, minimal write-offs" },
    ],
  },

  // Data Readiness
  {
    id: "matter-management",
    category: "dataReadiness",
    question: "Matter management: where does everything live?",
    options: [
      { value: 1, label: "Everywhere", description: "Scattered across drives and emails" },
      { value: 2, label: "Basic folders", description: "Some structure, inconsistent naming" },
      { value: 3, label: "Practice management", description: "Clio, PracticePanther, or similar" },
      { value: 4, label: "Full DMS", description: "Complete system with metadata and search" },
    ],
  },
  {
    id: "precedent-searchability",
    category: "dataReadiness",
    question: "Can your team find past work when they need it?",
    options: [
      { value: 1, label: "Rarely", description: "Ask around or dig through files manually" },
      { value: 2, label: "Sometimes", description: "Hit or miss, takes time" },
      { value: 3, label: "Usually", description: "Searchable with moderate success" },
      { value: 4, label: "Easily", description: "Quick access via search" },
    ],
  },
  {
    id: "knowledge-systems",
    category: "dataReadiness",
    question: "Knowledge management: does it exist?",
    options: [
      { value: 1, label: "Not really", description: "No formal capture or sharing" },
      { value: 2, label: "Ad hoc", description: "Some shared docs, not systematic" },
      { value: 3, label: "Basic system", description: "Templates, brief banks, wikis" },
      { value: 4, label: "Mature", description: "Full system with workflows" },
    ],
  },
  {
    id: "document-management",
    category: "dataReadiness",
    question: "Where do documents actually get stored?",
    options: [
      { value: 1, label: "Local drives", description: "Network shares or personal drives" },
      { value: 2, label: "Cloud basics", description: "Google Drive, Dropbox" },
      { value: 3, label: "Legal DMS", description: "NetDocuments, iManage, similar" },
      { value: 4, label: "Enterprise DMS", description: "Full version control, OCR, metadata" },
    ],
  },
  {
    id: "tech-stack-integration",
    category: "dataReadiness",
    question: "How many tools touch a typical matter?",
    options: [
      { value: 4, label: "2-3 tools", description: "Streamlined stack" },
      { value: 3, label: "4-5 tools", description: "Moderate complexity" },
      { value: 2, label: "6-8 tools", description: "Lots of switching" },
      { value: 1, label: "9+ tools", description: "Tool sprawl" },
    ],
  },

  // Privacy Posture
  {
    id: "cloud-ai-policy",
    category: "privacyPosture",
    question: "Cloud AI tools: what's the policy?",
    options: [
      { value: 1, label: "No policy", description: "Haven't addressed it formally" },
      { value: 2, label: "Informal guidance", description: "General caution, nothing written" },
      { value: 3, label: "Written policy", description: "Clear approved/prohibited list" },
      { value: 4, label: "Full framework", description: "AI governance with review process" },
    ],
  },
  {
    id: "ai-governance",
    category: "privacyPosture",
    question: "Has your firm developed AI governance guidance?",
    options: [
      { value: 1, label: "Not yet", description: "AI governance hasn't been formalized" },
      { value: 2, label: "Informal discussions", description: "Partners have discussed, no formal policy" },
      { value: 3, label: "Written guidelines", description: "Basic policy on approved AI tools" },
      { value: 4, label: "Full framework", description: "Complete governance including vendor review" },
    ],
  },
  {
    id: "data-governance",
    category: "privacyPosture",
    question: "Client data governance: how serious is it?",
    options: [
      { value: 1, label: "Basic", description: "Standard confidentiality, no formal program" },
      { value: 2, label: "Developing", description: "Classification and handling procedures" },
      { value: 3, label: "Established", description: "Formal governance with audits" },
      { value: 4, label: "Advanced", description: "DLP, monitoring, full program in place" },
    ],
  },
  {
    id: "vendor-evaluation",
    category: "privacyPosture",
    question: "Tech vendors: how do you vet them for security?",
    options: [
      { value: 1, label: "Trust them", description: "Take vendor claims at face value" },
      { value: 2, label: "Quick check", description: "Review certifications, basic info" },
      { value: 3, label: "Formal assessment", description: "Security questionnaires, contract terms" },
      { value: 4, label: "Deep diligence", description: "Full assessment, may include on-site" },
    ],
  },
];

export interface LegalScores {
  aiOpportunity: number;
  dataReadiness: number;
  privacyPosture: number;
  total: number;
  tier: "early" | "emerging" | "developing" | "ready";
  recommendations: string[];
}

export function calculateLegalScores(
  answers: Record<string, number>
): LegalScores {
  const categoryScores = {
    aiOpportunity: 0,
    dataReadiness: 0,
    privacyPosture: 0,
  };

  const categoryCounts = {
    aiOpportunity: 0,
    dataReadiness: 0,
    privacyPosture: 0,
  };

  legalQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
      categoryCounts[q.category]++;
    }
  });

  // Normalize to 0-100 scale
  const normalized = {
    aiOpportunity: categoryCounts.aiOpportunity
      ? Math.round((categoryScores.aiOpportunity / (categoryCounts.aiOpportunity * 4)) * 100)
      : 0,
    dataReadiness: categoryCounts.dataReadiness
      ? Math.round((categoryScores.dataReadiness / (categoryCounts.dataReadiness * 4)) * 100)
      : 0,
    privacyPosture: categoryCounts.privacyPosture
      ? Math.round((categoryScores.privacyPosture / (categoryCounts.privacyPosture * 4)) * 100)
      : 0,
  };

  const total = Math.round(
    (normalized.aiOpportunity +
      normalized.dataReadiness +
      normalized.privacyPosture) / 3
  );

  let tier: LegalScores["tier"];
  if (total < 35) tier = "early";
  else if (total < 55) tier = "emerging";
  else if (total < 75) tier = "developing";
  else tier = "ready";

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];
  const sortedCategories = Object.entries(normalized).sort((a, b) => a[1] - b[1]);

  sortedCategories.slice(0, 2).forEach(([category]) => {
    switch (category) {
      case "aiOpportunity":
        recommendations.push("Start with one high-volume workflow (document review or research) to see concrete cost savings.");
        break;
      case "dataReadiness":
        recommendations.push("Get your documents organized first. Custom AI is affordable now, but it needs something to search.");
        break;
      case "privacyPosture":
        recommendations.push("Develop AI governance guidance early. The good news: AI that runs on your servers and meets ABA 512 is easier to approve.");
        break;
    }
  });

  return {
    ...normalized,
    total,
    tier,
    recommendations,
  };
}

export const tierDescriptions = {
  early: {
    title: "Early Stage",
    description: "Your firm has work to do before custom AI makes sense. The good news: getting organized is straightforward, and prices have dropped enough that it's worth doing.",
    nextSteps: [
      "Get documents into one searchable place. This is step one for any AI project.",
      "Develop basic AI governance guidance so you're not scrambling later.",
      "Pick one workflow where associates waste the most time. That's your pilot.",
    ],
  },
  emerging: {
    title: "Emerging",
    description: "You have the foundations. Now it's about picking the right first project. Custom AI that used to cost $150K+ now runs $30-50K. The math works for firms your size.",
    nextSteps: [
      "Identify your highest-volume workflow: document review, research, or due diligence.",
      "Get a cost estimate for making your existing documents searchable.",
      "Look at time capture. Firms recovering 4-6 hours per attorney weekly see fast ROI.",
    ],
  },
  developing: {
    title: "Developing",
    description: "Your firm is ready for custom AI. You have the data and the governance. The question now is which project delivers the most value fastest.",
    nextSteps: [
      "Get pricing on document intelligence for your specific document volumes.",
      "Evaluate where per-seat licensing costs more than owning the solution outright.",
      "Request a custom audit to identify your highest-ROI opportunities.",
    ],
  },
  ready: {
    title: "AI Ready",
    description: "Your firm is ahead of most. You have the infrastructure and governance for custom AI. Firms at your stage are already seeing results.",
    nextSteps: [
      "Move on document intelligence. Your data is ready and the economics work.",
      "Look at where you're paying per-seat fees for software you could own.",
      "Consider ABA 512 compliance documentation for your implementation.",
    ],
  },
};
