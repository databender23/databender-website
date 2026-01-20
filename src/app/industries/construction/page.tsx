import type { Metadata } from "next";
import ConstructionPageClient from "./ConstructionPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & Analytics for Construction Companies",
  description:
    "Connect your estimating, scheduling, field apps, and accounting into one dashboard. See real-time margins, catch cost overruns early, and stop losing money on unbilled change orders.",
  keywords: [
    "construction analytics",
    "construction data integration",
    "project visibility dashboard",
    "job costing analytics",
    "change order tracking",
    "construction business intelligence",
    "Procore integration",
    "Sage 300 integration",
    "construction reporting",
    "contractor analytics",
    "real-time project margins",
    "construction cost tracking",
    "general contractor data",
    "specialty contractor analytics",
    "construction profit visibility",
  ],
  openGraph: {
    title: "Data & Analytics for Construction Companies",
    description:
      "Connect your estimating, scheduling, field apps, and accounting into one dashboard. See real-time margins, catch cost overruns early, and stop losing money on unbilled change orders.",
    type: "website",
    url: "https://databender.co/industries/construction",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Construction Data & Analytics Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & Analytics for Construction Companies",
    description:
      "Connect your estimating, scheduling, field apps, and accounting into one dashboard. See real-time margins, catch cost overruns early, and stop losing money on unbilled change orders.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/construction",
  },
};

export default function ConstructionIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Construction", url: "/industries/construction" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ConstructionPageClient />
    </>
  );
}
