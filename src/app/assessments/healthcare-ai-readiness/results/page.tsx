import type { Metadata } from "next";
import HealthcareAIReadinessResultsClient from "./HealthcareAIReadinessResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Healthcare AI Readiness Results | Databender",
  description:
    "View your personalized Healthcare AI Readiness Assessment results with recommendations tailored to your organization.",
  openGraph: {
    title: "Your Healthcare AI Readiness Results | Databender",
    description:
      "View your personalized Healthcare AI Readiness Assessment results with recommendations tailored to your organization.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Healthcare AI Readiness Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Healthcare AI Readiness Results | Databender",
    description:
      "View your personalized Healthcare AI Readiness Assessment results with recommendations tailored to your organization.",
    images: ["/images/databender-og.png"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/healthcare-ai-readiness/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HealthcareAIReadinessResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Healthcare AI Readiness", url: "/assessments/healthcare-ai-readiness" },
    { name: "Results", url: "/assessments/healthcare-ai-readiness/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <HealthcareAIReadinessResultsClient />
    </>
  );
}
