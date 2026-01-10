import type { AssessmentScores, AssessmentCategory } from "@/types";

export const assessmentQuestions = [
  // Data Infrastructure (25 points)
  {
    id: "data-systems",
    category: "dataInfrastructure" as AssessmentCategory,
    question: "How would you describe your current data landscape?",
    options: [
      { value: 0, label: "Data lives in spreadsheets and individual tools", description: "No centralized system" },
      { value: 3, label: "We have some databases but they don't connect", description: "Siloed systems" },
      { value: 5, label: "We have a central database but data quality varies", description: "Centralized but messy" },
      { value: 8, label: "We have clean, connected data systems", description: "Well-organized" },
    ],
  },
  {
    id: "data-quality",
    category: "dataInfrastructure" as AssessmentCategory,
    question: "How confident are you in your data quality?",
    options: [
      { value: 0, label: "We frequently find errors and duplicates", description: "Major quality issues" },
      { value: 3, label: "Some data is reliable, some isn't", description: "Inconsistent quality" },
      { value: 5, label: "Most data is accurate but cleanup is manual", description: "Good but labor-intensive" },
      { value: 8, label: "We have automated quality controls", description: "Systematic quality management" },
    ],
  },
  {
    id: "data-access",
    category: "dataInfrastructure" as AssessmentCategory,
    question: "How easy is it for your team to access the data they need?",
    options: [
      { value: 0, label: "They have to ask IT or wait for reports", description: "Dependent on others" },
      { value: 3, label: "Some self-service exists but it's limited", description: "Partial self-service" },
      { value: 5, label: "Most people can access data but need training", description: "Available but complex" },
      { value: 9, label: "Anyone can get the data they need easily", description: "Full self-service" },
    ],
  },
  // Analytics Capability (25 points)
  {
    id: "reporting",
    category: "analyticsCapability" as AssessmentCategory,
    question: "How do you currently get insights from your data?",
    options: [
      { value: 0, label: "Manual spreadsheet analysis", description: "Ad-hoc Excel work" },
      { value: 3, label: "Basic reports from our systems", description: "Standard reports" },
      { value: 5, label: "We have dashboards but they're not always current", description: "Some visualization" },
      { value: 8, label: "Real-time dashboards with key metrics", description: "Live insights" },
    ],
  },
  {
    id: "decisions",
    category: "analyticsCapability" as AssessmentCategory,
    question: "How often do data insights drive business decisions?",
    options: [
      { value: 0, label: "Rarely - we mostly rely on intuition", description: "Gut-based decisions" },
      { value: 3, label: "Sometimes - for major decisions", description: "Occasional data use" },
      { value: 6, label: "Often - but getting data takes time", description: "Data-informed but slow" },
      { value: 9, label: "Always - data is central to how we operate", description: "Data-driven culture" },
    ],
  },
  {
    id: "reporting-time",
    category: "analyticsCapability" as AssessmentCategory,
    question: "How long does it take to answer a new business question with data?",
    options: [
      { value: 0, label: "Days to weeks", description: "Very slow" },
      { value: 3, label: "Hours to a day", description: "Relatively slow" },
      { value: 5, label: "Less than an hour", description: "Reasonably fast" },
      { value: 8, label: "Minutes or instant", description: "Real-time capability" },
    ],
  },
  // Automation Maturity (25 points)
  {
    id: "manual-work",
    category: "automationMaturity" as AssessmentCategory,
    question: "How much manual data work does your team do?",
    options: [
      { value: 0, label: "A lot - data entry, cleanup, report creation", description: "Heavily manual" },
      { value: 3, label: "Some automation but still significant manual work", description: "Partially automated" },
      { value: 6, label: "Most routine tasks are automated", description: "Mostly automated" },
      { value: 8, label: "Manual work is minimal and strategic", description: "Highly automated" },
    ],
  },
  {
    id: "alerts",
    category: "automationMaturity" as AssessmentCategory,
    question: "Do you have automated alerts for important changes in your data?",
    options: [
      { value: 0, label: "No - we find out about issues manually", description: "No alerting" },
      { value: 3, label: "Basic alerts for critical issues only", description: "Minimal alerting" },
      { value: 5, label: "Automated alerts for key metrics", description: "Good alerting" },
      { value: 9, label: "Smart alerts with context and recommendations", description: "Intelligent alerting" },
    ],
  },
  {
    id: "workflows",
    category: "automationMaturity" as AssessmentCategory,
    question: "Are your data workflows automated or manual?",
    options: [
      { value: 0, label: "Mostly manual - copy/paste, exports, uploads", description: "Manual workflows" },
      { value: 3, label: "Some scheduled jobs but many manual steps", description: "Partial automation" },
      { value: 5, label: "Most data flows are automated", description: "Automated pipelines" },
      { value: 8, label: "Full automation with error handling", description: "Robust automation" },
    ],
  },
  // AI Readiness (25 points)
  {
    id: "ai-current",
    category: "aiReadiness" as AssessmentCategory,
    question: "Are you currently using AI or machine learning?",
    options: [
      { value: 0, label: "No, and we're not sure where to start", description: "Not using AI" },
      { value: 3, label: "We've experimented but nothing in production", description: "Exploring AI" },
      { value: 5, label: "We use AI tools but not custom solutions", description: "Using off-the-shelf AI" },
      { value: 9, label: "We have AI integrated into our workflows", description: "AI-enabled" },
    ],
  },
  {
    id: "ai-data-ready",
    category: "aiReadiness" as AssessmentCategory,
    question: "Is your data ready for AI/ML applications?",
    options: [
      { value: 0, label: "Our data is too messy for AI", description: "Not AI-ready" },
      { value: 3, label: "Some data could work but needs cleanup", description: "Partially ready" },
      { value: 5, label: "Data is clean but not optimized for AI", description: "Ready with work" },
      { value: 8, label: "Our data is well-structured for AI applications", description: "AI-ready" },
    ],
  },
  {
    id: "ai-goals",
    category: "aiReadiness" as AssessmentCategory,
    question: "What's your primary interest in AI for your business?",
    options: [
      { value: 2, label: "Not sure yet - exploring possibilities", description: "Curious" },
      { value: 4, label: "Automating manual tasks", description: "Efficiency focus" },
      { value: 6, label: "Getting better insights from our data", description: "Intelligence focus" },
      { value: 8, label: "Predictive capabilities and recommendations", description: "Advanced applications" },
    ],
  },
];

