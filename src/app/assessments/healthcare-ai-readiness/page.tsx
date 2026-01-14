import type { Metadata } from "next";
import HealthcareAIReadinessClient from "./HealthcareAIReadinessClient";

export const metadata: Metadata = {
  title: "Healthcare AI Readiness Assessment | Document & Knowledge Management",
  description:
    "Free 5-minute assessment for healthcare organizations. Evaluate your document management, knowledge retention, and AI readiness to build a strategic roadmap.",
  openGraph: {
    title: "Healthcare AI Readiness Assessment | Document & Knowledge Management",
    description:
      "Free 5-minute assessment for healthcare organizations. Evaluate your document management, knowledge retention, and AI readiness to build a strategic roadmap.",
  },
};

export default function HealthcareAIReadinessPage() {
  return <HealthcareAIReadinessClient />;
}
