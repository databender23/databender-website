// Manufacturing Scale-Up Data Readiness Assessment

export interface ManufacturingQuestion {
  id: string;
  category: "dataInfrastructure" | "salesProduction" | "visibility" | "automation";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

export const manufacturingQuestions: ManufacturingQuestion[] = [
  // Data Infrastructure
  {
    id: "erp-integration",
    category: "dataInfrastructure",
    question: "When someone asks 'Where's my order?', how many systems do you check?",
    options: [
      { value: 1, label: "3+ systems", description: "ERP, shipping, maybe email or phone calls" },
      { value: 2, label: "2 systems", description: "Usually ERP plus one other place" },
      { value: 3, label: "1-2 systems", description: "Most info in one place, occasional checking elsewhere" },
      { value: 4, label: "One place", description: "Everything we need is in one view" },
    ],
  },
  {
    id: "data-quality",
    category: "dataInfrastructure",
    question: "How often does your team chase down wrong contacts or outdated info?",
    options: [
      { value: 1, label: "Constantly", description: "Duplicates, wrong contacts, outdated info everywhere" },
      { value: 2, label: "Weekly", description: "Known issues, we work around them" },
      { value: 3, label: "Occasionally", description: "Rare cleanup needed" },
      { value: 4, label: "Almost never", description: "Data is clean and current" },
    ],
  },
  {
    id: "single-source",
    category: "dataInfrastructure",
    question: "When sales and production look at the same metric, do they see the same number?",
    options: [
      { value: 1, label: "Rarely", description: "Different spreadsheets, different answers" },
      { value: 2, label: "Sometimes", description: "Some metrics match, others don't" },
      { value: 3, label: "Usually", description: "Most numbers align" },
      { value: 4, label: "Always", description: "One source of truth everyone uses" },
    ],
  },

  // Sales & Production Connection
  {
    id: "sales-production-link",
    category: "salesProduction",
    question: "How does production find out what sales promised?",
    options: [
      { value: 1, label: "Phone calls or emails", description: "Someone has to ask or chase it down" },
      { value: 2, label: "Weekly meetings", description: "Updates shared periodically" },
      { value: 3, label: "Shared system", description: "Both can see the same data" },
      { value: 4, label: "Real-time sync", description: "Production sees commitments as they're made" },
    ],
  },
  {
    id: "demand-forecasting",
    category: "salesProduction",
    question: "How do you figure out what to build next month?",
    options: [
      { value: 1, label: "Gut feel", description: "Experience and intuition" },
      { value: 2, label: "Last year's numbers", description: "Simple trending from history" },
      { value: 3, label: "Spreadsheet models", description: "Manual analysis, reasonably accurate" },
      { value: 4, label: "Predictive system", description: "Data-driven forecasts with multiple inputs" },
    ],
  },
  {
    id: "cost-visibility",
    category: "salesProduction",
    question: "How confident are you in your product margins right now?",
    options: [
      { value: 1, label: "Rough estimates", description: "Standard costs from years ago" },
      { value: 2, label: "Quarterly updates", description: "Reviewed periodically" },
      { value: 3, label: "Pretty accurate", description: "Regular updates, most costs captured" },
      { value: 4, label: "Real-time", description: "Actual costs tracked as they happen" },
    ],
  },
  {
    id: "supply-chain-visibility",
    category: "salesProduction",
    question: "When a supplier is going to miss a delivery, when do you find out?",
    options: [
      { value: 1, label: "When it's already late", description: "They deliver late or we call to check" },
      { value: 2, label: "Same week", description: "Usually some warning, not much lead time" },
      { value: 3, label: "A week or more ahead", description: "Suppliers communicate reasonably well" },
      { value: 4, label: "Before they know", description: "Our systems flag potential issues early" },
    ],
  },

  // Operational Visibility
  {
    id: "labor-productivity",
    category: "visibility",
    question: "How much time does your team spend hunting for information instead of acting on it?",
    options: [
      { value: 1, label: "Hours every day", description: "Constant hunting and reconciling" },
      { value: 2, label: "An hour or two daily", description: "Regular interruptions to find answers" },
      { value: 3, label: "Sometimes", description: "Usually know where to look" },
      { value: 4, label: "Rarely", description: "Information is easy to find" },
    ],
  },
  {
    id: "production-visibility",
    category: "visibility",
    question: "If an order is running late, when do you find out?",
    options: [
      { value: 1, label: "When it's already late", description: "Customer calls before we know" },
      { value: 2, label: "End of day", description: "Morning-after reports" },
      { value: 3, label: "Same day", description: "Updates every few hours" },
      { value: 4, label: "Before it happens", description: "Alerts flag at-risk orders early" },
    ],
  },
  {
    id: "quality-tracking",
    category: "visibility",
    question: "When there's a quality issue, how long does it take to trace back to the cause?",
    options: [
      { value: 1, label: "Hours or days", description: "Paper logs, manual searching" },
      { value: 2, label: "An hour or two", description: "Spreadsheets and digging" },
      { value: 3, label: "Minutes", description: "Quality system with decent tracking" },
      { value: 4, label: "Instantly", description: "Full traceability in one system" },
    ],
  },
  {
    id: "kpi-access",
    category: "visibility",
    question: "When you need to know how the floor is running, what do you do?",
    options: [
      { value: 1, label: "Ask someone", description: "Call or walk over to find out" },
      { value: 2, label: "Wait for reports", description: "Check email for scheduled updates" },
      { value: 3, label: "Check a dashboard", description: "Self-service, mostly current" },
      { value: 4, label: "Glance at a screen", description: "Real-time visibility always available" },
    ],
  },

  // Automation & AI Readiness
  {
    id: "process-automation",
    category: "automation",
    question: "How much of your reporting happens automatically?",
    options: [
      { value: 1, label: "Almost none", description: "Someone builds every report by hand" },
      { value: 2, label: "Some", description: "A few scheduled reports, most manual" },
      { value: 3, label: "Most", description: "Key reports generate automatically" },
      { value: 4, label: "Nearly all", description: "Reports update themselves, we just review" },
    ],
  },
  {
    id: "data-team",
    category: "automation",
    question: "Who handles data and reporting?",
    options: [
      { value: 1, label: "Whoever has time", description: "Ad-hoc, usually IT or a manager" },
      { value: 2, label: "Part-time", description: "Someone does it alongside other work" },
      { value: 3, label: "Dedicated person", description: "1-2 people focused on data" },
      { value: 4, label: "Full team", description: "Analysts, maybe engineers" },
    ],
  },
  {
    id: "ai-interest",
    category: "automation",
    question: "Where are you with AI for operations?",
    options: [
      { value: 1, label: "Haven't started", description: "Not sure where it would help" },
      { value: 2, label: "Curious", description: "Looking into it, nothing concrete" },
      { value: 3, label: "Testing", description: "Piloting something specific" },
      { value: 4, label: "Using it", description: "AI helping with real decisions" },
    ],
  },
];

export interface ManufacturingScores {
  dataInfrastructure: number;
  salesProduction: number;
  visibility: number;
  automation: number;
  total: number;
  tier: "early" | "emerging" | "developing" | "advanced";
  recommendations: string[];
}

export function calculateManufacturingScores(
  answers: Record<string, number>
): ManufacturingScores {
  const categoryScores = {
    dataInfrastructure: 0,
    salesProduction: 0,
    visibility: 0,
    automation: 0,
  };

  const categoryCounts = {
    dataInfrastructure: 0,
    salesProduction: 0,
    visibility: 0,
    automation: 0,
  };

  manufacturingQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
      categoryCounts[q.category]++;
    }
  });

  // Normalize to 0-100 scale
  const normalized = {
    dataInfrastructure: categoryCounts.dataInfrastructure
      ? Math.round((categoryScores.dataInfrastructure / (categoryCounts.dataInfrastructure * 4)) * 100)
      : 0,
    salesProduction: categoryCounts.salesProduction
      ? Math.round((categoryScores.salesProduction / (categoryCounts.salesProduction * 4)) * 100)
      : 0,
    visibility: categoryCounts.visibility
      ? Math.round((categoryScores.visibility / (categoryCounts.visibility * 4)) * 100)
      : 0,
    automation: categoryCounts.automation
      ? Math.round((categoryScores.automation / (categoryCounts.automation * 4)) * 100)
      : 0,
  };

  const total = Math.round(
    (normalized.dataInfrastructure +
      normalized.salesProduction +
      normalized.visibility +
      normalized.automation) / 4
  );

  let tier: ManufacturingScores["tier"];
  if (total < 35) tier = "early";
  else if (total < 55) tier = "emerging";
  else if (total < 75) tier = "developing";
  else tier = "advanced";

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];
  const sortedCategories = Object.entries(normalized).sort((a, b) => a[1] - b[1]);

  sortedCategories.slice(0, 2).forEach(([category]) => {
    switch (category) {
      case "dataInfrastructure":
        recommendations.push("Connect your systems so answers live in one place, not scattered across spreadsheets");
        break;
      case "salesProduction":
        recommendations.push("Get sales and production seeing the same numbers so nobody's scrambling at the last minute");
        break;
      case "visibility":
        recommendations.push("Build visibility that catches problems before they become fires");
        break;
      case "automation":
        recommendations.push("Automate the reporting that eats up your team's time");
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
    title: "Firefighting Mode",
    description: "You're spending too much time hunting for answers and reacting to problems. Your team is stretched thin doing work that should take half the time. The good news: small changes can free up real capacity.",
    nextSteps: [
      "Connect your core systems so 'Where's my order?' has one answer",
      "Stop the time drain: automate information hunting so your team acts instead of searching",
    ],
  },
  emerging: {
    title: "Getting Organized",
    description: "You have some visibility, but gaps remain. Your people are still spending too much time on manual work. Focus on connecting the dots so problems surface earlier.",
    nextSteps: [
      "Link your ERP to shipping and quality systems",
      "Build alerts that flag at-risk orders before they're late",
    ],
  },
  developing: {
    title: "Running Smooth",
    description: "Your basics are solid. Now you can start catching problems before they happen and getting more done with your current team.",
    nextSteps: [
      "Add predictive alerts for demand and quality issues",
      "Automate the reports your team builds by hand every week",
    ],
  },
  advanced: {
    title: "Ahead of the Pack",
    description: "You're running tighter than most. Look for competitive advantages in AI and automation that let you scale without adding headcount.",
    nextSteps: [
      "Deploy AI for decisions you currently make manually",
      "Explore predictive maintenance and quality optimization",
    ],
  },
};
