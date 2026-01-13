import type { AssessmentScores, AssessmentCategory } from "@/types";

export const assessmentQuestions = [
  // Data Infrastructure
  {
    id: "data-systems",
    category: "dataInfrastructure" as AssessmentCategory,
    question: "Where does your company's data live today?",
    options: [
      { value: 0, label: "Scattered across spreadsheets and different tools", description: "Everyone has their own files" },
      { value: 3, label: "In a few systems that don't talk to each other", description: "Information is siloed" },
      { value: 5, label: "Mostly in one place, but it's messy", description: "Centralized but needs cleanup" },
      { value: 8, label: "In one place, clean and connected", description: "Well organized" },
    ],
  },
  {
    id: "data-quality",
    category: "dataInfrastructure" as AssessmentCategory,
    question: "How much do you trust your data?",
    options: [
      { value: 0, label: "Not much. We find errors and duplicates all the time", description: "Constant issues" },
      { value: 3, label: "Depends on the source. Some is good, some isn't", description: "Hit or miss" },
      { value: 5, label: "It's mostly accurate, but someone has to check it manually", description: "Good but requires effort" },
      { value: 8, label: "We trust it. Errors get caught automatically", description: "Reliable" },
    ],
  },
  // Analytics Capability
  {
    id: "reporting",
    category: "analyticsCapability" as AssessmentCategory,
    question: "How do you see what's happening in your business?",
    options: [
      { value: 0, label: "Someone builds a spreadsheet when we need it", description: "One-off analysis" },
      { value: 3, label: "We run standard reports from our systems", description: "Basic reports" },
      { value: 5, label: "We have dashboards, but they're not always up to date", description: "Some dashboards" },
      { value: 8, label: "We have dashboards that update automatically", description: "Live dashboards" },
    ],
  },
  {
    id: "decisions",
    category: "analyticsCapability" as AssessmentCategory,
    question: "When you make a big decision, how often do you look at data first?",
    options: [
      { value: 0, label: "Rarely. We mostly go with our gut", description: "Intuition-based" },
      { value: 3, label: "Sometimes, if it's a major decision", description: "Occasionally" },
      { value: 6, label: "Usually, but getting the data takes a while", description: "Often but slow" },
      { value: 9, label: "Always. We don't make decisions without it", description: "Data-driven" },
    ],
  },
  // Automation Maturity
  {
    id: "manual-work",
    category: "automationMaturity" as AssessmentCategory,
    question: "How much time does your team spend on repetitive data tasks?",
    options: [
      { value: 0, label: "A lot. Data entry, copying between systems, building reports", description: "Very manual" },
      { value: 3, label: "Some of it runs automatically, but there's still a lot of manual work", description: "Partially automated" },
      { value: 6, label: "Most routine stuff happens automatically", description: "Mostly automated" },
      { value: 8, label: "Very little. We only do manual work when it requires judgment", description: "Highly automated" },
    ],
  },
  {
    id: "workflows",
    category: "automationMaturity" as AssessmentCategory,
    question: "How does data move between your systems?",
    options: [
      { value: 0, label: "Manually. Copy/paste, exports, uploads", description: "All manual" },
      { value: 3, label: "Some things sync automatically, but a lot is still manual", description: "Partially automatic" },
      { value: 5, label: "Most data moves automatically between systems", description: "Mostly automatic" },
      { value: 8, label: "Everything syncs automatically, and we get notified if something breaks", description: "Fully automatic" },
    ],
  },
  // AI Readiness
  {
    id: "ai-current",
    category: "aiReadiness" as AssessmentCategory,
    question: "Is your company using AI today?",
    options: [
      { value: 0, label: "No, and we're not sure where we'd even start", description: "Not using AI" },
      { value: 3, label: "We've tried some things, but nothing stuck", description: "Experimenting" },
      { value: 5, label: "We use tools like ChatGPT, but nothing built for our business", description: "General AI tools" },
      { value: 9, label: "Yes, AI is part of how we work", description: "Using AI daily" },
    ],
  },
  {
    id: "ai-goals",
    category: "aiReadiness" as AssessmentCategory,
    question: "What would you most want AI to do for your business?",
    options: [
      { value: 2, label: "Not sure yet. Still figuring out the possibilities", description: "Exploring" },
      { value: 4, label: "Take over repetitive tasks my team does manually", description: "Save time" },
      { value: 6, label: "Help us understand our data better", description: "Better visibility" },
      { value: 8, label: "Predict what's going to happen and recommend what to do", description: "Forecasting" },
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

  // Determine tier (max score is ~66 with 8 questions)
  if (scores.total < 17) {
    scores.tier = "early";
  } else if (scores.total < 34) {
    scores.tier = "emerging";
  } else if (scores.total < 51) {
    scores.tier = "developing";
  } else {
    scores.tier = "advanced";
  }

  return scores;
}

export const tierDescriptions = {
  early: {
    title: "Early Stage",
    description: "Your data is scattered and most work is manual. That's normal for companies at this stage. The good news: there's a lot of low-hanging fruit.",
    recommendations: [
      "Connect your key systems so data flows between them",
      "Clean up your data before adding more tools",
      "Build simple dashboards for the numbers that matter most",
      "Use AI to speed up data cleanup (it's faster than doing it by hand)",
    ],
    suggestedServices: ["data-ai-strategy", "analytics-bi"],
  },
  emerging: {
    title: "Emerging",
    description: "You have some pieces in place, but your team still spends too much time on manual work. You're ready to automate the repetitive stuff.",
    recommendations: [
      "Automate the tasks that eat up the most time",
      "Build dashboards so you can see what's happening without asking",
      "Start thinking about what you'd want to predict",
      "Get real-time visibility into your operations",
    ],
    suggestedServices: ["analytics-bi", "data-ai-strategy", "ai-services"],
  },
  developing: {
    title: "Developing",
    description: "Your data is in good shape and you're using it to make decisions. You're ready for AI that does more than just answer questions.",
    recommendations: [
      "Set up AI that tells you what to pay attention to",
      "Let people ask questions in plain English instead of running reports",
      "Build models that predict what's coming",
      "Automate more complex processes",
    ],
    suggestedServices: ["ai-services", "analytics-bi", "data-ai-strategy"],
  },
  advanced: {
    title: "Advanced",
    description: "You're ahead of most companies. Your data is clean, your team uses it daily, and you're already using AI. Now it's about optimization.",
    recommendations: [
      "Fine-tune your AI to get even better results",
      "Move from predicting what will happen to recommending what to do",
      "Build AI that's unique to your business",
      "Make sure everything scales as you grow",
    ],
    suggestedServices: ["ai-services", "analytics-bi"],
  },
};
