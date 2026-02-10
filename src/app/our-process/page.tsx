import type { Metadata } from "next";
import OurProcessClient from "./OurProcessClient";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Process | Rethink What's Possible | Databender",
  description:
    "Custom software that used to take months ships in weeks. See how our 4-phase approach builds purpose-built solutions you own outright. 125x cost savings, 31% better predictions.",
  keywords: [
    "data consulting process",
    "AI implementation methodology",
    "agentic AI consulting",
    "4-phase consulting approach",
    "data project delivery",
    "AI project management",
  ],
  openGraph: {
    title: "Our Process | Rethink What's Possible | Databender",
    description:
      "Custom software that used to take months ships in weeks. Our 4-phase approach builds purpose-built solutions you own outright.",
    type: "website",
    url: "https://databender.co/our-process",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | Rethink What's Possible | Databender",
    description:
      "Custom software that used to take months ships in weeks. Our 4-phase approach builds purpose-built solutions you own outright.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/our-process",
  },
};

export default function OurProcessPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Our Process", url: "/our-process" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <OurProcessClient />
    </>
  );
}
