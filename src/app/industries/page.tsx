import type { Metadata } from "next";
import IndustriesClient from "./IndustriesClient";

export const metadata: Metadata = {
  title: "Industries We Serve | Healthcare, Legal, Manufacturing & More",
  description:
    "DataBender brings proven data and AI solutions to healthcare, legal, real estate, and manufacturing. Cross-industry experience means tested approaches, not experiments.",
  openGraph: {
    title: "Industries We Serve | Healthcare, Legal, Manufacturing & More",
    description:
      "DataBender brings proven data and AI solutions to healthcare, legal, real estate, and manufacturing. Cross-industry experience means tested approaches, not experiments.",
  },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
