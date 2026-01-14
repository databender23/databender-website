import type { Metadata } from "next";
import ManufacturingClient from "./ManufacturingClient";

export const metadata: Metadata = {
  title: "Manufacturing Scale-Up Assessment | Data Readiness for Growth",
  description:
    "Free 5-minute assessment for $10M-$100M manufacturers. Discover if your data infrastructure is ready to support your next phase of growth.",
  openGraph: {
    title: "Manufacturing Scale-Up Assessment | Data Readiness for Growth",
    description:
      "Free 5-minute assessment for $10M-$100M manufacturers. Discover if your data infrastructure is ready to support your next phase of growth.",
  },
};

export default function ManufacturingAssessmentPage() {
  return <ManufacturingClient />;
}
