import { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { JsonLd } from "@/components/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Rethink What's Possible | Custom Data & AI Solutions | Databender",
  description:
    "Stop paying for 100 features to use 10. Purpose-built data and AI solutions, delivered in weeks, that you own outright. Healthcare, legal, manufacturing specialists.",
  keywords: [
    "custom data solutions",
    "AI consulting",
    "business intelligence",
    "data strategy",
    "AI agents",
    "analytics consulting",
    "HIPAA compliant AI",
    "purpose-built software",
  ],
  openGraph: {
    title: "Rethink What's Possible | Custom Data & AI Solutions | Databender",
    description:
      "Stop paying for 100 features to use 10. Purpose-built data and AI solutions, delivered in weeks, that you own outright.",
    type: "website",
    url: "https://databender.co",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rethink What's Possible | Custom Data & AI Solutions | Databender",
    description:
      "Stop paying for 100 features to use 10. Purpose-built data and AI solutions, delivered in weeks, that you own outright.",
  },
  alternates: {
    canonical: "https://databender.co",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <HomePageClient />
    </>
  );
}
