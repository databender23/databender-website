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
      { value: 4, label: "Handled", description: "Full framework in place" },
    ],
  },
  {
    id: "data-governance",
    category: "aiReadiness",
    question: "Data governance: serious or aspirational?",
    options: [
      { value: 1, label: "Nonexistent", description: "No formal processes" },
      { value: 2, label: "Basic", description: "Some initiatives, not complete" },
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
        recommendations.push("Get your documents organized first. AI can't find what's scattered across 50 folders.");
        break;
      case "knowledgeRetention":
        recommendations.push("Start capturing what your experienced staff know. Every retirement is a quiet crisis right now.");
        break;
      case "aiReadiness":
        recommendations.push("Talk to compliance about AI before you need to. Getting buy-in takes longer than the tech work.");
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
    description: "Your organization has work to do before AI makes sense. The good news: getting organized is straightforward, and AI costs have dropped enough that it's worth doing.",
    nextSteps: [
      "Get your documents into one place where people can actually find them",
      "Start writing down what your experienced staff know before they leave",
      "Talk to compliance early so you're not scrambling later",
      "Pick one thing that wastes the most time. That's your starting point.",
    ],
  },
  emerging: {
    title: "Emerging",
    description: "You have the basics. Now it's about making things searchable. Staff shouldn't have to hunt for protocols or ask around for answers.",
    nextSteps: [
      "Create consistent naming and folder structures (sounds boring, matters a lot)",
      "Build a searchable place for policies and procedures",
      "Figure out what data you need to clean up before AI can use it",
      "Try AI on something low-risk first. Scheduling or documentation are easy wins.",
    ],
  },
  developing: {
    title: "Developing",
    description: "Your foundation is solid. You can actually deploy AI now. The question is which project delivers the most value fastest.",
    nextSteps: [
      "Get pricing on document intelligence for your specific volumes",
      "Set up a real process for capturing what senior staff know",
      "Get your compliance and clinical people in the same room about AI",
      "Pilot something visible. Coding or documentation are good candidates.",
    ],
  },
  ready: {
    title: "AI Ready",
    description: "You're ahead of most healthcare organizations. The infrastructure is there, the governance is there. Time to move.",
    nextSteps: [
      "Deploy document search. Your staff will thank you.",
      "Automate the administrative work that nobody wants to do",
      "Look at clinical applications now that you've proven the basics work",
      "The organizations moving now will have a year's head start. Time to decide.",
    ],
  },
};
