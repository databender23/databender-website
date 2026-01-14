import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies | Real Data & AI Results from DataBender Projects",
  description:
    "See real results from data and AI projects. 125x cost savings, 31% higher conversion rates, and more. Filter by industry, challenge, or service.",
  openGraph: {
    title: "Case Studies | Real Data & AI Results from DataBender Projects",
    description:
      "See real results from data and AI projects. 125x cost savings, 31% higher conversion rates, and more. Filter by industry, challenge, or service.",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
