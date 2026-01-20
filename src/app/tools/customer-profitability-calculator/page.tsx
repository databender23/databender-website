import type { Metadata } from "next";
import CustomerProfitabilityCalculatorClient from "./CustomerProfitabilityCalculatorClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Customer Profitability Calculator | Databender",
  description:
    "Free calculator for distributors. See which customers actually make you money after cost-to-serve. Visualize your whale curve in 2 minutes.",
  keywords: [
    "customer profitability calculator",
    "cost to serve calculator",
    "distribution profitability",
    "whale curve analysis",
    "customer margin analysis",
    "distributor profitability tool",
  ],
  openGraph: {
    title: "Customer Profitability Calculator | Databender",
    description:
      "Free calculator for distributors. See which customers actually make you money after cost-to-serve.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Customer Profitability Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Profitability Calculator | Databender",
    description:
      "Free calculator for distributors. See which customers actually make you money after cost-to-serve.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/tools/customer-profitability-calculator",
  },
};

export default function CustomerProfitabilityCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Wholesale Distribution", url: "/industries/wholesale-distribution" },
    { name: "Profitability Calculator", url: "/tools/customer-profitability-calculator" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <CustomerProfitabilityCalculatorClient />
    </>
  );
}
