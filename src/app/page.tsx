import { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { JsonLd } from "@/components/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Custom Data & AI Solutions for Growing Companies | Databender",
  description:
    "Purpose-built data and AI solutions at a fraction of the old cost. Senior consultants with AI-powered delivery build custom analytics, automation, and AI agents in weeks. Healthcare, legal, manufacturing specialists.",
  keywords: [
    "custom data solutions",
    "AI consulting",
    "business intelligence",
    "data strategy",
    "AI agents",
    "analytics consulting",
    "HIPAA compliant AI",
    "enterprise AI solutions",
  ],
  openGraph: {
    title: "Custom Data & AI Solutions for Growing Companies | Databender",
    description:
      "Purpose-built data and AI solutions at a fraction of the old cost. Senior consultants with AI-powered delivery build custom analytics, automation, and AI agents in weeks.",
    type: "website",
    url: "https://databender.co",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Data & AI Solutions for Growing Companies | Databender",
    description:
      "Purpose-built data and AI solutions at a fraction of the old cost. Senior consultants with AI-powered delivery build custom analytics, automation, and AI agents in weeks.",
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
