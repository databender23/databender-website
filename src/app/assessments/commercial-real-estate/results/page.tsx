import type { Metadata } from "next";
import CREResultsClient from "./CREResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Portfolio Analytics Results | Databender",
  description:
    "View your personalized CRE Portfolio Analytics Assessment results with recommendations to improve portfolio visibility and investor reporting.",
  openGraph: {
    title: "Your Portfolio Analytics Results | Databender",
    description:
      "View your personalized CRE Portfolio Analytics Assessment results with recommendations for your portfolio.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Portfolio Analytics Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Portfolio Analytics Results | Databender",
    description:
      "View your personalized CRE Portfolio Analytics Assessment results with recommendations for your portfolio.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/commercial-real-estate/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CREResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Portfolio Analytics", url: "/assessments/commercial-real-estate" },
    { name: "Results", url: "/assessments/commercial-real-estate/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <CREResultsClient />
    </>
  );
}
