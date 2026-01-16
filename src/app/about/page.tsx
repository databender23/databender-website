import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About DataBender | Senior Expertise, AI-Powered Speed",
  description:
    "Custom data and AI solutions at a fraction of the old cost. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience. What used to require offshore teams now takes weeks.",
  openGraph: {
    title: "About DataBender | Senior Expertise, AI-Powered Speed",
    description:
      "Custom data and AI solutions at a fraction of the old cost. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About DataBender | Senior Expertise, AI-Powered Speed",
    description:
      "Custom data and AI solutions at a fraction of the old cost. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
    images: ["https://databender.co/opengraph-image"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
