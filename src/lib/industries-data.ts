import type { Industry } from "@/types";

export interface IndustryWithCta extends Industry {
  ctaText?: string;
  ctaHref?: string;
  ctaSubtext?: string;
}

export const industries: IndustryWithCta[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Operational visibility, multi-location analytics, and compliance for healthcare organizations and medical practices.",
    icon: "heart",
    lottie: "https://assets-v2.lottiefiles.com/a/af48f918-9287-11ee-bb1c-a3b82955ab60/nqEGHcwwS8.json",
    ctaText: "Get Your Price Benchmark",
    ctaHref: "/assessments/healthcare-benchmark",
    ctaSubtext: "See how your pricing compares to competitors",
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "Portfolio intelligence, unified property data, and tenant analytics for property managers and investors.",
    icon: "building",
    lottie: "https://assets-v2.lottiefiles.com/a/e20d1a6e-1172-11ee-a517-eb92b655a009/qis2Im71W1.json",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Sales intelligence, production visibility, and operational analytics for scale-up manufacturers.",
    icon: "factory",
    lottie: "https://assets-v2.lottiefiles.com/a/20d6948e-118a-11ee-823d-0b503ca393bf/7EfiHzAhW4.json",
    ctaText: "Take the Readiness Assessment",
    ctaHref: "/assessments/manufacturing",
    ctaSubtext: "5-minute assessment for scale-up manufacturers",
  },
];

export const industryContent: Record<string, {
  challenges: string[];
  solutions: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
}> = {
  "healthcare": {
    challenges: [
      "Data siloed across multiple facilities and systems",
      "No visibility into operational performance",
      "Compliance requirements add complexity",
      "Patient experience inconsistent across locations",
    ],
    solutions: [
      { title: "Multi-Location Visibility", description: "Unified view across all facilities and departments." },
      { title: "Operational Analytics", description: "Track patient flow, wait times, and staff productivity." },
      { title: "Compliance Automation", description: "HIPAA-compliant data handling built into everything." },
    ],
    useCases: [
      { title: "Facility Benchmarking", description: "Compare performance across locations to identify best practices." },
      { title: "Capacity Optimization", description: "Maximize resource utilization and reduce patient wait times." },
      { title: "Patient Journey Analytics", description: "Understand and improve the patient experience." },
    ],
  },
  "commercial-real-estate": {
    challenges: [
      "Property data scattered across spreadsheets and systems",
      "No single view of portfolio performance",
      "Tenant relationships tracked inconsistently",
      "Due diligence takes too long",
    ],
    solutions: [
      { title: "Portfolio Intelligence", description: "Unified view of all properties, tenants, and financials." },
      { title: "Market Analytics", description: "Compare your portfolio to market benchmarks." },
      { title: "Due Diligence Automation", description: "Accelerate acquisitions with automated data validation." },
    ],
    useCases: [
      { title: "Rent Roll Analysis", description: "Understand lease expirations and renewal probabilities." },
      { title: "Property Comparison", description: "Compare properties across your portfolio on any dimension." },
      { title: "Investor Reporting", description: "Generate accurate reports without manual data gathering." },
    ],
  },
  "manufacturing": {
    challenges: [
      "Sales and production data don't connect",
      "No visibility into true costs",
      "Quality issues discovered too late",
      "Forecasting relies on gut feel",
    ],
    solutions: [
      { title: "Sales Intelligence", description: "Connect CRM data to production for accurate forecasting." },
      { title: "Production Visibility", description: "Real-time view into production status and bottlenecks." },
      { title: "Quality Analytics", description: "Spot quality trends before they become problems." },
    ],
    useCases: [
      { title: "Demand Forecasting", description: "Predict demand based on sales pipeline and historical patterns." },
      { title: "Cost Analysis", description: "Understand true product costs including hidden overhead." },
      { title: "Supplier Performance", description: "Track and compare supplier quality and reliability." },
    ],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
