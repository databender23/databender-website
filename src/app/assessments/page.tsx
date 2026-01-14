import type { Metadata } from "next";
import AssessmentsClient from "./AssessmentsClient";

export const metadata: Metadata = {
  title: "Free Assessments | Data Maturity & AI Readiness Diagnostics",
  description:
    "Free diagnostic tools to understand your data maturity and AI readiness. Get personalized recommendations in minutes. No sales pitch, just practical guidance.",
  openGraph: {
    title: "Free Assessments | Data Maturity & AI Readiness Diagnostics",
    description:
      "Free diagnostic tools to understand your data maturity and AI readiness. Get personalized recommendations in minutes. No sales pitch, just practical guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Assessments | Data Maturity & AI Readiness Diagnostics",
    description:
      "Free diagnostic tools to understand your data maturity and AI readiness. Get personalized recommendations in minutes. No sales pitch, just practical guidance.",
    images: ["/images/databender-og.png"],
  },
};

export default function AssessmentsPage() {
  return <AssessmentsClient />;
}
