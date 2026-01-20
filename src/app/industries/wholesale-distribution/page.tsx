import type { Metadata } from "next";
import WholesaleDistributionPageClient from "./WholesaleDistributionPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & Analytics for Wholesale Distributors",
  description:
    "Free up cash tied in inventory. See true customer profitability. Stop giving away margin. Data analytics for mid-sized distributors competing against Amazon and the nationals.",
  keywords: [
    "distribution analytics",
    "wholesale data integration",
    "inventory optimization",
    "customer profitability analysis",
    "pricing analytics",
    "distribution business intelligence",
    "ERP integration",
    "distributor dashboards",
    "inventory management",
    "demand forecasting",
    "dead stock reduction",
    "margin analysis",
    "sales rep analytics",
    "wholesale distribution data",
    "distributor reporting",
  ],
  openGraph: {
    title: "Data & Analytics for Wholesale Distributors",
    description:
      "Free up cash tied in inventory. See true customer profitability. Stop giving away margin. Data analytics for mid-sized distributors competing against Amazon and the nationals.",
    type: "website",
    url: "https://databender.co/industries/wholesale-distribution",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Wholesale Distribution Data & Analytics Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & Analytics for Wholesale Distributors",
    description:
      "Free up cash tied in inventory. See true customer profitability. Stop giving away margin. Data analytics for mid-sized distributors competing against Amazon and the nationals.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/wholesale-distribution",
  },
};

export default function WholesaleDistributionIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Wholesale Distribution", url: "/industries/wholesale-distribution" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <WholesaleDistributionPageClient />
    </>
  );
}
