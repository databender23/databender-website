import type { Metadata } from "next";
import CREClient from "./CREClient";

export const metadata: Metadata = {
  title: "Portfolio Analytics Assessment | Commercial Real Estate",
  description:
    "Free 5-minute assessment for property managers with 5-50 properties. See where your portfolio analytics stand and what centralized visibility could unlock.",
  openGraph: {
    title: "Portfolio Analytics Assessment | Commercial Real Estate",
    description:
      "Free 5-minute assessment for property managers with 5-50 properties. See where your portfolio analytics stand and what centralized visibility could unlock.",
  },
};

export default function CREAssessmentPage() {
  return <CREClient />;
}
