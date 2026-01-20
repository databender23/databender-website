import type { Metadata } from "next";
import OurProcessClient from "./OurProcessClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Process | How We Solve Problems Your Competitors Can't",
  description:
    "Agentic AI changes what's economically feasible. 125x cost savings, 31% better predictions. See how our 4-phase approach delivers real outcomes in regulated industries.",
  keywords: [
    "data consulting process",
    "AI implementation methodology",
    "agentic AI consulting",
    "4-phase consulting approach",
    "data project delivery",
    "AI project management",
  ],
  openGraph: {
    title: "Our Process | How We Solve Problems Your Competitors Can't",
    description:
      "Agentic AI changes what's economically feasible. 125x cost savings, 31% better predictions. See how our 4-phase approach delivers real outcomes in regulated industries.",
    type: "website",
    url: "https://databender.co/our-process",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | How We Solve Problems Your Competitors Can't",
    description:
      "Agentic AI changes what's economically feasible. 125x cost savings, 31% better predictions. See how our 4-phase approach delivers real outcomes in regulated industries.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/our-process",
  },
};

export default function OurProcessPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Our Process", url: "/our-process" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <OurProcessClient />
    </>
  );
}
