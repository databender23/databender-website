import type { Metadata } from "next";
import ManufacturingPageClient from "./ManufacturingPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Manufacturing Data & AI Solutions | Do More With Your Team",
  description: "On-premise AI for manufacturers. Get operational visibility, supply chain alerts, and instant answers. Support 20% more volume without adding headcount. Your data stays private.",
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
    title: "Manufacturing Data & AI Solutions | Do More With Your Team",
    description: "On-premise AI for manufacturers. Get operational visibility, supply chain alerts, and instant answers. Support 20% more volume without adding headcount.",
    type: "website",
    images: [{ url: "https://databender.co/opengraph-image", width: 1200, height: 630, alt: "Databender Manufacturing Data & AI Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Data & AI Solutions | Do More With Your Team",
    description: "On-premise AI for manufacturers. Get operational visibility, supply chain alerts, and instant answers. Support 20% more volume without adding headcount.",
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
