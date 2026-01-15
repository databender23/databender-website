import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About DataBender | Data & AI Consultancy Founded by Grant Bender",
  description:
    "DataBender delivers enterprise-grade data analytics and AI solutions with boutique attention. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
  openGraph: {
    title: "About DataBender | Data & AI Consultancy Founded by Grant Bender",
    description:
      "DataBender delivers enterprise-grade data analytics and AI solutions with boutique attention. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About DataBender | Data & AI Consultancy Founded by Grant Bender",
    description:
      "DataBender delivers enterprise-grade data analytics and AI solutions with boutique attention. Founded by Grant Bender with 8+ years of Fortune 500 consulting experience.",
    images: ["https://databender.co/opengraph-image"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
