import type { Metadata } from "next";
import DistributionResultsClient from "./DistributionResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Distribution Analytics Results | Databender",
  description:
    "View your personalized Distribution Analytics Assessment results with recommendations tailored to your company's data maturity and operational visibility.",
  openGraph: {
    title: "Your Distribution Analytics Results | Databender",
    description:
      "View your personalized Distribution Analytics Assessment results with recommendations tailored to your company.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Distribution Analytics Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Distribution Analytics Results | Databender",
    description:
      "View your personalized Distribution Analytics Assessment results with recommendations tailored to your company.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/distribution/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DistributionResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Distribution Analytics", url: "/assessments/distribution" },
    { name: "Results", url: "/assessments/distribution/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <DistributionResultsClient />
    </>
  );
}
