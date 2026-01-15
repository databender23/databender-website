import type { Metadata } from "next";
import HealthcareBenchmarkClient from "./HealthcareBenchmarkClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Healthcare Price Transparency Benchmark | Compare Your Pricing",
  description:
    "See how your healthcare pricing compares to competitors in your market. Get a preview of your competitive position with our free benchmark tool.",
  keywords: [
    "healthcare price transparency",
    "healthcare pricing benchmark",
    "medical pricing comparison",
    "healthcare competitive analysis",
    "price transparency compliance",
    "healthcare market analysis",
    "payer rate comparison",
  ],
  openGraph: {
    title: "Healthcare Price Transparency Benchmark | Compare Your Pricing",
    description:
      "See how your healthcare pricing compares to competitors in your market. Get a preview of your competitive position with our free benchmark tool.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Healthcare Price Transparency Benchmark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Price Transparency Benchmark | Compare Your Pricing",
    description:
      "See how your healthcare pricing compares to competitors in your market with our free benchmark tool.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/healthcare-benchmark",
  },
};

export default function HealthcareBenchmarkPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Healthcare Price Benchmark", url: "/assessments/healthcare-benchmark" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <HealthcareBenchmarkClient />
    </>
  );
}
