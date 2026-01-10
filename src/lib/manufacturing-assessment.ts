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
    question: "How integrated is your ERP with other business systems?",
    options: [
      { value: 1, label: "Standalone", description: "ERP runs independently, data exported manually" },
      { value: 2, label: "Partially connected", description: "Some systems connected, but gaps exist" },
      { value: 3, label: "Mostly integrated", description: "Most key systems connected with some manual processes" },
      { value: 4, label: "Fully integrated", description: "Real-time data flows between all major systems" },
    ],
  },
  {
    id: "data-quality",
    category: "dataInfrastructure",
    question: "How would you rate your master data quality (customers, products, suppliers)?",
    options: [
      { value: 1, label: "Major issues", description: "Duplicates, inconsistencies, missing data common" },
      { value: 2, label: "Some problems", description: "Known issues but manageable" },
      { value: 3, label: "Generally good", description: "Occasional cleanup needed" },
      { value: 4, label: "Excellent", description: "Clean, consistent, well-governed" },
    ],
  },
  {
    id: "single-source",
    category: "dataInfrastructure",
    question: "Do you have a single source of truth for key business metrics?",
    options: [
      { value: 1, label: "No", description: "Different departments use different numbers" },
      { value: 2, label: "Partially", description: "Some metrics standardized, others not" },
      { value: 3, label: "Mostly", description: "Most KPIs come from one source" },
      { value: 4, label: "Yes", description: "Centralized data warehouse/BI platform for all metrics" },
    ],
  },

  // Sales & Production Connection
  {
    id: "sales-production-link",
    category: "salesProduction",
    question: "How connected are your sales forecasts to production planning?",
    options: [
      { value: 1, label: "Not connected", description: "Sales and production operate independently" },
      { value: 2, label: "Manual handoff", description: "Periodic meetings to share forecasts" },
      { value: 3, label: "Shared visibility", description: "Both can see each other's data" },
      { value: 4, label: "Integrated planning", description: "Real-time S&OP with automated adjustments" },
    ],
  },
  {
    id: "demand-forecasting",
    category: "salesProduction",
    question: "How do you forecast demand?",
    options: [
      { value: 1, label: "Gut feel", description: "Based on experience and intuition" },
      { value: 2, label: "Historical averages", description: "Simple trending from past sales" },
      { value: 3, label: "Spreadsheet models", description: "More sophisticated but manual analysis" },
      { value: 4, label: "Predictive analytics", description: "ML/AI-powered forecasting with multiple inputs" },
    ],
  },
  {
    id: "cost-visibility",
    category: "salesProduction",
    question: "How accurate is your product costing?",
    options: [
      { value: 1, label: "Rough estimates", description: "Standard costs rarely updated" },
      { value: 2, label: "Periodic updates", description: "Costs reviewed quarterly/annually" },
      { value: 3, label: "Good visibility", description: "Regular updates, most costs captured" },
      { value: 4, label: "Real-time costing", description: "Actual costs tracked with overhead allocation" },
    ],
  },

  // Operational Visibility
  {
    id: "production-visibility",
    category: "visibility",
    question: "How real-time is your production visibility?",
    options: [
      { value: 1, label: "End of day/week", description: "Reports after the fact" },
      { value: 2, label: "Same day", description: "Know status by end of shift" },
      { value: 3, label: "Near real-time", description: "Updates every few hours" },
      { value: 4, label: "Real-time", description: "Live dashboards with machine data" },
    ],
  },
  {
    id: "quality-tracking",
    category: "visibility",
    question: "How do you track and analyze quality issues?",
    options: [
      { value: 1, label: "Paper-based", description: "Manual logs and inspection sheets" },
      { value: 2, label: "Basic digital", description: "Spreadsheets or simple database" },
      { value: 3, label: "QMS software", description: "Dedicated quality management system" },
      { value: 4, label: "Integrated analytics", description: "Real-time quality metrics with trend analysis" },
    ],
  },
  {
    id: "kpi-access",
    category: "visibility",
    question: "How easily can managers access key operational KPIs?",
    options: [
      { value: 1, label: "Request reports", description: "Need to ask someone to pull data" },
      { value: 2, label: "Static reports", description: "Scheduled reports delivered periodically" },
      { value: 3, label: "Self-service", description: "Can access dashboards but limited customization" },
      { value: 4, label: "Full self-service", description: "Interactive dashboards with drill-down capabilities" },
    ],
  },

  // Automation & AI Readiness
  {
    id: "process-automation",
    category: "automation",
    question: "What level of process automation do you have?",
    options: [
      { value: 1, label: "Mostly manual", description: "Key processes require human intervention" },
      { value: 2, label: "Some automation", description: "Basic workflows automated" },
      { value: 3, label: "Significant automation", description: "Many processes automated with exceptions" },
      { value: 4, label: "Highly automated", description: "End-to-end automation with AI/ML elements" },
    ],
  },
  {
    id: "data-team",
    category: "automation",
    question: "Do you have dedicated data/analytics resources?",
    options: [
      { value: 1, label: "No", description: "IT handles data ad-hoc" },
      { value: 2, label: "Part-time", description: "Someone does data work alongside other duties" },
      { value: 3, label: "Small team", description: "1-2 dedicated data analysts" },
      { value: 4, label: "Full team", description: "Data team with analysts, engineers, and/or data scientists" },
    ],
  },
  {
    id: "ai-interest",
    category: "automation",
    question: "What's your current AI/ML adoption?",
    options: [
      { value: 1, label: "Not started", description: "Haven't explored AI applications" },
      { value: 2, label: "Exploring", description: "Researching possibilities" },
      { value: 3, label: "Piloting", description: "One or more AI projects in progress" },
      { value: 4, label: "Production", description: "AI/ML in production for business processes" },
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
        recommendations.push("Prioritize data integration and quality improvements to build a solid foundation");
        break;
      case "salesProduction":
        recommendations.push("Connect sales forecasting with production planning to improve demand accuracy");
        break;
      case "visibility":
        recommendations.push("Invest in real-time dashboards and operational visibility tools");
        break;
      case "automation":
        recommendations.push("Start with high-ROI automation opportunities before advancing to AI");
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
    description: "Your data infrastructure needs foundational work before scaling. Focus on integration and data quality first.",
    nextSteps: [
      "Audit current data sources and identify integration gaps",
      "Establish data governance policies",
      "Create a single source of truth for key metrics",
    ],
  },
  emerging: {
    title: "Emerging",
    description: "You have some data capabilities in place. Now it's time to connect systems and improve visibility.",
    nextSteps: [
      "Integrate ERP with CRM and production systems",
      "Implement self-service dashboards for key stakeholders",
      "Develop demand forecasting capabilities",
    ],
  },
  developing: {
    title: "Developing",
    description: "Your data infrastructure is solid. Focus on advanced analytics and automation opportunities.",
    nextSteps: [
      "Implement predictive analytics for demand and quality",
      "Explore AI/ML use cases for your biggest pain points",
      "Build automated workflows for repetitive processes",
    ],
  },
  advanced: {
    title: "Advanced",
    description: "You're ahead of most manufacturers. Look for competitive advantages through AI and advanced automation.",
    nextSteps: [
      "Deploy production AI/ML models",
      "Implement end-to-end process automation",
      "Explore emerging technologies like digital twins",
    ],
  },
};
