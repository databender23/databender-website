import type { Metadata } from "next";
import LegalPageClient from "./LegalPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI for Law Firms That Stays on Your Servers | Databender",
  description:
    "Associates bill more hours. Partners keep their knowledge in the firm. Due diligence in days, not weeks. Privacy-first AI that your ethics committee will actually approve.",
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
    title: "AI for Law Firms That Stays on Your Servers | Databender",
    description:
      "Associates bill more hours. Partners keep their knowledge in the firm. Due diligence in days, not weeks. Privacy-first AI your ethics committee will approve.",
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
    title: "AI for Law Firms That Stays on Your Servers | Databender",
    description:
      "Associates bill more hours. Partners keep their knowledge in the firm. Due diligence in days, not weeks. Privacy-first AI your ethics committee will approve.",
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
