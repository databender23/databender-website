import type { Metadata } from "next";
import HealthcareAIReadinessClient from "./HealthcareAIReadinessClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Healthcare AI Readiness Assessment | Document & Knowledge Management",
  description:
    "Free 5-minute assessment for healthcare organizations. Evaluate your document management, knowledge retention, and AI readiness to build a strategic roadmap.",
  openGraph: {
    title: "Healthcare AI Readiness Assessment | Document & Knowledge Management",
    description:
      "Free 5-minute assessment for healthcare organizations. Evaluate your document management, knowledge retention, and AI readiness to build a strategic roadmap.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Healthcare AI Readiness Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare AI Readiness Assessment | Document & Knowledge Management",
    description:
      "Free 5-minute assessment for healthcare organizations. Evaluate your document management, knowledge retention, and AI readiness to build a strategic roadmap.",
    images: ["/images/databender-og.png"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/healthcare-ai-readiness",
  },
};

export default function HealthcareAIReadinessPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Healthcare AI Readiness", url: "/assessments/healthcare-ai-readiness" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <HealthcareAIReadinessClient />
    </>
  );
}
