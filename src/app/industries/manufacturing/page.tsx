import type { Metadata } from "next";
import ManufacturingPageClient from "./ManufacturingPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Manufacturing AI That Runs on Your Equipment | Databender",
  description: "Support 20% more volume without adding headcount. Orders, production, and shipments in one place. Spec lookups in seconds. On-premise AI that keeps your competitive data private.",
  keywords: [
    "manufacturing AI",
    "industrial data analytics",
    "manufacturing operational visibility",
    "supply chain visibility",
    "product spec search",
    "manufacturing productivity",
    "private AI manufacturing",
    "on-premise AI",
    "manufacturing data consulting",
    "ERP integration manufacturing",
  ],
  openGraph: {
    title: "Manufacturing AI That Runs on Your Equipment | Databender",
    description: "Support 20% more volume without adding headcount. Orders, production, and shipments in one place. On-premise AI that keeps your competitive data private.",
    type: "website",
    images: [{ url: "https://databender.co/opengraph-image", width: 1200, height: 630, alt: "Databender Manufacturing Data & AI Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing AI That Runs on Your Equipment | Databender",
    description: "Support 20% more volume without adding headcount. Orders, production, and shipments in one place. On-premise AI that keeps your competitive data private.",
    images: ["https://databender.co/opengraph-image"],
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
