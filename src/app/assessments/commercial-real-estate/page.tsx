import type { Metadata } from "next";
import CREClient from "./CREClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio Analytics Assessment | Commercial Real Estate",
  description:
    "Free 5-minute assessment for property managers with 5-50 properties. See where your portfolio analytics stand and what centralized visibility could unlock.",
  keywords: [
    "CRE portfolio analytics",
    "property management assessment",
    "commercial real estate data",
    "portfolio visibility",
    "property analytics",
    "real estate data maturity",
    "investor reporting assessment",
  ],
  openGraph: {
    title: "Portfolio Analytics Assessment | Commercial Real Estate",
    description:
      "Free 5-minute assessment for property managers with 5-50 properties. See where your portfolio analytics stand and what centralized visibility could unlock.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CRE Portfolio Analytics Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Analytics Assessment | Commercial Real Estate",
    description:
      "Free 5-minute assessment for property managers. See where your portfolio analytics stand.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/commercial-real-estate",
  },
};

export default function CREAssessmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Portfolio Analytics", url: "/assessments/commercial-real-estate" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <CREClient />
    </>
  );
}
