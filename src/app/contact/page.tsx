import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Databender | Let's Talk About What's Possible",
  description:
    "Tell us what your perfect solution looks like. 30-minute conversation, no obligations. Purpose-built data and AI solutions, delivered in weeks.",
  keywords: [
    "data consulting contact",
    "AI consulting inquiry",
    "free consultation",
    "data strategy consultation",
    "business intelligence consultation",
  ],
  openGraph: {
    title: "Contact Databender | Let's Talk About What's Possible",
    description:
      "Tell us what your perfect solution looks like. 30-minute conversation, no obligations. Purpose-built data and AI solutions, delivered in weeks.",
    type: "website",
    url: "https://databender.co/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Databender | Let's Talk About What's Possible",
    description:
      "Tell us what your perfect solution looks like. 30-minute conversation, no obligations. Purpose-built data and AI solutions, delivered in weeks.",
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
