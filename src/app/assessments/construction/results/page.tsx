import type { Metadata } from "next";
import ConstructionResultsClient from "./ConstructionResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Construction Assessment Results | Databender",
  description:
    "View your personalized Construction Data Readiness Assessment results with recommendations tailored to your company's visibility gaps.",
  openGraph: {
    title: "Your Construction Assessment Results | Databender",
    description:
      "View your personalized Construction Data Readiness Assessment results with recommendations tailored to your company.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Construction Assessment Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Construction Assessment Results | Databender",
    description:
      "View your personalized Construction Data Readiness Assessment results with recommendations tailored to your company.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/construction/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConstructionResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Construction", url: "/assessments/construction" },
    { name: "Results", url: "/assessments/construction/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ConstructionResultsClient />
    </>
  );
}
