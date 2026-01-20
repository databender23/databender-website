import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog | Data, AI & Business Intelligence Insights",
  description:
    "Practical insights on data management, AI implementation, and business intelligence from the Databender team. No hype, just actionable guidance.",
  keywords: [
    "data blog",
    "AI articles",
    "business intelligence insights",
    "data strategy guide",
    "AI implementation tips",
    "data consulting insights",
  ],
  openGraph: {
    title: "Blog | Data, AI & Business Intelligence Insights",
    description:
      "Practical insights on data management, AI implementation, and business intelligence from the Databender team. No hype, just actionable guidance.",
    type: "website",
    url: "https://databender.co/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Data, AI & Business Intelligence Insights",
    description:
      "Practical insights on data management, AI implementation, and business intelligence from the Databender team. No hype, just actionable guidance.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/blog",
  },
};

export default function BlogPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <BlogClient />
    </>
  );
}
