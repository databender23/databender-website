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
    question: "Can staff actually find what they're looking for?",
    options: [
      { value: 1, label: "Rarely", description: "Manual folder hunting, often give up" },
      { value: 2, label: "Eventually", description: "Need exact file names to find anything" },
      { value: 3, label: "Usually", description: "Decent folder structure, basic search" },
      { value: 4, label: "Quickly", description: "Unified search with filters and tags" },
    ],
  },
  {
    id: "format-consistency",
    category: "documentManagement",
    question: "Document formats: consistent or chaos?",
    options: [
      { value: 1, label: "Chaos", description: "Every department does their own thing" },
      { value: 2, label: "Partial", description: "Templates exist, adoption varies" },
      { value: 3, label: "Mostly consistent", description: "Standards with occasional exceptions" },
      { value: 4, label: "Fully standardized", description: "Enforced organization-wide" },
    ],
  },
  {
    id: "knowledge-capture",
    category: "documentManagement",
    question: "Is what people know actually written down?",
    options: [
      { value: 1, label: "Nope", description: "Lives in people's heads" },
      { value: 2, label: "Some of it", description: "Gaps everywhere" },
      { value: 3, label: "Most of it", description: "Documented but updates lag" },
      { value: 4, label: "All of it", description: "Living docs, actively maintained" },
    ],
  },
  {
    id: "policy-accessibility",
    category: "documentManagement",
    question: "Policies: can people find the current version fast?",
    options: [
      { value: 1, label: "Not really", description: "No one's sure what's current" },
      { value: 2, label: "Eventually", description: "Takes clicks or asking around" },
      { value: 3, label: "Fairly quick", description: "Central repo, could be better" },
      { value: 4, label: "Instantly", description: "Easy portal with version control" },
    ],
  },

  // Knowledge Retention
  {
    id: "turnover-impact",
    category: "knowledgeRetention",
    question: "When someone leaves, how bad is the knowledge loss?",
    options: [
      { value: 1, label: "Devastating", description: "Major gaps every time" },
      { value: 2, label: "Painful", description: "Months to recover" },
      { value: 3, label: "Manageable", description: "Documentation helps" },
      { value: 4, label: "Minimal", description: "Knowledge transfers smoothly" },
    ],
  },
  {
    id: "training-time",
    category: "knowledgeRetention",
    question: "New hires: how long until they're actually productive?",
    options: [
      { value: 1, label: "6+ months", description: "Long learning curve, tribal knowledge" },
      { value: 2, label: "3-6 months", description: "Significant ramp-up, ad-hoc training" },
      { value: 3, label: "1-3 months", description: "Structured onboarding" },
      { value: 4, label: "Under a month", description: "Great training materials" },
    ],
  },
  {
    id: "institutional-knowledge",
    category: "knowledgeRetention",
    question: "Payer rules, billing codes, protocols: can anyone look them up?",
    options: [
      { value: 1, label: "Good luck", description: "Scattered across emails and memories" },
      { value: 2, label: "Partially", description: "Some documented, hard to find" },
      { value: 3, label: "Mostly", description: "Knowledge base exists, could be better" },
      { value: 4, label: "Easily", description: "Searchable, complete, current" },
    ],
  },
  {
    id: "expertise-documentation",
    category: "knowledgeRetention",
    question: "Your coding specialists and compliance experts: is their knowledge backed up?",
    options: [
      { value: 1, label: "No", description: "Only in their heads" },
      { value: 2, label: "Partially", description: "Some notes, not systematic" },
      { value: 3, label: "Mostly", description: "Key expertise captured" },
      { value: 4, label: "Fully", description: "Complete transfer process" },
    ],
  },

  // AI Readiness
  {
    id: "infrastructure-readiness",
    category: "aiReadiness",
    question: "Your tech infrastructure: ready for AI?",
    options: [
      { value: 1, label: "Not even close", description: "Legacy systems, no integration" },
      { value: 2, label: "Starting point", description: "Some modern systems, technical debt" },
      { value: 3, label: "Good foundation", description: "Modern EHR with APIs" },
      { value: 4, label: "Ready to go", description: "Cloud-native, data pipelines" },
    ],
  },
  {
    id: "compliance-posture",
    category: "aiReadiness",
    question: "AI compliance: is HIPAA even on the radar?",
    options: [
      { value: 1, label: "Haven't thought about it", description: "No AI-specific compliance work" },
      { value: 2, label: "Aware of it", description: "Know the requirements, no framework" },
      { value: 3, label: "Working on it", description: "Building governance policies" },
      { value: 4, label: "Handled", description: "Comprehensive framework in place" },
    ],
  },
  {
    id: "data-governance",
    category: "aiReadiness",
    question: "Data governance: serious or aspirational?",
    options: [
      { value: 1, label: "Nonexistent", description: "No formal processes" },
      { value: 2, label: "Basic", description: "Some initiatives, not comprehensive" },
      { value: 3, label: "Solid", description: "Established with quality metrics" },
      { value: 4, label: "Mature", description: "AI-specific considerations built in" },
    ],
  },
  {
    id: "on-premise-capability",
    category: "aiReadiness",
    question: "Can you run AI on-premise to keep PHI off the cloud?",
    options: [
      { value: 1, label: "No infrastructure", description: "Nothing for AI workloads" },
      { value: 2, label: "Limited", description: "Servers exist, not AI-optimized" },
      { value: 3, label: "Possible", description: "Can support basic models" },
      { value: 4, label: "Absolutely", description: "Enterprise-grade on-prem ready" },
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
