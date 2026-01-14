// Healthcare AI Readiness Assessment

export interface HealthcareQuestion {
  id: string;
  category: "documentManagement" | "knowledgeRetention" | "aiReadiness";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

export const healthcareQuestions: HealthcareQuestion[] = [
  // Document Management
  {
    id: "search-capability",
    category: "documentManagement",
    question: "How easily can staff find the documents they need?",
    options: [
      { value: 1, label: "Very difficult", description: "Manual searching through folders, often can't find what's needed" },
      { value: 2, label: "Time-consuming", description: "Basic search exists but requires knowing exact file names" },
      { value: 3, label: "Reasonably good", description: "Organized folder structure with some search capability" },
      { value: 4, label: "Excellent", description: "Unified search across all documents with filtering and tagging" },
    ],
  },
  {
    id: "format-consistency",
    category: "documentManagement",
    question: "How consistent are your document formats across departments?",
    options: [
      { value: 1, label: "No standards", description: "Each department uses their own formats and systems" },
      { value: 2, label: "Some standards", description: "Key documents have templates but adoption varies" },
      { value: 3, label: "Mostly consistent", description: "Standard templates used with occasional exceptions" },
      { value: 4, label: "Fully standardized", description: "Strict formatting standards enforced organization-wide" },
    ],
  },
  {
    id: "knowledge-capture",
    category: "documentManagement",
    question: "How well do you capture clinical and operational knowledge in documents?",
    options: [
      { value: 1, label: "Poorly", description: "Knowledge lives in people's heads, rarely documented" },
      { value: 2, label: "Inconsistently", description: "Some processes documented but many gaps exist" },
      { value: 3, label: "Well", description: "Most key processes documented but updates lag behind" },
      { value: 4, label: "Comprehensively", description: "Living documentation that's actively maintained and updated" },
    ],
  },
  {
    id: "policy-accessibility",
    category: "documentManagement",
    question: "How quickly can staff access current policies and procedures?",
    options: [
      { value: 1, label: "Very slow", description: "Staff often unsure where to find policies or if they're current" },
      { value: 2, label: "Slow", description: "Policies exist but require multiple clicks or asking colleagues" },
      { value: 3, label: "Reasonably fast", description: "Central repository exists but navigation could be better" },
      { value: 4, label: "Instant", description: "Easy-to-navigate policy portal with version control and alerts" },
    ],
  },

  // Knowledge Retention
  {
    id: "turnover-impact",
    category: "knowledgeRetention",
    question: "How much does staff turnover impact your operational knowledge?",
    options: [
      { value: 1, label: "Severely", description: "Each departure creates major knowledge gaps" },
      { value: 2, label: "Significantly", description: "Takes months to recover from key departures" },
      { value: 3, label: "Moderately", description: "Some impact but documentation helps smooth transitions" },
      { value: 4, label: "Minimally", description: "Knowledge is well-documented and transferable" },
    ],
  },
  {
    id: "training-time",
    category: "knowledgeRetention",
    question: "How long does it take new hires to become fully productive?",
    options: [
      { value: 1, label: "6+ months", description: "Long learning curve due to tribal knowledge" },
      { value: 2, label: "3-6 months", description: "Significant ramp-up time with ad-hoc training" },
      { value: 3, label: "1-3 months", description: "Structured onboarding with documented processes" },
      { value: 4, label: "Under 1 month", description: "Comprehensive training materials and mentorship programs" },
    ],
  },
  {
    id: "institutional-knowledge",
    category: "knowledgeRetention",
    question: "How accessible is institutional knowledge (payer rules, billing codes, clinical protocols)?",
    options: [
      { value: 1, label: "Not accessible", description: "Information scattered across emails, notes, and people's memories" },
      { value: 2, label: "Partially accessible", description: "Some documented but incomplete and hard to find" },
      { value: 3, label: "Mostly accessible", description: "Central knowledge base exists but could be more comprehensive" },
      { value: 4, label: "Fully accessible", description: "Searchable knowledge base with complete, current information" },
    ],
  },
  {
    id: "expertise-documentation",
    category: "knowledgeRetention",
    question: "How well is specialized expertise documented (coding specialists, compliance experts)?",
    options: [
      { value: 1, label: "Not documented", description: "Expertise exists only in individuals' heads" },
      { value: 2, label: "Partially documented", description: "Some notes exist but not systematic" },
      { value: 3, label: "Mostly documented", description: "Key expertise captured with regular updates" },
      { value: 4, label: "Fully documented", description: "Complete expertise transfer process with knowledge validation" },
    ],
  },

  // AI Readiness
  {
    id: "infrastructure-readiness",
    category: "aiReadiness",
    question: "How would you rate your technology infrastructure for AI adoption?",
    options: [
      { value: 1, label: "Not ready", description: "Legacy systems with no integration capabilities" },
      { value: 2, label: "Basic", description: "Some modern systems but significant technical debt" },
      { value: 3, label: "Good foundation", description: "Modern EHR/systems with API capabilities" },
      { value: 4, label: "AI-ready", description: "Cloud-native infrastructure with data pipeline capabilities" },
    ],
  },
  {
    id: "compliance-posture",
    category: "aiReadiness",
    question: "How prepared are you for AI compliance requirements (HIPAA, state regulations)?",
    options: [
      { value: 1, label: "Unprepared", description: "Haven't considered AI-specific compliance needs" },
      { value: 2, label: "Early stage", description: "Aware of requirements but no formal framework" },
      { value: 3, label: "Developing", description: "Working on AI governance policies and procedures" },
      { value: 4, label: "Well-prepared", description: "Comprehensive AI governance framework in place" },
    ],
  },
  {
    id: "data-governance",
    category: "aiReadiness",
    question: "How mature is your data governance for AI use cases?",
    options: [
      { value: 1, label: "No governance", description: "No formal data quality or management processes" },
      { value: 2, label: "Basic governance", description: "Some data quality initiatives but not comprehensive" },
      { value: 3, label: "Good governance", description: "Established data governance with quality metrics" },
      { value: 4, label: "Advanced governance", description: "Mature data governance with AI-specific considerations" },
    ],
  },
  {
    id: "on-premise-capability",
    category: "aiReadiness",
    question: "Do you have capability for on-premise AI deployment (for PHI protection)?",
    options: [
      { value: 1, label: "No capability", description: "No on-premise infrastructure for AI workloads" },
      { value: 2, label: "Limited", description: "Some server capacity but not AI-optimized" },
      { value: 3, label: "Moderate", description: "Can support basic AI models on-premise" },
      { value: 4, label: "Strong", description: "Enterprise-grade on-premise AI infrastructure available" },
    ],
  },
];

export interface HealthcareScores {
  documentManagement: number;
  knowledgeRetention: number;
  aiReadiness: number;
  total: number;
  tier: "early" | "emerging" | "developing" | "ready";
  recommendations: string[];
}

export function calculateHealthcareScores(
  answers: Record<string, number>
): HealthcareScores {
  const categoryScores = {
    documentManagement: 0,
    knowledgeRetention: 0,
    aiReadiness: 0,
  };

  const categoryCounts = {
    documentManagement: 0,
    knowledgeRetention: 0,
    aiReadiness: 0,
  };

  healthcareQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
      categoryCounts[q.category]++;
    }
  });

  // Normalize to 0-100 scale
  const normalized = {
    documentManagement: categoryCounts.documentManagement
      ? Math.round((categoryScores.documentManagement / (categoryCounts.documentManagement * 4)) * 100)
      : 0,
    knowledgeRetention: categoryCounts.knowledgeRetention
      ? Math.round((categoryScores.knowledgeRetention / (categoryCounts.knowledgeRetention * 4)) * 100)
      : 0,
    aiReadiness: categoryCounts.aiReadiness
      ? Math.round((categoryScores.aiReadiness / (categoryCounts.aiReadiness * 4)) * 100)
      : 0,
  };

  const total = Math.round(
    (normalized.documentManagement +
      normalized.knowledgeRetention +
      normalized.aiReadiness) / 3
  );

  let tier: HealthcareScores["tier"];
  if (total < 35) tier = "early";
  else if (total < 55) tier = "emerging";
  else if (total < 75) tier = "developing";
  else tier = "ready";

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];
  const sortedCategories = Object.entries(normalized).sort((a, b) => a[1] - b[1]);

  sortedCategories.slice(0, 2).forEach(([category]) => {
    switch (category) {
      case "documentManagement":
        recommendations.push("Implement a unified document management system with semantic search capabilities");
        break;
      case "knowledgeRetention":
        recommendations.push("Create structured knowledge capture processes to reduce dependency on individual expertise");
        break;
      case "aiReadiness":
        recommendations.push("Build AI governance framework and assess infrastructure requirements for compliant AI deployment");
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

export const healthcareTierDescriptions = {
  early: {
    title: "Early Stage",
    description: "Your organization needs foundational improvements before AI adoption. Focus on document organization and knowledge capture first.",
    nextSteps: [
      "Audit current document management processes and identify critical gaps",
      "Begin capturing institutional knowledge from senior staff members",
      "Assess compliance requirements for healthcare AI applications",
      "Create a roadmap for infrastructure modernization",
    ],
  },
  emerging: {
    title: "Emerging",
    description: "You have some building blocks in place. Now focus on standardization and creating a knowledge-first culture.",
    nextSteps: [
      "Implement standardized document templates and naming conventions",
      "Create a searchable knowledge base for policies and procedures",
      "Develop data governance policies with AI use cases in mind",
      "Pilot AI tools in low-risk, high-value areas (scheduling, documentation)",
    ],
  },
  developing: {
    title: "Developing",
    description: "Your foundation is solid. You're ready to explore AI applications while strengthening governance.",
    nextSteps: [
      "Evaluate AI solutions for document intelligence and search",
      "Implement formal knowledge transfer and expertise documentation processes",
      "Build AI governance committee with clinical and technical stakeholders",
      "Pilot AI assistants for clinical documentation or coding",
    ],
  },
  ready: {
    title: "AI Ready",
    description: "Your organization is well-positioned for AI adoption. Focus on strategic implementation and continuous improvement.",
    nextSteps: [
      "Deploy AI-powered document search and knowledge retrieval",
      "Implement intelligent document processing for administrative workflows",
      "Explore clinical AI applications (diagnostic support, care recommendations)",
      "Establish AI monitoring and continuous improvement processes",
    ],
  },
};
