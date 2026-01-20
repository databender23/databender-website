import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Databender | Senior Expertise, AI-Powered Speed",
  description:
    "Custom data and AI solutions at a fraction of the old cost. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience. What used to require offshore teams now takes weeks.",
  keywords: [
    "data consulting firm",
    "AI consulting company",
    "Grant Bender",
    "Fortune 500 consulting experience",
    "data and AI solutions",
    "boutique consulting firm",
  ],
  openGraph: {
    title: "About Databender | Senior Expertise, AI-Powered Speed",
    description:
      "Custom data and AI solutions at a fraction of the old cost. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
    type: "website",
    url: "https://databender.co/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Databender | Senior Expertise, AI-Powered Speed",
    description:
      "Custom data and AI solutions at a fraction of the old cost. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/about",
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <AboutClient />
    </>
  );
}
