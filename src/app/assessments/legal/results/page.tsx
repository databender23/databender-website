import type { Metadata } from "next";
import LegalResultsClient from "./LegalResultsClient";

export const metadata: Metadata = {
  title: "Your Legal AI Readiness Results | Databender",
  description:
    "View your personalized Legal AI Readiness Assessment results with recommendations tailored to your firm.",
  openGraph: {
    title: "Your Legal AI Readiness Results | Databender",
    description:
      "View your personalized Legal AI Readiness Assessment results with recommendations tailored to your firm.",
  },
};

export default function LegalResultsPage() {
  return <LegalResultsClient />;
}
