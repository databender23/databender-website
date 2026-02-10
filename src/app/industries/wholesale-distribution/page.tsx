import type { Metadata } from "next";
import WholesaleDistributionPageClient from "./WholesaleDistributionPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, industryServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & AI for Wholesale Distributors",
  description:
    "Databender builds purpose-built analytics for mid-sized distributors. Free up cash tied in inventory, see true customer profitability, and stop giving away margin. Compete with the nationals using your own data.",
  keywords: [
    "distribution analytics",
    "wholesale data integration",
    "wholesale distribution AI",
    "inventory optimization",
    "customer profitability analysis",
    "pricing analytics",
    "distribution business intelligence",
    "ERP integration",
    "distributor applications",
    "inventory management",
    "demand forecasting",
    "dead stock reduction",
    "margin analysis",
    "sales rep analytics",
    "wholesale distribution data",
    "distributor reporting",
    "distributor custom software",
  ],
  openGraph: {
    title: "Data & AI for Wholesale Distributors",
    description:
      "Databender builds purpose-built analytics for mid-sized distributors. Inventory intelligence, customer profitability, and pricing discipline. Compete with the nationals using your own data.",
    type: "website",
    url: "https://databender.co/industries/wholesale-distribution",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Wholesale Distribution Data & Analytics Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI for Wholesale Distributors",
    description:
      "Databender builds purpose-built analytics for mid-sized distributors. Inventory intelligence, customer profitability, and pricing discipline. Compete with the nationals using your own data.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/wholesale-distribution",
  },
};

const faqs = [
  {
    question: "Our ERP already does this.",
    answer: "ERPs capture data but don't deliver insights. We add cross-system visibility your ERP wasn't designed to provide.",
  },
  {
    question: "We don't have time for another system.",
    answer: "First deliverable in 4-6 weeks. We work around your busy season. No disruption to operations.",
  },
  {
    question: "Our data isn't good enough.",
    answer: "We've worked with messy data before. Perfect data isn't required. Knowing where to start is.",
  },
  {
    question: "Our sales reps won't use it.",
    answer: "We build for adoption. Tools that save time, not add data entry. If it doesn't make their job easier, we've failed.",
  },
];

const industryService = {
  name: "Data & AI Solutions for Wholesale Distributors",
  description: "Inventory intelligence, customer profitability analysis, and pricing discipline for mid-sized distributors. Purpose-built analytics that help you compete with Amazon and the nationals.",
  slug: "wholesale-distribution",
  serviceTypes: ["Inventory Analytics", "Customer Profitability", "Pricing Analytics", "Data Integration"],
  audience: "Mid-sized wholesale distributors competing against national chains",
};

export default function WholesaleDistributionIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Wholesale Distribution", url: "/industries/wholesale-distribution" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={industryServiceSchema(industryService)} />
      <WholesaleDistributionPageClient />
    </>
  );
}
