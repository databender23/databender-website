import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema, type FAQItem } from "@/lib/schema";

// FAQ data for structured data - must be defined in server component
const servicesFAQs: FAQItem[] = [
  {
    question: "What services does Databender offer?",
    answer: "Databender offers four core services: Get Clarity (data strategy and foundations), See What's Happening (analytics and real-time visibility), Put AI to Work (AI agents and automation), and Build What You Need (custom software that replaces bloated SaaS). Start where it hurts most, or combine them."
  },
  {
    question: "How long do projects typically take?",
    answer: "Project timelines vary based on scope and complexity. Quick wins like application builds or data cleanup projects can be completed in 2-4 weeks. Larger initiatives such as data platform modernization or custom AI solutions typically run 2-4 months. We always start with a discovery phase to provide accurate timelines for your specific situation."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with mid-market companies across multiple industries including manufacturing, healthcare, legal services, financial services, and professional services. Our approach adapts to industry-specific challenges while applying cross-industry best practices in data management and AI."
  },
  {
    question: "How is Databender different from other consultancies?",
    answer: "Unlike large consultancies that sell strategy decks, we build and deliver working solutions. We combine strategic thinking with hands-on implementation, meaning the same team that designs your solution also builds it. Our focus on mid-market companies means you get enterprise-grade capabilities without enterprise complexity or pricing."
  }
];

export const metadata: Metadata = {
  title: "Data & AI Services | Purpose-Built Solutions | Databender",
  description:
    "Get clarity. See what's happening. Put AI to work. Build what you need. Purpose-built data and AI solutions that fit your exact workflow. No bloatware, no compromises.",
  openGraph: {
    title: "Data & AI Services | Purpose-Built Solutions | Databender",
    description:
      "Purpose-built data and AI solutions that fit your exact workflow. Get clarity, see what's happening, put AI to work, build what you need.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Data & AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI Services | Purpose-Built Solutions | Databender",
    description:
      "Purpose-built data and AI solutions that fit your exact workflow. Get clarity, see what's happening, put AI to work, build what you need.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/services",
  },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <>
      <JsonLd data={faqSchema(servicesFAQs)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ServicesPageClient />
    </>
  );
}
