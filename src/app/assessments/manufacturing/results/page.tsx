import type { Metadata } from "next";
import ManufacturingResultsClient from "./ManufacturingResultsClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Your Manufacturing Operations Results | Databender",
  description:
    "View your personalized Manufacturing Operations Assessment results with recommendations tailored to your company's data maturity and operational visibility.",
  openGraph: {
    title: "Your Manufacturing Operations Results | Databender",
    description:
      "View your personalized Manufacturing Operations Assessment results with recommendations tailored to your company.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Manufacturing Operations Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Manufacturing Operations Results | Databender",
    description:
      "View your personalized Manufacturing Operations Assessment results with recommendations tailored to your company.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/manufacturing/results",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ManufacturingResultsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Manufacturing Operations", url: "/assessments/manufacturing" },
    { name: "Results", url: "/assessments/manufacturing/results" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ManufacturingResultsClient />
    </>
  );
}
