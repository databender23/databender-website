import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";
import { JsonLd } from "@/components/seo";
import { reviewSchema, breadcrumbSchema } from "@/lib/schema";
import { testimonials } from "@/lib/case-studies-data";

export const metadata: Metadata = {
  title: "Case Studies | Real Data & AI Results | Databender",
  description:
    "125x cost savings with AI agents. 31% higher prediction accuracy. Real results from real projects. See how we build solutions that deliver.",
  keywords: [
    "data consulting case studies",
    "AI project results",
    "machine learning case studies",
    "business intelligence results",
    "data transformation success stories",
    "AI implementation examples",
  ],
  openGraph: {
    title: "Case Studies | Real Data & AI Results | Databender",
    description:
      "125x cost savings with AI agents. 31% higher prediction accuracy. Real results from real projects. See how we build solutions that deliver.",
    type: "website",
    url: "https://databender.co/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Real Data & AI Results | Databender",
    description:
      "125x cost savings with AI agents. 31% higher prediction accuracy. Real results from real projects. See how we build solutions that deliver.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/case-studies",
  },
};

export default function CaseStudiesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={reviewSchema(testimonials)} />
      <CaseStudiesClient />
    </>
  );
}
