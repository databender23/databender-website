import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "professional-services",
    title: "Professional Services",
    description: "Knowledge management, client intelligence, and firm analytics for law firms, consultancies, and accounting practices.",
    icon: "briefcase",
    lottie: "https://assets-v2.lottiefiles.com/a/2ca3b0dc-1165-11ee-a42a-1bb603ea05bf/mWA5LyrC45.json",
    subIndustries: [
      {
        slug: "legal",
        title: "Legal",
        description: "Matter management, client intelligence, and compliance for law firms.",
        parentSlug: "professional-services",
      },
      {
        slug: "accounting",
        title: "Accounting & CPA",
        description: "Client analytics, engagement tracking, and practice management.",
        parentSlug: "professional-services",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Operational visibility, multi-location analytics, and compliance for healthcare organizations and medical practices.",
    icon: "heart",
    lottie: "/animations/healthcare.json",
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
    lottie: "/animations/manufacturing.json",
  },
];

export const industryContent: Record<string, {
  challenges: string[];
  solutions: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
}> = {
  "professional-services": {
    challenges: [
      "Knowledge trapped in individual inboxes and documents",
      "Client relationships not visible across the firm",
      "Manual tracking of matter status and profitability",
      "Difficulty identifying cross-selling opportunities",
    ],
    solutions: [
      { title: "Knowledge Management", description: "Centralize firm knowledge and make it searchable across all matters." },
      { title: "Client Intelligence", description: "360-degree view of client relationships across all partners and practices." },
      { title: "Firm Analytics", description: "Track utilization, profitability, and pipeline in real-time." },
    ],
    useCases: [
      { title: "Matter Profitability", description: "See which matters are profitable and which are draining resources." },
      { title: "Client Expansion", description: "Identify which clients are good candidates for additional services." },
      { title: "Resource Planning", description: "Forecast workload and staff needs based on pipeline." },
    ],
  },
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
