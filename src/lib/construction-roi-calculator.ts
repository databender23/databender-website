// Construction ROI Calculator Logic

export interface ConstructionROIInputs {
  projectCount: number;        // Number of active projects
  avgProjectValue: number;     // Average project value (midpoint)
  unbilledChangeOrderPct: number; // Estimated unbilled change orders %
  reportHoursPerWeek: number;  // Hours spent on report compilation
}

export interface ConstructionROIResults {
  annualRevenue: number;
  potentialRecoveredRevenue: number;
  annualReportingCost: number;
  potentialTimeSavings: number;
  totalAnnualBenefit: number;
  paybackMonths: number;
  implementationCostLow: number;
  implementationCostHigh: number;
}

// Working weeks per year
const WORKING_WEEKS = 50;

// Estimated recovery rate for change orders with better tracking
const CHANGE_ORDER_RECOVERY_RATE = 0.7;

// Estimated time savings from automated reporting
const REPORTING_EFFICIENCY_GAIN = 0.75;

// Blended hourly rate for controller/coordinator time
const ADMIN_HOURLY_RATE = 75;

// Implementation cost range for construction analytics
const IMPLEMENTATION_LOW = 35000;
const IMPLEMENTATION_HIGH = 60000;

export function calculateConstructionROI(inputs: ConstructionROIInputs): ConstructionROIResults {
  // Annual revenue estimate (projects * avg value, assuming ~2 project turns per year for mid-sized)
  const annualRevenue = inputs.projectCount * inputs.avgProjectValue * 1.5;

  // Potential recovered revenue from change orders
  const unbilledAmount = annualRevenue * (inputs.unbilledChangeOrderPct / 100);
  const potentialRecoveredRevenue = Math.round(unbilledAmount * CHANGE_ORDER_RECOVERY_RATE);

  // Annual reporting cost
  const annualReportingCost = inputs.reportHoursPerWeek * WORKING_WEEKS * ADMIN_HOURLY_RATE;
  const potentialTimeSavings = Math.round(annualReportingCost * REPORTING_EFFICIENCY_GAIN);

  // Total annual benefit
  const totalAnnualBenefit = potentialRecoveredRevenue + potentialTimeSavings;

  // Calculate payback period
  const avgImplementationCost = (IMPLEMENTATION_LOW + IMPLEMENTATION_HIGH) / 2;
  const paybackMonths = totalAnnualBenefit > 0
    ? Math.round((avgImplementationCost / totalAnnualBenefit) * 12)
    : 0;

  return {
    annualRevenue: Math.round(annualRevenue),
    potentialRecoveredRevenue,
    annualReportingCost: Math.round(annualReportingCost),
    potentialTimeSavings,
    totalAnnualBenefit,
    paybackMonths: Math.min(paybackMonths, 24), // Cap at 24 months
    implementationCostLow: IMPLEMENTATION_LOW,
    implementationCostHigh: IMPLEMENTATION_HIGH,
  };
}

// Dropdown options
export const projectCountOptions = [
  { label: "5-10 active projects", value: 7 },
  { label: "10-20 active projects", value: 15 },
  { label: "20-35 active projects", value: 27 },
  { label: "35+ active projects", value: 45 },
];

export const avgProjectValueOptions = [
  { label: "$500K - $1M", value: 750000 },
  { label: "$1M - $3M", value: 2000000 },
  { label: "$3M - $7M", value: 5000000 },
  { label: "$7M+", value: 10000000 },
];

export const unbilledChangeOrderOptions = [
  { label: "1-2% (we're pretty good)", value: 1.5 },
  { label: "2-3% (typical)", value: 2.5 },
  { label: "3-5% (room to improve)", value: 4 },
  { label: "5%+ (it's a problem)", value: 6 },
];

export const reportHoursOptions = [
  { label: "4-8 hours/week", value: 6 },
  { label: "8-16 hours/week", value: 12 },
  { label: "16-24 hours/week", value: 20 },
  { label: "24+ hours/week", value: 30 },
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
