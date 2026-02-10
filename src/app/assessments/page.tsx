import type { Metadata } from "next";
import AssessmentsClient from "./AssessmentsClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Assessments | Data Maturity & AI Readiness Diagnostics",
  description:
    "Free 5-minute assessments for data maturity and AI readiness. Healthcare, legal, manufacturing, CRE, and more. Get personalized recommendations instantly.",
  keywords: [
    "data maturity assessment",
    "AI readiness assessment",
    "free data diagnostic",
    "business intelligence assessment",
    "data strategy evaluation",
    "digital transformation assessment",
  ],
  openGraph: {
    title: "Free Assessments | Data Maturity & AI Readiness Diagnostics",
    description:
      "Free 5-minute assessments for data maturity and AI readiness. Healthcare, legal, manufacturing, CRE, and more. Get personalized recommendations instantly.",
    type: "website",
    url: "https://databender.co/assessments",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Free Assessments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Assessments | Data Maturity & AI Readiness Diagnostics",
    description:
      "Free diagnostic tools to understand your data maturity and AI readiness. Get personalized recommendations in minutes.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments",
  },
};

export default function AssessmentsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <AssessmentsClient />
    </>
  );
}
