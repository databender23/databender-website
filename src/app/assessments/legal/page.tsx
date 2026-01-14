import type { Metadata } from "next";
import LegalClient from "./LegalClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Legal AI Readiness Assessment | Is Your Firm Ready for AI?",
  description:
    "Free 5-minute assessment for law firms. Discover if your data infrastructure and governance are ready to adopt AI while protecting attorney-client privilege.",
  openGraph: {
    title: "Legal AI Readiness Assessment | Is Your Firm Ready for AI?",
    description:
      "Free 5-minute assessment for law firms. Discover if your data infrastructure and governance are ready to adopt AI while protecting attorney-client privilege.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Legal AI Readiness Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal AI Readiness Assessment | Is Your Firm Ready for AI?",
    description:
      "Free 5-minute assessment for law firms. Discover if your data infrastructure and governance are ready to adopt AI while protecting attorney-client privilege.",
    images: ["/images/databender-og.png"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/legal",
  },
};

export default function LegalAssessmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Legal AI Readiness", url: "/assessments/legal" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <LegalClient />
    </>
  );
}
