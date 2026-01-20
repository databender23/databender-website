import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Databender | Schedule a Free Consultation",
  description:
    "Schedule a free 30-minute consultation to discuss your data and AI challenges. Get expert guidance with no obligations.",
  keywords: [
    "data consulting contact",
    "AI consulting inquiry",
    "free consultation",
    "data strategy consultation",
    "business intelligence consultation",
  ],
  openGraph: {
    title: "Contact Databender | Schedule a Free Consultation",
    description:
      "Schedule a free 30-minute consultation to discuss your data and AI challenges. Get expert guidance with no obligations.",
    type: "website",
    url: "https://databender.co/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Databender | Schedule a Free Consultation",
    description:
      "Schedule a free 30-minute consultation to discuss your data and AI challenges. Get expert guidance with no obligations.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/contact",
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ContactClient />
    </>
  );
}
