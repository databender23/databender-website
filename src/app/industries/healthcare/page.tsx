import type { Metadata } from "next";
import HealthcarePageClient from "./HealthcarePageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Healthcare Data & AI Solutions | HIPAA-Compliant Analytics | Databender",
  description:
    "HIPAA-compliant AI solutions for healthcare organizations. On-premise document intelligence, clinical analytics, EHR integration, and patient data management. Your data never leaves your building.",
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
    title: "Healthcare Data & AI Solutions | HIPAA-Compliant Analytics",
    description:
      "HIPAA-compliant AI solutions for healthcare organizations. On-premise document intelligence, clinical analytics, and EHR integration. Your data never leaves your building.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Databender Healthcare Data & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Data & AI Solutions | HIPAA-Compliant Analytics",
    description:
      "HIPAA-compliant AI solutions for healthcare organizations. On-premise document intelligence, clinical analytics, and EHR integration. Your data never leaves your building.",
    images: ["/images/databender-og.png"],
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
