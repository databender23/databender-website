import type { Metadata } from "next";
import OurProcessClient from "./OurProcessClient";

export const metadata: Metadata = {
  title: "Our Process | How We Solve Problems Your Competitors Can't",
  description:
    "Agentic AI changes what's economically feasible. 125x cost savings, 31% better predictions. See how our 4-phase approach delivers real outcomes in regulated industries.",
  openGraph: {
    title: "Our Process | How We Solve Problems Your Competitors Can't",
    description:
      "Agentic AI changes what's economically feasible. 125x cost savings, 31% better predictions. See how our 4-phase approach delivers real outcomes in regulated industries.",
  },
};

export default function OurProcessPage() {
  return <OurProcessClient />;
}
