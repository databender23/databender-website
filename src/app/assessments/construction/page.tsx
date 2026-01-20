import type { Metadata } from "next";
import ConstructionAssessmentClient from "./ConstructionAssessmentClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Construction Data Readiness Assessment | See Where You Stand",
  description:
    "Free 5-minute assessment for growing contractors. Find out if you're leaving money on the table and where better visibility would help most.",
  keywords: [
    "construction assessment",
    "contractor data assessment",
    "construction analytics readiness",
    "job costing visibility",
    "construction technology assessment",
    "project visibility assessment",
    "construction data maturity",
  ],
  openGraph: {
    title: "Construction Data Readiness Assessment | See Where You Stand",
    description:
      "Free 5-minute assessment for growing contractors. Find out if you're leaving money on the table and where better visibility would help most.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Construction Data Readiness Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Data Readiness Assessment | See Where You Stand",
    description:
      "Free 5-minute assessment for growing contractors. Find out if you're leaving money on the table.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/construction",
  },
};

export default function ConstructionAssessmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Construction", url: "/assessments/construction" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ConstructionAssessmentClient />
    </>
  );
}
