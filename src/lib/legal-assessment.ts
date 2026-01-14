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
    question: "How many hours does your firm spend on document review per month?",
    options: [
      { value: 1, label: "Under 50 hours", description: "Occasional document review needs" },
      { value: 2, label: "50-200 hours", description: "Regular document review workload" },
      { value: 3, label: "200-500 hours", description: "Significant review burden" },
      { value: 4, label: "500+ hours", description: "Document review is a major capacity constraint" },
    ],
  },
  {
    id: "research-time",
    category: "aiOpportunity",
    question: "How much time do attorneys spend on legal research weekly?",
    options: [
      { value: 1, label: "1-5 hours", description: "Minimal research requirements" },
      { value: 2, label: "5-15 hours", description: "Moderate research load" },
      { value: 3, label: "15-30 hours", description: "Research-intensive practice" },
      { value: 4, label: "30+ hours", description: "Research dominates attorney time" },
    ],
  },
  {
    id: "due-diligence-frequency",
    category: "aiOpportunity",
    question: "How often does your firm handle due diligence matters?",
    options: [
      { value: 1, label: "Rarely", description: "A few times per year" },
      { value: 2, label: "Occasionally", description: "Monthly due diligence projects" },
      { value: 3, label: "Regularly", description: "Multiple projects per month" },
      { value: 4, label: "Constantly", description: "Due diligence is a core practice area" },
    ],
  },
  {
    id: "contract-volume",
    category: "aiOpportunity",
    question: "How many contracts does your firm draft or review monthly?",
    options: [
      { value: 1, label: "Under 25", description: "Low contract volume" },
      { value: 2, label: "25-75", description: "Moderate contract workflow" },
      { value: 3, label: "75-200", description: "High contract volume" },
      { value: 4, label: "200+", description: "Contract work is a bottleneck" },
    ],
  },

  // Data Readiness
  {
    id: "matter-management",
    category: "dataReadiness",
    question: "How organized is your matter management system?",
    options: [
      { value: 1, label: "No system", description: "Documents scattered across drives and emails" },
      { value: 2, label: "Basic folders", description: "Folder structure but inconsistent naming" },
      { value: 3, label: "Practice management", description: "Using Clio, PracticePanther, or similar" },
      { value: 4, label: "Fully integrated", description: "Comprehensive DMS with metadata and search" },
    ],
  },
  {
    id: "precedent-searchability",
    category: "dataReadiness",
    question: "How easily can attorneys find relevant precedents and past work?",
    options: [
      { value: 1, label: "Very difficult", description: "Ask around or search manually through files" },
      { value: 2, label: "Somewhat difficult", description: "Some organization but time-consuming" },
      { value: 3, label: "Manageable", description: "Searchable system with moderate success rate" },
      { value: 4, label: "Easy", description: "Quick access to relevant precedents via search" },
    ],
  },
  {
    id: "knowledge-systems",
    category: "dataReadiness",
    question: "Does your firm have a knowledge management system?",
    options: [
      { value: 1, label: "None", description: "No formal knowledge capture or sharing" },
      { value: 2, label: "Ad hoc", description: "Some shared documents but not systematic" },
      { value: 3, label: "Basic KM", description: "Shared templates, brief banks, basic wikis" },
      { value: 4, label: "Advanced KM", description: "Comprehensive knowledge base with workflows" },
    ],
  },
  {
    id: "document-management",
    category: "dataReadiness",
    question: "What is your current document management approach?",
    options: [
      { value: 1, label: "Local storage", description: "Files on local drives or basic network shares" },
      { value: 2, label: "Cloud basic", description: "Google Drive, Dropbox, or similar" },
      { value: 3, label: "Legal-specific", description: "NetDocuments, iManage, or similar DMS" },
      { value: 4, label: "Enterprise DMS", description: "Full DMS with version control, OCR, and metadata" },
    ],
  },

  // Privacy Posture
  {
    id: "cloud-ai-policy",
    category: "privacyPosture",
    question: "What is your firm's policy on cloud-based AI tools?",
    options: [
      { value: 1, label: "No policy", description: "Haven't addressed AI tool usage formally" },
      { value: 2, label: "Informal guidance", description: "General caution but no written policy" },
      { value: 3, label: "Written policy", description: "Clear guidelines on approved/prohibited tools" },
      { value: 4, label: "Comprehensive framework", description: "Full AI governance with review process" },
    ],
  },
  {
    id: "ethics-committee",
    category: "privacyPosture",
    question: "Has your firm's ethics committee addressed AI adoption?",
    options: [
      { value: 1, label: "Not discussed", description: "AI hasn't been formally addressed" },
      { value: 2, label: "Initial discussions", description: "Topic raised but no conclusions" },
      { value: 3, label: "Guidelines issued", description: "Committee has provided initial guidance" },
      { value: 4, label: "Full framework", description: "Comprehensive ethical AI framework in place" },
    ],
  },
  {
    id: "data-governance",
    category: "privacyPosture",
    question: "How mature is your client data governance?",
    options: [
      { value: 1, label: "Basic", description: "Standard confidentiality but no formal program" },
      { value: 2, label: "Developing", description: "Data classification and handling procedures" },
      { value: 3, label: "Established", description: "Formal governance with regular audits" },
      { value: 4, label: "Advanced", description: "Comprehensive program with DLP and monitoring" },
    ],
  },
  {
    id: "vendor-evaluation",
    category: "privacyPosture",
    question: "How does your firm evaluate technology vendors for data security?",
    options: [
      { value: 1, label: "No formal process", description: "Trust vendor claims without verification" },
      { value: 2, label: "Basic review", description: "Check certifications and basic security info" },
      { value: 3, label: "Security assessment", description: "Formal questionnaires and contract terms" },
      { value: 4, label: "Comprehensive diligence", description: "Full vendor assessment including on-site audits" },
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