export function calculateScores(answers: Record<string, number>): AssessmentScores {
  const scores = {
    dataInfrastructure: 0,
    analyticsCapability: 0,
    automationMaturity: 0,
    aiReadiness: 0,
    total: 0,
    tier: "early" as "early" | "emerging" | "developing" | "advanced",
  };

  // Calculate category scores
  assessmentQuestions.forEach((q) => {
    const answer = answers[q.id] ?? 0;
    scores[q.category] += answer;
  });

  // Calculate total
  scores.total =
    scores.dataInfrastructure +
    scores.analyticsCapability +
    scores.automationMaturity +
    scores.aiReadiness;

  // Determine tier
  if (scores.total < 25) {
    scores.tier = "early";
  } else if (scores.total < 50) {
    scores.tier = "emerging";
  } else if (scores.total < 75) {
    scores.tier = "developing";
  } else {
    scores.tier = "advanced";
  }

  return scores;
}

export const tierDescriptions = {
  early: {
    title: "Early Stage",
    description: "Your data infrastructure is foundational. You're likely dealing with scattered data and manual processes. The good news? There's significant opportunity for quick wins.",
    recommendations: [
      "Start with data consolidation—connect your key systems",
      "Focus on data quality before adding complexity",
      "Build basic dashboards for essential metrics",
      "Consider AI data cleanup to accelerate foundation work",
    ],
    suggestedServices: ["data-integration", "ai-data-cleanup", "data-foundation"],
  },
  emerging: {
    title: "Emerging",
    description: "You have some foundation in place but significant manual work remains. You're ready to start automating and getting more value from your data.",
    recommendations: [
      "Automate your most time-consuming manual processes",
      "Build out your analytics capabilities",
      "Start thinking about predictive use cases",
      "Consider operational visibility solutions",
    ],
    suggestedServices: ["dashboards-analytics", "operational-visibility", "data-integration"],
  },
  developing: {
    title: "Developing",
    description: "Your data infrastructure is solid and you're getting value from analytics. You're ready to explore more advanced AI and automation.",
    recommendations: [
      "Implement AI-generated insights for proactive analytics",
      "Add natural language capabilities for self-service",
      "Build predictive models for key business decisions",
      "Automate more complex workflows",
    ],
    suggestedServices: ["ai-insights", "natural-language-bi", "predictive-analytics"],
  },
  advanced: {
    title: "Advanced",
    description: "You're operating at a high level with data-driven decision making. Focus on optimization, advanced AI, and staying ahead of the curve.",
    recommendations: [
      "Optimize existing AI models for better performance",
      "Explore advanced predictive and prescriptive analytics",
      "Consider building competitive advantages with custom AI",
      "Focus on scaling and governance",
    ],
    suggestedServices: ["predictive-analytics", "ai-insights"],
  },
};
