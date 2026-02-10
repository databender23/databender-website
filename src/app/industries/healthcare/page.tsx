import type { Metadata } from "next";
import HealthcarePageClient from "./HealthcarePageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, industryServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Healthcare AI That Stays in Your Building",
  description:
    "Databender builds HIPAA-compliant, on-premise AI for healthcare organizations. Protocol lookups in 30 seconds, not 15 minutes. New hires productive in weeks. Works with Epic, Cerner, athenahealth, and 40+ others.",
  keywords: [
    "healthcare AI",
    "HIPAA compliant AI",
    "clinical data analytics",
    "healthcare document intelligence",
    "EHR integration",
    "patient data management",
    "medical AI solutions",
    "healthcare data consulting",
    "on-premise healthcare AI",
    "clinical protocol search",
    "healthcare knowledge management",
    "PE-backed healthcare analytics",
    "multi-location healthcare data",
  ],
  openGraph: {
    title: "Healthcare AI That Stays in Your Building",
    description:
      "Databender builds HIPAA-compliant, on-premise AI for healthcare organizations. Protocol lookups in 30 seconds. New hires productive in weeks. 5+ hours back per person per week.",
    type: "website",
    url: "https://databender.co/industries/healthcare",
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
    title: "Healthcare AI That Stays in Your Building",
    description:
      "Databender builds HIPAA-compliant, on-premise AI for healthcare organizations. Protocol lookups in 30 seconds. New hires productive in weeks. 5+ hours back per person per week.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/healthcare",
  },
};

const faqs = [
  {
    question: "Epic already has AI features.",
    answer: "Epic provides excellent tools for Epic data. We work with everything else: faxes, PDFs, external records, payer documents, policy manuals. The 97% of healthcare information that lives outside your EHR.",
  },
  {
    question: "How do we know the AI is accurate?",
    answer: "Every answer includes links to source documents. Staff verify before acting. AI accelerates the search, humans make decisions. No black boxes.",
  },
  {
    question: "What about HIPAA compliance?",
    answer: "Everything runs on your servers. Patient data never touches an outside system. No new vendor agreements with AI companies. Complete audit trails on every query. HIPAA compliant is the minimum.",
  },
  {
    question: "We have multiple locations with different systems.",
    answer: "That's exactly who we built this for. Different PMS at every location? We give you one unified view. Portfolio-wide visibility without the 18-month integration. Works with Epic, Cerner, athenahealth, and 40+ others.",
  },
];

const industryService = {
  name: "AI Solutions for Healthcare Organizations",
  description: "HIPAA-compliant, on-premise document intelligence and clinical data analytics for healthcare organizations. Protocol search, knowledge management, and multi-location data unification.",
  slug: "healthcare",
  serviceTypes: ["Document Intelligence", "Clinical Data Analytics", "Healthcare AI", "EHR Integration"],
  audience: "Healthcare organizations, imaging centers, ASCs, and PE-backed medical groups",
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
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={industryServiceSchema(industryService)} />
      <HealthcarePageClient />
    </>
  );
}
