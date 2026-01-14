import type { Metadata } from "next";
import LegalClient from "./LegalClient";

export const metadata: Metadata = {
  title: "Legal AI Readiness Assessment | Is Your Firm Ready for AI?",
  description:
    "Free 5-minute assessment for law firms. Discover if your data infrastructure and governance are ready to adopt AI while protecting attorney-client privilege.",
  openGraph: {
    title: "Legal AI Readiness Assessment | Is Your Firm Ready for AI?",
    description:
      "Free 5-minute assessment for law firms. Discover if your data infrastructure and governance are ready to adopt AI while protecting attorney-client privilege.",
  },
};

export default function LegalAssessmentPage() {
  return <LegalClient />;
}
