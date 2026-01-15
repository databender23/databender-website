import type { Metadata } from "next";
import DataAIReadinessResultsClient from "./DataAIReadinessResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Data & AI Readiness Results | Databender",
  description:
    "View your personalized Data & AI Readiness Assessment results with recommendations tailored to your organization's data maturity level.",
  openGraph: {
    title: "Your Data & AI Readiness Results | Databender",
    description:
      "View your personalized Data & AI Readiness Assessment results with recommendations tailored to your organization.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Data & AI Readiness Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Data & AI Readiness Results | Databender",
    description:
      "View your personalized Data & AI Readiness Assessment results with recommendations tailored to your organization.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/data-ai-readiness/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DataAIReadinessResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Data & AI Readiness", url: "/assessments/data-ai-readiness" },
    { name: "Results", url: "/assessments/data-ai-readiness/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <DataAIReadinessResultsClient />
    </>
  );
}
