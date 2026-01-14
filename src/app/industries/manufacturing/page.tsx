import type { Metadata } from "next";
import ManufacturingPageClient from "./ManufacturingPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Manufacturing Data & AI Solutions | Private AI for Growth | Databender",
  description: "On-premise AI for manufacturers. Clean messy customer data, score leads based on what actually predicts sales, and find any product spec in seconds. Your pricing and costs stay private.",
  keywords: [
    "manufacturing AI",
    "industrial data analytics",
    "customer data cleanup",
    "lead scoring manufacturing",
    "product spec search",
    "manufacturing CRM",
    "B2B lead scoring",
    "private AI manufacturing",
    "on-premise AI",
    "manufacturing data consulting",
  ],
  openGraph: {
    title: "Manufacturing Data & AI Solutions | Private AI for Growth",
    description: "On-premise AI for manufacturers. Clean messy customer data, score leads based on what actually predicts sales, and find any product spec in seconds.",
    type: "website",
    images: [{ url: "/images/databender-og.png", width: 1200, height: 630, alt: "Databender Manufacturing Data & AI Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Data & AI Solutions | Private AI for Growth",
    description: "On-premise AI for manufacturers. Clean messy customer data, score leads based on what actually predicts sales, and find any product spec in seconds.",
    images: ["/images/databender-og.png"],
  },
  alternates: { canonical: "https://databender.co/industries/manufacturing" },
};

export default function ManufacturingIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Manufacturing", url: "/industries/manufacturing" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ManufacturingPageClient />
    </>
  );
}
