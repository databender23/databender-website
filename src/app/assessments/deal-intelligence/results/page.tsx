import type { Metadata } from "next";
import DealIntelligenceResultsClient from "./DealIntelligenceResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Deal Intelligence Results | Databender",
  description:
    "View your personalized CRE Deal Intelligence Assessment results with recommendations to improve ownership research, due diligence, and pipeline prioritization.",
  openGraph: {
    title: "Your Deal Intelligence Results | Databender",
    description:
      "View your personalized CRE Deal Intelligence Assessment results with recommendations for your team.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Deal Intelligence Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Deal Intelligence Results | Databender",
    description:
      "View your personalized CRE Deal Intelligence Assessment results with recommendations for your team.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/deal-intelligence/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DealIntelligenceResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Deal Intelligence", url: "/assessments/deal-intelligence" },
    { name: "Results", url: "/assessments/deal-intelligence/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <DealIntelligenceResultsClient />
    </>
  );
}
