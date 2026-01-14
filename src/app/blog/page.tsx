import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Data, AI & Business Intelligence Insights",
  description:
    "Practical insights on data management, AI implementation, and business intelligence from the DataBender team. No hype, just actionable guidance.",
  openGraph: {
    title: "Blog | Data, AI & Business Intelligence Insights",
    description:
      "Practical insights on data management, AI implementation, and business intelligence from the DataBender team. No hype, just actionable guidance.",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
