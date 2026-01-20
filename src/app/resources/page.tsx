import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Resources | Case Studies, Assessments, Blog & Guides",
  description:
    "Free data and AI resources: diagnostic assessments, case studies with real results, practical blog articles, and industry guides. No hype, just actionable insights.",
  openGraph: {
    title: "Resources | Case Studies, Assessments, Blog & Guides",
    description:
      "Free data and AI resources: diagnostic assessments, case studies with real results, practical blog articles, and industry guides. No hype, just actionable insights.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Case Studies, Assessments, Blog & Guides",
    description:
      "Free data and AI resources: diagnostic assessments, case studies with real results, practical blog articles, and industry guides. No hype, just actionable insights.",
    images: ["https://databender.co/opengraph-image"],
  },
};

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ResourcesClient />
    </>
  );
}
