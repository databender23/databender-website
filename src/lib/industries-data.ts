import type { Industry } from "@/types";

export interface IndustryWithCta extends Industry {
  ctaText?: string;
  ctaHref?: string;
  ctaSubtext?: string;
}

export const industries: IndustryWithCta[] = [
  {
    slug: "legal",
    title: "Legal",
    description: "Knowledge management, client intelligence, and business development tools for law firms that want results, not more software.",
    icon: "scale",
    ctaText: "Download Free Guides",
    ctaHref: "/industries/legal#guides",
    ctaSubtext: "Practical resources for forward-thinking firms",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Operational visibility, multi-location analytics, and compliance for healthcare organizations and medical practices.",
    icon: "heart",
    lottie: "/animations/healthcare-industry.json",
    ctaText: "Get Your Price Benchmark",
    ctaHref: "/assessments/healthcare-benchmark",
    ctaSubtext: "See how your pricing compares to competitors",
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "Portfolio intelligence, unified property data, and tenant analytics for property managers and investors.",
    icon: "building",
    lottie: "/animations/commercial-real-estate.json",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Sales intelligence, production visibility, and operational analytics for scale-up manufacturers.",
    icon: "factory",
    lottie: "/animations/manufacturing-industry.json",
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
      "Each facility has its own systems. Nothing connects.",
      "You find out about operational problems weeks after they happen",
      "HIPAA adds friction to every data project",
      "Patient experience varies wildly by location",
    ],
    solutions: [
      { title: "Multi-Location Visibility", description: "One dashboard for all facilities. Compare any location on any metric." },
      { title: "Operational Analytics", description: "Patient flow, wait times, staff productivity. Updated daily, not monthly." },
      { title: "Compliance Automation", description: "HIPAA controls baked into every pipeline. Auditors see exactly what they need." },
    ],
    useCases: [
      { title: "Facility Benchmarking", description: "Which locations run efficiently? Which are struggling? Now you'll know." },
      { title: "Capacity Optimization", description: "Spot bottlenecks before patients feel them." },
      { title: "Patient Journey Analytics", description: "Track the patient experience from intake to follow-up." },
    ],
  },
  "commercial-real-estate": {
    challenges: [
      "Property data lives in spreadsheets, Yardi, and email threads",
      "Getting a portfolio-wide view means hours of manual work",
      "Tenant relationship history disappears when brokers leave",
      "Due diligence drags on because data is never ready",
    ],
    solutions: [
      { title: "Portfolio Intelligence", description: "Every property, tenant, and lease. One place, always current." },
      { title: "Market Analytics", description: "See where you're beating the market and where you're leaving money." },
      { title: "Due Diligence Automation", description: "Pull acquisition data in hours instead of weeks." },
    ],
    useCases: [
      { title: "Rent Roll Analysis", description: "Which leases expire when? What's the renewal probability? Know before tenants do." },
      { title: "Property Comparison", description: "Compare NOI, occupancy, or any metric across your portfolio." },
      { title: "Investor Reporting", description: "Quarterly reports that pull from live data. No scramble at the end of the quarter." },
    ],
  },
  "manufacturing": {
    challenges: [
      "Sales closes a deal, production learns about it a week later",
      "True product costs are a mystery. Overhead hides everywhere.",
      "Quality issues show up after the batch ships",
      "Demand forecasting is mostly guesswork",
    ],
    solutions: [
      { title: "Sales Intelligence", description: "Pipeline data feeds directly into production planning. No surprises." },
      { title: "Production Visibility", description: "See what's running, what's stuck, and why. Updated every shift." },
      { title: "Quality Analytics", description: "Catch quality drift early. Know which machines, shifts, and suppliers cause problems." },
    ],
    useCases: [
      { title: "Demand Forecasting", description: "Blend pipeline data with seasonal patterns. Plan capacity with confidence." },
      { title: "Cost Analysis", description: "Full product costing: materials, labor, and the overhead nobody tracks." },
      { title: "Supplier Performance", description: "Which suppliers deliver on time? Which cause rework? Now you'll have the data." },
    ],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
