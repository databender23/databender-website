import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Databender | Rethink What's Possible",
  description:
    "Stop settling for software that almost fits. Founded by Grant Bender with 8+ years of Fortune 500 experience. Purpose-built data and AI solutions, delivered in weeks, that you own outright.",
  keywords: [
    "data consulting firm",
    "AI consulting company",
    "Grant Bender",
    "Fortune 500 consulting experience",
    "data and AI solutions",
    "boutique consulting firm",
  ],
  openGraph: {
    title: "About Databender | Rethink What's Possible",
    description:
      "Stop settling for software that almost fits. Purpose-built data and AI solutions, delivered in weeks, that you own outright.",
    type: "website",
    url: "https://databender.co/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Databender | Rethink What's Possible",
    description:
      "Stop settling for software that almost fits. Purpose-built data and AI solutions, delivered in weeks, that you own outright.",
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
