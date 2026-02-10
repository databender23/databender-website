import type { Metadata } from "next";
import HealthcarePageClient from "./HealthcarePageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Healthcare AI That Stays in Your Building | Databender",
  description:
    "Protocol lookups in 30 seconds, not 15 minutes. New hires productive in weeks. 5+ hours back per person per week. On-premise AI that your compliance team will approve.",
  keywords: [
    "healthcare AI",
    "HIPAA compliant analytics",
    "clinical data analytics",
    "healthcare document intelligence",
    "EHR integration",
    "patient data management",
    "medical AI solutions",
    "healthcare data consulting",
    "on-premise healthcare AI",
    "clinical protocol search",
    "healthcare knowledge management",
  ],
  openGraph: {
    title: "Healthcare AI That Stays in Your Building | Databender",
    description:
      "Protocol lookups in 30 seconds. New hires productive in weeks. 5+ hours back per person per week. On-premise AI your compliance team will approve.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Healthcare Data & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare AI That Stays in Your Building | Databender",
    description:
      "Protocol lookups in 30 seconds. New hires productive in weeks. 5+ hours back per person per week. On-premise AI your compliance team will approve.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/healthcare",
  },
};

export default function HealthcareIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Healthcare", url: "/industries/healthcare" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <HealthcarePageClient />
    </>
  );
}
