import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";
import { JsonLd } from "@/components/seo";
import { reviewSchema } from "@/lib/schema";
import { testimonials } from "@/lib/case-studies-data";

export const metadata: Metadata = {
  title: "Case Studies | Real Data & AI Results from DataBender Projects",
  description:
    "See real results from data and AI projects. 125x cost savings, 31% higher conversion rates, and more. Filter by industry, challenge, or service.",
  openGraph: {
    title: "Case Studies | Real Data & AI Results from DataBender Projects",
    description:
      "See real results from data and AI projects. 125x cost savings, 31% higher conversion rates, and more. Filter by industry, challenge, or service.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Real Data & AI Results from DataBender Projects",
    description:
      "See real results from data and AI projects. 125x cost savings, 31% higher conversion rates, and more. Filter by industry, challenge, or service.",
    images: ["/images/databender-og.png"],
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={reviewSchema(testimonials)} />
      <CaseStudiesClient />
    </>
  );
}
