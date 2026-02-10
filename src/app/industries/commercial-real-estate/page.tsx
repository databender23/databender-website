import type { Metadata } from "next";
import CREPageClient from "./CREPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, industryServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & AI for Commercial Real Estate",
  description:
    "Databender builds AI solutions for CRE brokers and property managers. Untangle complex ownership structures, speed up due diligence, unify portfolio data across systems, and identify off-market opportunities before competitors.",
  keywords: [
    "commercial real estate AI",
    "CRE data analytics",
    "property ownership resolution",
    "due diligence automation",
    "deal prioritization",
    "off-market opportunities",
    "LLC ownership tracing",
    "data room review",
    "CRE lead scoring",
    "real estate data consulting",
    "portfolio analytics CRE",
    "investor reporting automation",
    "property management analytics",
    "entity resolution real estate",
  ],
  openGraph: {
    title: "Data & AI for Commercial Real Estate",
    description:
      "Databender builds AI for CRE brokers and property managers. Entity resolution, due diligence automation, portfolio visibility, and investor reporting. Data stays on your servers.",
    type: "website",
    url: "https://databender.co/industries/commercial-real-estate",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender CRE Data & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI for Commercial Real Estate",
    description:
      "Databender builds AI for CRE brokers and property managers. Entity resolution, due diligence automation, portfolio visibility, and investor reporting. Data stays on your servers.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/commercial-real-estate",
  },
};

const faqs = [
  {
    question: "Yardi (or MRI, or AppFolio) already does this.",
    answer: "Those are excellent property management systems, and we don't replace them. They excel at managing individual properties but can't see across systems. We create the unified layer that connects everything while you keep your existing PM systems.",
  },
  {
    question: "CoStar already has ownership data.",
    answer: "CoStar is great for market data. Ownership is different. Appraisers cite 'less than 50% accuracy' on CoStar ownership. We verify through entity resolution, not just data aggregation. We tell you who to call, not just who might own it.",
  },
  {
    question: "Our data is a mess. We're not ready.",
    answer: "Messy data isn't a barrier. It's where we start. We cleaned 1.69M records from exactly this kind of mess. Data cleanup is our foundation, not your prerequisite.",
  },
  {
    question: "How long until we see results?",
    answer: "Brokers: first verified owner list in 3-4 weeks. Property managers: first unified application in 3-4 weeks, reporting automation by week 8. We prove value before the big commitment.",
  },
];

const industryService = {
  name: "Data & AI Solutions for Commercial Real Estate",
  description: "Entity resolution, due diligence automation, portfolio analytics, and investor reporting for CRE brokers and property managers. We cleaned 1.69M ownership records for one client.",
  slug: "commercial-real-estate",
  serviceTypes: ["Entity Resolution", "Due Diligence Automation", "Portfolio Analytics", "Investor Reporting"],
  audience: "CRE brokers, investors, and property managers with 5-50 properties",
};

export default function CREIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Commercial Real Estate", url: "/industries/commercial-real-estate" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={industryServiceSchema(industryService)} />
      <CREPageClient />
    </>
  );
}
