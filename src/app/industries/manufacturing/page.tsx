import type { Metadata } from "next";
import ManufacturingPageClient from "./ManufacturingPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, industryServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & AI for Scale-Up Manufacturers",
  description:
    "Databender builds purpose-built data and AI solutions for mid-sized manufacturers. Support 20% more volume without adding headcount. Orders, production, and shipments unified. Spec lookups in seconds. On-premise AI that keeps your competitive data private.",
  keywords: [
    "manufacturing AI",
    "industrial data analytics",
    "manufacturing operational visibility",
    "supply chain visibility",
    "product spec search",
    "manufacturing productivity",
    "private AI manufacturing",
    "on-premise AI",
    "manufacturing data consulting",
    "ERP integration manufacturing",
    "scale-up manufacturer analytics",
    "manufacturing custom software",
  ],
  openGraph: {
    title: "Data & AI for Scale-Up Manufacturers",
    description:
      "Databender builds purpose-built data and AI solutions for mid-sized manufacturers. 20% more volume without adding headcount. Orders, production, and shipments in one place.",
    type: "website",
    url: "https://databender.co/industries/manufacturing",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Manufacturing Data & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI for Scale-Up Manufacturers",
    description:
      "Databender builds purpose-built data and AI solutions for mid-sized manufacturers. 20% more volume without adding headcount. Orders, production, and shipments in one place.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/manufacturing",
  },
};

const faqs = [
  {
    question: "Our ERP already does this.",
    answer: "Your ERP excels at transactions. We unlock the 'so what?' by combining ERP data with what it can't see: supplier performance and cross-system patterns that predict problems. We read from your ERP, we don't replace it.",
  },
  {
    question: "We don't have IT staff to manage this.",
    answer: "Most manufacturers your size don't. That's exactly who we built this for. We handle the technical work. Your plant managers use the applications.",
  },
  {
    question: "Implementation will disrupt production.",
    answer: "We read data. We don't write to your systems. Zero production impact. Applications appear when they're ready.",
  },
  {
    question: "How long does implementation take?",
    answer: "Read-only connections in weeks 1-2. First live application by week 3-4. Full operational visibility by week 8-12. We read data, we don't write to your systems. Zero production impact. Works with NetSuite, Epicor, SAP Business One, Infor, JobBOSS, and Global Shop Solutions.",
  },
];

const industryService = {
  name: "Data & AI Solutions for Manufacturers",
  description: "Purpose-built data infrastructure and AI for scale-up manufacturers. Operational visibility, spec search, and cross-system analytics. On-premise deployment keeps competitive data private.",
  slug: "manufacturing",
  serviceTypes: ["Operational Analytics", "Data Integration", "Manufacturing AI", "ERP Integration"],
  audience: "Scale-up manufacturers with $15-75M revenue, often PE-backed",
};

export default function ManufacturingIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Manufacturing", url: "/industries/manufacturing" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={industryServiceSchema(industryService)} />
      <ManufacturingPageClient />
    </>
  );
}
