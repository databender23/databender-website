import type { Metadata } from "next";
import DealIntelligenceClient from "./DealIntelligenceClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Deal Intelligence Assessment | Commercial Real Estate",
  description:
    "Free 4-minute assessment for CRE brokers and investors. See how fast you're finding owners, reviewing data rooms, and prioritizing your pipeline.",
  keywords: [
    "CRE deal intelligence",
    "ownership research assessment",
    "due diligence efficiency",
    "deal pipeline assessment",
    "CRE broker tools",
    "property ownership data",
    "commercial real estate AI",
  ],
  openGraph: {
    title: "Deal Intelligence Assessment | Commercial Real Estate",
    description:
      "Free 4-minute assessment for CRE brokers and investors. See how fast you're finding owners, reviewing data rooms, and prioritizing your pipeline.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CRE Deal Intelligence Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deal Intelligence Assessment | Commercial Real Estate",
    description:
      "Free 4-minute assessment for CRE brokers and investors. See how fast you're finding owners and prioritizing deals.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/deal-intelligence",
  },
};

export default function DealIntelligenceAssessmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Deal Intelligence", url: "/assessments/deal-intelligence" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <DealIntelligenceClient />
    </>
  );
}
