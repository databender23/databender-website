// Legal ROI Calculator Logic

export interface ROIInputs {
  attorneyCount: number; // Midpoint of range
  billingRate: number;   // Midpoint of range
  searchHoursPerWeek: number; // Midpoint of range
}

export interface ROIResults {
  weeklySearchCost: number;
  annualSearchCost: number;
  potentialAnnualSavings: number;
  paybackMonths: number;
  implementationCostLow: number;
  implementationCostHigh: number;
}

// Working weeks per year (accounting for holidays, PTO)
const WORKING_WEEKS = 48;

// Estimated efficiency gain from document intelligence
const EFFICIENCY_GAIN = 0.6;

// Implementation cost range
const IMPLEMENTATION_LOW = 30000;
const IMPLEMENTATION_HIGH = 50000;

export function calculateROI(inputs: ROIInputs): ROIResults {
  const weeklySearchCost = inputs.attorneyCount * inputs.searchHoursPerWeek * inputs.billingRate;
  const annualSearchCost = weeklySearchCost * WORKING_WEEKS;
  const potentialAnnualSavings = Math.round(annualSearchCost * EFFICIENCY_GAIN);

  // Calculate payback period using midpoint of implementation cost
  const avgImplementationCost = (IMPLEMENTATION_LOW + IMPLEMENTATION_HIGH) / 2;
  const paybackMonths = Math.round((avgImplementationCost / potentialAnnualSavings) * 12);

  return {
    weeklySearchCost: Math.round(weeklySearchCost),
    annualSearchCost: Math.round(annualSearchCost),
    potentialAnnualSavings,
    paybackMonths,
    implementationCostLow: IMPLEMENTATION_LOW,
    implementationCostHigh: IMPLEMENTATION_HIGH,
  };
}

// Dropdown options with midpoints for calculation
export const attorneyOptions = [
  { label: "10-25 attorneys", value: 17.5 },
  { label: "25-50 attorneys", value: 37.5 },
  { label: "50-75 attorneys", value: 62.5 },
  { label: "75+ attorneys", value: 100 },
];

export const billingRateOptions = [
  { label: "$250-350/hour", value: 300 },
  { label: "$350-450/hour", value: 400 },
  { label: "$450-550/hour", value: 500 },
  { label: "$550+/hour", value: 600 },
];

export const searchHoursOptions = [
  { label: "2-4 hours/week", value: 3 },
  { label: "4-6 hours/week", value: 5 },
  { label: "6-10 hours/week", value: 8 },
  { label: "10+ hours/week", value: 12 },
];

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000)}K`;
  }
  return `$${amount.toLocaleString()}`;
}
