import type { Metadata } from "next";
import LegalResultsClient from "./LegalResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Legal AI Readiness Results | Databender",
  description:
    "View your personalized Legal AI Readiness Assessment results with recommendations tailored to your firm.",
  openGraph: {
    title: "Your Legal AI Readiness Results | Databender",
    description:
      "View your personalized Legal AI Readiness Assessment results with recommendations tailored to your firm.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Legal AI Readiness Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Legal AI Readiness Results | Databender",
    description:
      "View your personalized Legal AI Readiness Assessment results with recommendations tailored to your firm.",
    images: ["/images/databender-og.png"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/legal/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Legal AI Readiness", url: "/assessments/legal" },
    { name: "Results", url: "/assessments/legal/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <LegalResultsClient />
    </>
  );
}
