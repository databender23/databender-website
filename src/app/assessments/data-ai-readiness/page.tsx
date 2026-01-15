import type { Metadata } from "next";
import DataAIReadinessClient from "./DataAIReadinessClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & AI Readiness Assessment | Free 10-Minute Diagnostic",
  description:
    "Discover if your organization is ready for AI. Answer 10 questions and get a personalized roadmap based on your current data maturity level.",
  keywords: [
    "AI readiness assessment",
    "data maturity assessment",
    "AI readiness score",
    "data infrastructure evaluation",
    "business intelligence readiness",
    "digital transformation assessment",
    "data strategy diagnostic",
  ],
  openGraph: {
    title: "Data & AI Readiness Assessment | Free 10-Minute Diagnostic",
    description:
      "Discover if your organization is ready for AI. Answer 10 questions and get a personalized roadmap based on your current data maturity level.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Data & AI Readiness Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI Readiness Assessment | Free 10-Minute Diagnostic",
    description:
      "Discover if your organization is ready for AI. Answer 10 questions and get a personalized roadmap.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/data-ai-readiness",
  },
};

export default function DataAIReadinessPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Data & AI Readiness", url: "/assessments/data-ai-readiness" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <DataAIReadinessClient />
    </>
  );
}
