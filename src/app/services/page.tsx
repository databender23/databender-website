import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema, type FAQItem } from "@/lib/schema";

// FAQ data for structured data - must be defined in server component
const servicesFAQs: FAQItem[] = [
  {
    question: "What services does Databender offer?",
    answer: "Databender offers three core services that work together: Data & AI Strategy (building your data foundation), Analytics & BI (dashboards and reporting that reveal insights), and AI Services (intelligent automation and AI agents). You can engage us for one service or combine all three for a complete data transformation."
  },
  {
    question: "How long do projects typically take?",
    answer: "Project timelines vary based on scope and complexity. Quick wins like dashboard builds or data cleanup projects can be completed in 2-4 weeks. Larger initiatives such as data platform modernization or custom AI solutions typically run 2-4 months. We always start with a discovery phase to provide accurate timelines for your specific situation."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with mid-market companies across multiple industries including manufacturing, healthcare, legal services, financial services, and professional services. Our approach adapts to industry-specific challenges while leveraging cross-industry best practices in data management and AI implementation."
  },
  {
    question: "How is Databender different from other consultancies?",
    answer: "Unlike large consultancies that sell strategy decks, we build and deliver working solutions. We combine strategic thinking with hands-on implementation, meaning the same team that designs your solution also builds it. Our focus on mid-market companies means you get enterprise-grade capabilities without enterprise complexity or pricing."
  }
];

export const metadata: Metadata = {
  title: "Data & AI Services | Strategy, Analytics & Automation | Databender",
  description:
    "Transform your data into business results with Databender's three core services: Data & AI Strategy for building your foundation, Analytics & BI for actionable insights, and AI Services for intelligent automation. Enterprise-grade solutions for mid-market companies.",
  openGraph: {
    title: "Data & AI Services | Strategy, Analytics & Automation | Databender",
    description:
      "Transform your data into business results with Databender's three core services: Data & AI Strategy, Analytics & BI, and AI Services for intelligent automation.",
    type: "website",
    images: [
      {
        url: "/images/databender-og.png",
        width: 1200,
        height: 630,
        alt: "Databender Data & AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & AI Services | Strategy, Analytics & Automation | Databender",
    description:
      "Transform your data into business results with Databender's three core services: Data & AI Strategy, Analytics & BI, and AI Services for intelligent automation.",
    images: ["/images/databender-og.png"],
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
