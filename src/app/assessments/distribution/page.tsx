import type { Metadata } from "next";
import DistributionClient from "./DistributionClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Distribution Analytics Readiness Assessment | Databender",
  description:
    "Free 5-minute assessment for mid-sized distributors. See where you're leaving margin on the table and cash tied up in inventory.",
  keywords: [
    "distribution assessment",
    "wholesale analytics",
    "inventory optimization",
    "customer profitability",
    "pricing analytics",
    "distribution data maturity",
    "distributor efficiency",
  ],
  openGraph: {
    title: "Distribution Analytics Readiness Assessment | Databender",
    description:
      "Free 5-minute assessment for mid-sized distributors. See where you're leaving margin on the table and cash tied up in inventory.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Distribution Analytics Readiness Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distribution Analytics Readiness Assessment | Databender",
    description:
      "Free 5-minute assessment for mid-sized distributors. See where you're leaving margin on the table.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/distribution",
  },
};

export default function DistributionAssessmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Distribution Analytics", url: "/assessments/distribution" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <DistributionClient />
    </>
  );
}
