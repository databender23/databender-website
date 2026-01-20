// Wholesale Distribution Analytics Readiness Assessment

export interface DistributionQuestion {
  id: string;
  category: "inventory" | "customerProfitability" | "pricing" | "operations";
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

export const distributionQuestions: DistributionQuestion[] = [
  // Inventory Management
  {
    id: "inventory-visibility",
    category: "inventory",
    question: "How long does it take to answer 'what's our true profit on this customer?'",
    options: [
      { value: 1, label: "We can't answer that", description: "No cost-to-serve visibility" },
      { value: 2, label: "Days", description: "Requires spreadsheet analysis and digging" },
      { value: 3, label: "Hours", description: "Reports exist but need manual work" },
      { value: 4, label: "Minutes", description: "Dashboard shows it in real-time" },
    ],
  },
  {
    id: "dead-stock",
    category: "inventory",
    question: "How do you identify dead stock (SKUs that haven't moved in 6+ months)?",
    options: [
      { value: 1, label: "We don't regularly", description: "Spot it when we trip over it" },
      { value: 2, label: "Manual review", description: "Someone checks periodically" },
      { value: 3, label: "ERP reports", description: "Run reports when we think of it" },
      { value: 4, label: "Automatic flagging", description: "System alerts us proactively" },
    ],
  },
  {
    id: "dead-stock-percent",
    category: "inventory",
    question: "What percentage of your inventory hasn't moved in 6+ months?",
    options: [
      { value: 1, label: "Don't know", description: "Haven't measured recently" },
      { value: 2, label: "Over 20%", description: "Significant dead stock" },
      { value: 3, label: "10-20%", description: "Some dead stock" },
      { value: 4, label: "Under 10%", description: "Inventory is turning well" },
    ],
  },

  // Customer Profitability
  {
    id: "customer-profitability",
    category: "customerProfitability",
    question: "Do you know the cost-to-serve for your top 10 customers?",
    options: [
      { value: 1, label: "No", description: "No visibility into cost-to-serve" },
      { value: 2, label: "Partially", description: "Some factors tracked, not complete" },
      { value: 3, label: "Mostly", description: "Good estimates, some gaps" },
      { value: 4, label: "Yes, precisely", description: "Full cost-to-serve analysis" },
    ],
  },
  {
    id: "profitable-customers",
    category: "customerProfitability",
    question: "Could some of your 'best customers' actually be money-losers after cost-to-serve?",
    options: [
      { value: 1, label: "Very likely", description: "High volume with lots of service demands" },
      { value: 2, label: "Probably", description: "Some customers are more demanding" },
      { value: 3, label: "Unlikely", description: "We have a sense of who's profitable" },
      { value: 4, label: "We know exactly", description: "Profitability by customer is clear" },
    ],
  },
  {
    id: "sales-comp",
    category: "customerProfitability",
    question: "Is your sales comp tied to margin or just revenue?",
    options: [
      { value: 1, label: "Revenue only", description: "Commission on sales volume" },
      { value: 2, label: "Mostly revenue", description: "Some margin component" },
      { value: 3, label: "Mostly margin", description: "Margin-focused with revenue floor" },
      { value: 4, label: "Margin-based", description: "Comp aligned to profitability" },
    ],
  },

  // Pricing
  {
    id: "pricing-visibility",
    category: "pricing",
    question: "How do sales reps know the margin on a deal before quoting?",
    options: [
      { value: 1, label: "They don't", description: "Quote first, find out later" },
      { value: 2, label: "Ask someone", description: "Check with manager or finance" },
      { value: 3, label: "Spreadsheet lookup", description: "Reference pricing sheets" },
      { value: 4, label: "Real-time visibility", description: "System shows margin on quotes" },
    ],
  },
  {
    id: "pricing-exceptions",
    category: "pricing",
    question: "How often do pricing exceptions require manager approval?",
    options: [
      { value: 1, label: "Constantly", description: "Most deals need approval" },
      { value: 2, label: "Often", description: "Several times a day" },
      { value: 3, label: "Sometimes", description: "Unusual deals only" },
      { value: 4, label: "Rarely", description: "Clear guidelines, few exceptions" },
    ],
  },
  {
    id: "pricing-consistency",
    category: "pricing",
    question: "If two reps quoted the same customer, would they give the same price?",
    options: [
      { value: 1, label: "Definitely not", description: "Pricing is rep-dependent" },
      { value: 2, label: "Probably not", description: "Some variation expected" },
      { value: 3, label: "Usually yes", description: "Guidelines keep it close" },
      { value: 4, label: "Yes, always", description: "Pricing is systematic" },
    ],
  },

  // Operations
  {
    id: "demand-forecasting",
    category: "operations",
    question: "How do you forecast demand?",
    options: [
      { value: 1, label: "Last year plus a %", description: "Simple trending" },
      { value: 2, label: "Spreadsheet models", description: "Manual analysis" },
      { value: 3, label: "ERP forecasting", description: "System-assisted" },
      { value: 4, label: "Demand planning software", description: "ML/statistical models" },
    ],
  },
  {
    id: "system-count",
    category: "operations",
    question: "How many systems do you log into daily for operational visibility?",
    options: [
      { value: 1, label: "6+", description: "ERP, WMS, CRM, e-commerce, shipping, accounting..." },
      { value: 2, label: "4-5", description: "Multiple systems for different functions" },
      { value: 3, label: "2-3", description: "Main systems integrated" },
      { value: 4, label: "1-2", description: "Unified view across operations" },
    ],
  },
  {
    id: "inventory-turns",
    category: "operations",
    question: "What's your average inventory turn?",
    options: [
      { value: 1, label: "Don't know", description: "Haven't calculated" },
      { value: 2, label: "Under 4x", description: "Below industry average" },
      { value: 3, label: "4-6x", description: "Industry average" },
      { value: 4, label: "Over 6x", description: "Better than average" },
    ],
  },
];

export interface DistributionScores {
  inventory: number;
  customerProfitability: number;
  pricing: number;
  operations: number;
  total: number;
  tier: "reactive" | "emerging" | "developing" | "optimized";
  recommendations: string[];
}

export function calculateDistributionScores(
  answers: Record<string, number>
): DistributionScores {
  const categoryScores = {
    inventory: 0,
    customerProfitability: 0,
    pricing: 0,
    operations: 0,
  };

  const categoryCounts = {
    inventory: 0,
    customerProfitability: 0,
    pricing: 0,
    operations: 0,
  };

  distributionQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      categoryScores[q.category] += answers[q.id];
      categoryCounts[q.category]++;
    }
  });

  // Normalize to 0-100 scale
  const normalized = {
    inventory: categoryCounts.inventory
      ? Math.round((categoryScores.inventory / (categoryCounts.inventory * 4)) * 100)
      : 0,
    customerProfitability: categoryCounts.customerProfitability
      ? Math.round((categoryScores.customerProfitability / (categoryCounts.customerProfitability * 4)) * 100)
      : 0,
    pricing: categoryCounts.pricing
      ? Math.round((categoryScores.pricing / (categoryCounts.pricing * 4)) * 100)
      : 0,
    operations: categoryCounts.operations
      ? Math.round((categoryScores.operations / (categoryCounts.operations * 4)) * 100)
      : 0,
  };

  const total = Math.round(
    (normalized.inventory +
      normalized.customerProfitability +
      normalized.pricing +
      normalized.operations) / 4
  );

  let tier: DistributionScores["tier"];
  if (total < 35) tier = "reactive";
  else if (total < 55) tier = "emerging";
  else if (total < 75) tier = "developing";
  else tier = "optimized";

  // Generate recommendations based on lowest scores
  const recommendations: string[] = [];
  const sortedCategories = Object.entries(normalized).sort((a, b) => a[1] - b[1]);

  sortedCategories.slice(0, 2).forEach(([category]) => {
    switch (category) {
      case "inventory":
        recommendations.push("Get visibility into dead stock and inventory turns to free up working capital");
        break;
      case "customerProfitability":
        recommendations.push("Build true customer profitability analytics including cost-to-serve to focus on customers who actually make you money");
        break;
      case "pricing":
        recommendations.push("Implement pricing visibility so reps see margin before they quote and stop giving away margin");
        break;
      case "operations":
        recommendations.push("Connect your systems so you have one source of truth instead of logging into six places");
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
    description: "You're making decisions without the data to back them up. Customer profitability is invisible, pricing is inconsistent, and inventory ties up cash you could use for growth. The good news: even basic visibility improvements can free up significant working capital.",
    nextSteps: [
      "Start with customer profitability. Find out who's actually making you money.",
      "Get dead stock visibility to identify quick inventory wins",
    ],
  },
  emerging: {
    title: "Getting Started",
    description: "You have some visibility but significant gaps remain. Most distributors at this stage are leaving 2-5% margin on the table through pricing inconsistency alone. Focus on the quick wins first.",
    nextSteps: [
      "Implement pricing guardrails so reps see margin before quoting",
      "Build a dead stock report that runs automatically",
    ],
  },
  developing: {
    title: "Building Momentum",
    description: "Your basics are solid. You know where most problems are. Now you can start optimizing. Focus on connecting the remaining dots and getting proactive rather than reactive.",
    nextSteps: [
      "Move from reports to alerts that surface problems before they happen",
      "Add demand forecasting that goes beyond 'last year plus 10%'",
    ],
  },
  optimized: {
    title: "Competing on Data",
    description: "You're ahead of most mid-sized distributors. Your systems talk to each other and you have real visibility. Look for the next level: AI-powered forecasting, dynamic pricing, and predictive analytics.",
    nextSteps: [
      "Explore AI-powered demand forecasting",
      "Consider dynamic pricing optimization",
    ],
  },
};
