// Construction Data Readiness Assessment

export interface ConstructionQuestion {
  id: string;
  category: "dataIntegration" | "marginVisibility" | "changeOrders" | "reporting" | "cashFlow";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

export const constructionQuestions: ConstructionQuestion[] = [
  // Data Integration
  {
    id: "system-count",
    category: "dataIntegration",
    question: "How many systems does your team check to answer 'How's this job doing?'",
    options: [
      { value: 1, label: "5+ systems", description: "Procore, accounting, field app, spreadsheets, email..." },
      { value: 2, label: "3-4 systems", description: "A few places to check, usually know where to look" },
      { value: 3, label: "2 systems", description: "Mostly consolidated, occasional cross-checking" },
      { value: 4, label: "One place", description: "Everything we need in one view" },
    ],
  },
  {
    id: "data-consistency",
    category: "dataIntegration",
    question: "When your CFO and PM look at the same job's margin, do they see the same number?",
    options: [
      { value: 1, label: "Rarely", description: "Different spreadsheets, different answers" },
      { value: 2, label: "Sometimes", description: "Depends on the job and when they checked" },
      { value: 3, label: "Usually", description: "Most numbers align, occasional discrepancies" },
      { value: 4, label: "Always", description: "One source of truth everyone uses" },
    ],
  },

  // Margin Visibility
  {
    id: "margin-timing",
    category: "marginVisibility",
    question: "When do you find out about margin problems on a job?",
    options: [
      { value: 1, label: "At closeout", description: "Surprises when we reconcile at the end" },
      { value: 2, label: "Monthly", description: "WIP report shows us, sometimes too late" },
      { value: 3, label: "Bi-weekly", description: "Regular check-ins catch most issues" },
      { value: 4, label: "Within days", description: "Alerts flag problems as they happen" },
    ],
  },
  {
    id: "cost-to-complete",
    category: "marginVisibility",
    question: "How confident are you in your cost-to-complete estimates right now?",
    options: [
      { value: 1, label: "Best guess", description: "PMs estimate based on feel" },
      { value: 2, label: "Reasonable", description: "Usually close, sometimes way off" },
      { value: 3, label: "Pretty accurate", description: "Tracked against actuals, most jobs on target" },
      { value: 4, label: "Very confident", description: "Real-time actuals plus forecasting" },
    ],
  },

  // Change Order Tracking
  {
    id: "change-order-capture",
    category: "changeOrders",
    question: "When a PM approves extra work in the field, what happens next?",
    options: [
      { value: 1, label: "Paperwork somewhere", description: "In a truck, in email, maybe gets entered later" },
      { value: 2, label: "Weekly entry", description: "Someone batches them up periodically" },
      { value: 3, label: "Same-day entry", description: "Gets into the system fairly quickly" },
      { value: 4, label: "Automatic", description: "Field approval flows straight to billing queue" },
    ],
  },
  {
    id: "unbilled-visibility",
    category: "changeOrders",
    question: "How do you know if there's unbilled work sitting out there?",
    options: [
      { value: 1, label: "We don't", description: "Find out when someone remembers or we're closing the job" },
      { value: 2, label: "Periodic review", description: "Monthly dig through to find missing items" },
      { value: 3, label: "Reports exist", description: "Can run a report, takes some digging" },
      { value: 4, label: "Dashboard", description: "Aging report shows unbilled items automatically" },
    ],
  },

  // Reporting
  {
    id: "wip-time",
    category: "reporting",
    question: "How long does it take to compile your WIP report?",
    options: [
      { value: 1, label: "A week or more", description: "Major production, lots of manual work" },
      { value: 2, label: "2-3 days", description: "Takes real effort each month" },
      { value: 3, label: "1 day", description: "Streamlined but still manual" },
      { value: 4, label: "Hours", description: "Mostly automated, just review and adjust" },
    ],
  },
  {
    id: "job-review-prep",
    category: "reporting",
    question: "How much prep goes into your weekly job review meetings?",
    options: [
      { value: 1, label: "Half a day", description: "Someone pulls data from everywhere" },
      { value: 2, label: "A few hours", description: "Standard process but still manual" },
      { value: 3, label: "An hour", description: "Most data ready, some assembly needed" },
      { value: 4, label: "None", description: "Dashboard is always current" },
    ],
  },

  // Cash Flow
  {
    id: "cash-position",
    category: "cashFlow",
    question: "How well do you know your cash position across all jobs?",
    options: [
      { value: 1, label: "Not well", description: "Receivables scattered, retainage a mystery" },
      { value: 2, label: "Monthly snapshot", description: "Know where we stand after close" },
      { value: 3, label: "Weekly view", description: "Regular updates, pretty current" },
      { value: 4, label: "Real-time", description: "Dashboard shows receivables, retainage, projections" },
    ],
  },
  {
    id: "payment-surprises",
    category: "cashFlow",
    question: "How often do cash flow issues catch you off guard?",
    options: [
      { value: 1, label: "Regularly", description: "Scrambling for payroll isn't unusual" },
      { value: 2, label: "Quarterly", description: "A few surprises a year" },
      { value: 3, label: "Rarely", description: "Mostly predictable, occasional curveballs" },
      { value: 4, label: "Never", description: "We see it coming and plan ahead" },
    ],
  },
];

export interface ConstructionScores {
  dataIntegration: number;
  marginVisibility: number;
  changeOrders: number;
  reporting: number;
  cashFlow: number;
  total: number;
  tier: "reactive" | "aware" | "proactive" | "predictive";
  recommendations: string[];
}

export function calculateConstructionScores(
  answers: Record<string, number>
): ConstructionScores {
  const categoryScores = {
    dataIntegration: 0,
    marginVisibility: 0,
    changeOrders: 0,
    reporting: 0,
    cashFlow: 0,
  };

  const categoryCounts = {
    dataIntegration: 0,
    marginVisibility: 0,
    changeOrders: 0,
    reporting: 0,
    cashFlow: 0,
  };

  constructionQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
      categoryCounts[q.category]++;
    }
  });

  // Normalize to 0-100 scale
  const normalized = {
    dataIntegration: categoryCounts.dataIntegration
      ? Math.round((categoryScores.dataIntegration / (categoryCounts.dataIntegration * 4)) * 100)
      : 0,
    marginVisibility: categoryCounts.marginVisibility
      ? Math.round((categoryScores.marginVisibility / (categoryCounts.marginVisibility * 4)) * 100)
      : 0,
    changeOrders: categoryCounts.changeOrders
      ? Math.round((categoryScores.changeOrders / (categoryCounts.changeOrders * 4)) * 100)
      : 0,
    reporting: categoryCounts.reporting
      ? Math.round((categoryScores.reporting / (categoryCounts.reporting * 4)) * 100)
      : 0,
    cashFlow: categoryCounts.cashFlow
      ? Math.round((categoryScores.cashFlow / (categoryCounts.cashFlow * 4)) * 100)
      : 0,
  };

  const total = Math.round(
    (normalized.dataIntegration +
      normalized.marginVisibility +
      normalized.changeOrders +
      normalized.reporting +
      normalized.cashFlow) / 5
  );

  let tier: ConstructionScores["tier"];
  if (total < 35) tier = "reactive";
  else if (total < 55) tier = "aware";
  else if (total < 75) tier = "proactive";
  else tier = "predictive";

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];
  const sortedCategories = Object.entries(normalized).sort((a, b) => a[1] - b[1]);

  sortedCategories.slice(0, 2).forEach(([category]) => {
    switch (category) {
      case "dataIntegration":
        recommendations.push("Connect your systems so job status lives in one place, not scattered across Procore, accounting, and spreadsheets");
        break;
      case "marginVisibility":
        recommendations.push("Get real-time margin visibility so you catch problems at week 4, not closeout");
        break;
      case "changeOrders":
        recommendations.push("Build a change order pipeline that flows from field approval to billing automatically");
        break;
      case "reporting":
        recommendations.push("Automate the WIP and job review reports that eat up your team's time every month");
        break;
      case "cashFlow":
        recommendations.push("Get cash flow visibility across all jobs so you see problems coming before they hit");
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
  reactive: {
    title: "Flying Blind",
    description: "You're finding out about problems after the damage is done. Margin surprises at closeout, unbilled change orders discovered too late, cash flow scrambles. The good news: fixing this frees up real money.",
    nextSteps: [
      "Connect job cost data so 'What's our margin?' has one answer",
      "Get change orders flowing from field to billing automatically",
      "Build cash flow visibility across all jobs",
    ],
  },
  aware: {
    title: "Getting Visibility",
    description: "You know where some of the problems are, but you're still doing a lot of manual work to stay on top of things. Time to connect the dots.",
    nextSteps: [
      "Reduce WIP report time by connecting your systems",
      "Build alerts that flag margin problems earlier",
      "Create an aging report for unbilled change orders",
    ],
  },
  proactive: {
    title: "Running Tight",
    description: "You've got solid visibility and catch most problems early. Now you can start predicting issues before they happen and automating the repetitive work.",
    nextSteps: [
      "Add predictive alerts for at-risk jobs",
      "Automate job review preparation completely",
      "Build cash flow forecasting, not just reporting",
    ],
  },
  predictive: {
    title: "Ahead of the Curve",
    description: "You're running tighter than most contractors. Look for competitive advantages in predictive analytics and automation.",
    nextSteps: [
      "Deploy AI for margin forecasting and risk detection",
      "Automate more of the monthly close process",
      "Explore crew productivity and schedule optimization",
    ],
  },
};
