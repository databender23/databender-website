import type { Metadata } from "next";
import DataAIReadinessClient from "./DataAIReadinessClient";

export const metadata: Metadata = {
  title: "Data & AI Readiness Assessment | Free 10-Minute Diagnostic",
  description:
    "Discover if your organization is ready for AI. Answer 10 questions and get a personalized roadmap based on your current data maturity level.",
  openGraph: {
    title: "Data & AI Readiness Assessment | Free 10-Minute Diagnostic",
    description:
      "Discover if your organization is ready for AI. Answer 10 questions and get a personalized roadmap based on your current data maturity level.",
  },
};

export default function DataAIReadinessPage() {
  return <DataAIReadinessClient />;
}
