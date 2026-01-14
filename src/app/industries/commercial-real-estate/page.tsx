import type { Metadata } from "next";
import CREPageClient from "./CREPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Commercial Real Estate Data & AI Solutions | Deal Intelligence",
  description:
    "AI solutions for CRE professionals. Untangle complex ownership structures, speed up due diligence, and identify off-market opportunities before competitors. Data stays on your servers.",
  keywords: [
    "commercial real estate AI",
    "CRE data analytics",
    "property ownership resolution",
    "due diligence automation",
    "deal prioritization",
    "off-market opportunities",
    "LLC ownership tracing",
    "data room review",
    "CRE lead scoring",
    "real estate data consulting",
  ],
  openGraph: {
    title: "Commercial Real Estate Data & AI Solutions | Deal Intelligence",
    description:
      "AI solutions for CRE professionals. Untangle complex ownership structures, speed up due diligence, and identify off-market opportunities.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Databender CRE Data & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Real Estate Data & AI Solutions | Deal Intelligence",
    description:
      "AI solutions for CRE professionals. Untangle complex ownership structures, speed up due diligence, and identify off-market opportunities.",
    images: ["/images/databender-og.png"],
  },
  alternates: {
    canonical: "https://databender.co/industries/commercial-real-estate",
  },
};

export default function CREIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Commercial Real Estate", url: "/industries/commercial-real-estate" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <CREPageClient />
    </>
  );
}
