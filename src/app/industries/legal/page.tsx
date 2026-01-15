import type { Metadata } from "next";
import LegalPageClient from "./LegalPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Data & AI Solutions for Law Firms | Legal Industry | Databender",
  description:
    "Privacy-first AI solutions for law firms. Document intelligence, due diligence automation, and legal research tools that protect attorney-client privilege. All data stays on your servers.",
  keywords: [
    "legal AI",
    "law firm AI",
    "document review automation",
    "legal document intelligence",
    "due diligence automation",
    "attorney work product",
    "client data security",
    "legal technology",
    "AI for lawyers",
    "legal research AI",
    "contract analysis",
    "e-discovery",
    "privilege protection",
    "legal compliance",
    "law firm data security",
  ],
  openGraph: {
    title: "Data & AI Solutions for Law Firms | Legal Industry",
    description:
      "Privacy-first AI solutions for law firms. Document intelligence, due diligence automation, and legal research tools that protect attorney-client privilege.",
    type: "website",
    url: "https://databender.co/industries/legal",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Legal Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI Solutions for Law Firms | Legal Industry",
    description:
      "Privacy-first AI solutions for law firms. Document intelligence, due diligence automation, and legal research tools that protect attorney-client privilege.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/legal",
  },
};

export default function LegalIndustryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Legal", url: "/industries/legal" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <LegalPageClient />
    </>
  );
}
