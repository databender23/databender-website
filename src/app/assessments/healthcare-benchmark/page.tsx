import type { Metadata } from "next";
import HealthcareBenchmarkClient from "./HealthcareBenchmarkClient";

export const metadata: Metadata = {
  title: "Healthcare Price Transparency Benchmark | Compare Your Pricing",
  description:
    "See how your healthcare pricing compares to competitors in your market. Get a preview of your competitive position with our free benchmark tool.",
  openGraph: {
    title: "Healthcare Price Transparency Benchmark | Compare Your Pricing",
    description:
      "See how your healthcare pricing compares to competitors in your market. Get a preview of your competitive position with our free benchmark tool.",
  },
};

export default function HealthcareBenchmarkPage() {
  return <HealthcareBenchmarkClient />;
}
