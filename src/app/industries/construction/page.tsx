import type { Metadata } from "next";
import ConstructionPageClient from "./ConstructionPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, industryServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & AI for Construction Companies",
  description:
    "Databender builds purpose-built analytics for general and specialty contractors. Connect Procore, Sage, and field apps into one view. See real-time margins, catch cost overruns early, and stop losing money on unbilled change orders.",
  keywords: [
    "construction analytics",
    "construction data integration",
    "construction AI",
    "project visibility application",
    "job costing analytics",
    "change order tracking",
    "construction business intelligence",
    "Procore integration",
    "Sage 300 integration",
    "construction reporting",
    "contractor analytics",
    "real-time project margins",
    "construction cost tracking",
    "general contractor data",
    "specialty contractor analytics",
    "construction profit visibility",
    "construction custom software",
  ],
  openGraph: {
    title: "Data & AI for Construction Companies",
    description:
      "Databender builds purpose-built analytics for contractors. Connect Procore, Sage, and field apps into one view. Real-time margins, cost overrun alerts, and change order recovery.",
    type: "website",
    url: "https://databender.co/industries/construction",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Construction Data & Analytics Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI for Construction Companies",
    description:
      "Databender builds purpose-built analytics for contractors. Connect Procore, Sage, and field apps into one view. Real-time margins, cost overrun alerts, and change order recovery.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/construction",
  },
};

const faqs = [
  {
    question: "Doesn't Procore already do this?",
    answer: "Procore excels at project execution: RFIs, drawings, daily logs. We're the analytics layer that connects Procore to your accounting system and field apps. Think of us as the visibility that makes your Procore investment work harder. Real-time margin, not 15-minute-old data.",
  },
  {
    question: "Our PMs won't use another system.",
    answer: "They don't have to. Your PMs keep using Procore and their existing tools. We surface insights from data that's already being entered. The only change for field staff? Their good work becomes visible to leadership.",
  },
  {
    question: "Our data is a mess.",
    answer: "We hear that from almost every contractor. Here's what we find: your data is better than you think. It's just scattered across systems. Part of onboarding is a data audit where we tell you exactly what's possible with what you have.",
  },
  {
    question: "How long does implementation take?",
    answer: "Read-only connections in weeks 1-2. First live application by week 3-4. Full visibility by week 8-12. We read data, we don't write to your systems. Zero production impact. Works with Procore, Sage, Vista, QuickBooks, and field apps.",
  },
];

const industryService = {
  name: "Data & AI Solutions for Construction Companies",
  description: "Purpose-built analytics for general and specialty contractors. Job visibility, change order recovery, and cash flow tracking. Connects Procore, Sage, Vista, and field apps into one view.",
  slug: "construction",
  serviceTypes: ["Construction Analytics", "Project Visibility", "Data Integration", "Custom Software"],
  audience: "General and specialty contractors, PE-backed construction firms",
};

export default function ConstructionIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Construction", url: "/industries/construction" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={industryServiceSchema(industryService)} />
      <ConstructionPageClient />
    </>
  );
}
