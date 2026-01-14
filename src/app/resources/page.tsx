import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Resources | Case Studies, Assessments, Blog & Guides",
  description:
    "Free data and AI resources: diagnostic assessments, case studies with real results, practical blog articles, and industry guides. No hype, just actionable insights.",
  openGraph: {
    title: "Resources | Case Studies, Assessments, Blog & Guides",
    description:
      "Free data and AI resources: diagnostic assessments, case studies with real results, practical blog articles, and industry guides. No hype, just actionable insights.",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
