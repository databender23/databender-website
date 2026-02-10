import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Resources | Case Studies, Assessments, Blog & Guides",
  description:
    "Free assessments, case studies, guides, and blog posts on data, AI, and custom software. Practical insights for healthcare, legal, manufacturing, and more.",
  openGraph: {
    title: "Resources | Case Studies, Assessments, Blog & Guides",
    description:
      "Free assessments, case studies, guides, and blog posts on data, AI, and custom software. Practical insights for healthcare, legal, manufacturing, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Case Studies, Assessments, Blog & Guides",
    description:
      "Free assessments, case studies, guides, and blog posts on data, AI, and custom software. Practical insights for healthcare, legal, manufacturing, and more.",
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
