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
      { value: 3, label: "200-500 hours/month", description: "Significant burden" },
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

  // Data Readiness
  {
    id: "matter-management",
    category: "dataReadiness",
    question: "Matter management: where does everything live?",
    options: [
      { value: 1, label: "Everywhere", description: "Scattered across drives and emails" },
      { value: 2, label: "Basic folders", description: "Some structure, inconsistent naming" },
      { value: 3, label: "Practice management", description: "Clio, PracticePanther, or similar" },
      { value: 4, label: "Full DMS", description: "Comprehensive system with metadata and search" },
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
      { value: 4, label: "Robust", description: "Comprehensive with workflows" },
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
    id: "ethics-committee",
    category: "privacyPosture",
    question: "Has your ethics committee weighed in on AI?",
    options: [
      { value: 1, label: "Not yet", description: "AI hasn't come up" },
      { value: 2, label: "Early talks", description: "Raised but no conclusions" },
      { value: 3, label: "Initial guidance", description: "Committee has provided direction" },
      { value: 4, label: "Comprehensive", description: "Full ethical framework in place" },
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
      { value: 4, label: "Advanced", description: "DLP, monitoring, comprehensive program" },
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
        recommendations.push("Identify high-volume, repetitive workflows where AI can deliver immediate ROI");
        break;
      case "dataReadiness":
        recommendations.push("Invest in document management and knowledge systems to prepare your data for AI");
        break;
      case "privacyPosture":
        recommendations.push("Develop an AI governance framework with ethics committee guidance before adopting tools");
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
    description: "Your firm is in the early stages of AI readiness. Focus on data organization and governance foundations before tool adoption.",
    nextSteps: [
      "Implement a document management system if not already in place",
      "Establish data governance policies and confidentiality procedures",
      "Form an AI task force to evaluate opportunities and risks",
    ],
  },
  emerging: {
    title: "Emerging",
    description: "Your firm has foundational elements in place. Now focus on connecting systems and establishing AI governance.",
    nextSteps: [
      "Develop a written AI acceptable use policy",
      "Pilot one or two low-risk AI tools with clear success metrics",
      "Invest in knowledge management to capture and organize work product",
    ],
  },
  developing: {
    title: "Developing",
    description: "Your firm has solid data infrastructure and governance. Time to explore advanced AI applications.",
    nextSteps: [
      "Implement document intelligence for contract review and due diligence",
      "Explore legal research AI tools with proper privilege protections",
      "Consider on-premise or private cloud AI deployments for sensitive work",
    ],
  },
  ready: {
    title: "AI Ready",
    description: "Your firm is well-positioned for AI adoption with strong data practices and governance. Focus on strategic implementation.",
    nextSteps: [
      "Deploy AI-powered document review for high-volume matters",
      "Implement automated contract analysis and drafting assistance",
      "Explore custom AI solutions tailored to your practice areas",
    ],
  },
};
