import type { Metadata } from "next";
import IndustriesClient from "./IndustriesClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Industries We Serve | Healthcare, Legal, Manufacturing & More",
  description:
    "Databender brings proven data and AI solutions to healthcare, legal, real estate, and manufacturing. Cross-industry experience means tested approaches, not experiments.",
  keywords: [
    "healthcare data consulting",
    "legal AI solutions",
    "manufacturing data analytics",
    "commercial real estate AI",
    "industry data solutions",
    "HIPAA compliant analytics",
    "regulated industry AI",
  ],
  openGraph: {
    title: "Industries We Serve | Healthcare, Legal, Manufacturing & More",
    description:
      "Databender brings proven data and AI solutions to healthcare, legal, real estate, and manufacturing. Cross-industry experience means tested approaches, not experiments.",
    type: "website",
    url: "https://databender.co/industries",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Databender Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Healthcare, Legal, Manufacturing & More",
    description:
      "Databender brings proven data and AI solutions to healthcare, legal, real estate, and manufacturing.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/industries",
  },
};

export default function IndustriesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <IndustriesClient />
    </>
  );
}
