import type { Metadata } from "next";
import LegalPageClient from "./LegalPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, industryServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI for Law Firms That Stays on Your Servers",
  description:
    "Databender builds on-premise AI for mid-sized law firms. Associates bill more hours. Partners keep their knowledge in the firm. Due diligence in days, not weeks. Privacy-first document intelligence your ethics committee will approve.",
  keywords: [
    "legal AI",
    "law firm AI",
    "document review automation",
    "legal document intelligence",
    "due diligence automation",
    "attorney work product search",
    "client data security",
    "legal technology",
    "AI for lawyers",
    "legal research AI",
    "contract analysis",
    "e-discovery",
    "privilege protection",
    "legal compliance",
    "law firm data security",
    "on-premise legal AI",
    "entity resolution legal",
    "knowledge management law firm",
  ],
  openGraph: {
    title: "AI for Law Firms That Stays on Your Servers",
    description:
      "Databender builds on-premise AI for mid-sized law firms. Document intelligence, knowledge preservation, and entity resolution. Privacy-first and designed for ABA 512 compliance.",
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
    title: "AI for Law Firms That Stays on Your Servers",
    description:
      "Databender builds on-premise AI for mid-sized law firms. Document intelligence, knowledge preservation, and entity resolution. Privacy-first and designed for ABA 512 compliance.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries/legal",
  },
};

const faqs = [
  {
    question: "We already have Westlaw/Lexis.",
    answer: "Westlaw and Lexis search published law. We search YOUR firm's work product. The briefs, memos, contracts, and research your attorneys have produced over decades. Different problem, different solution.",
  },
  {
    question: "Our data is too messy to index.",
    answer: "Everyone says that. We've indexed firms with 15+ years of unorganized work product. The data is better than you think. Part of onboarding is a document audit where we tell you exactly what's possible.",
  },
  {
    question: "What about client confidentiality?",
    answer: "Everything runs on your servers. Client data never touches an outside system. No contracts with OpenAI or any cloud AI provider. Complete audit trails on every query. Designed for ABA 512 compliance from day one.",
  },
  {
    question: "How long does implementation take?",
    answer: "Document intelligence is live in 8-12 weeks. You're using it while we're still adding documents. Works with iManage, NetDocuments, or whatever you're running.",
  },
];

const industryService = {
  name: "AI Solutions for Law Firms",
  description: "On-premise document intelligence, knowledge preservation, and entity resolution for mid-sized law firms. Privacy-first AI designed for ABA 512 compliance. You own the code outright.",
  slug: "legal",
  serviceTypes: ["Document Intelligence", "Knowledge Preservation", "Entity Resolution", "Legal AI"],
  audience: "Mid-sized law firms with 20-75 attorneys",
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
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={industryServiceSchema(industryService)} />
      <LegalPageClient />
    </>
  );
}
