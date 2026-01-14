import type { Metadata } from "next";
import OurProcessClient from "./OurProcessClient";

export const metadata: Metadata = {
  title: "Our Process | How DataBender Delivers Data & AI Solutions",
  description:
    "Our 4-phase approach: Discovery, Design, Build, Support. Learn how we turn data chaos into clarity with AI-augmented delivery and senior expertise.",
  openGraph: {
    title: "Our Process | How DataBender Delivers Data & AI Solutions",
    description:
      "Our 4-phase approach: Discovery, Design, Build, Support. Learn how we turn data chaos into clarity with AI-augmented delivery and senior expertise.",
  },
};

export default function OurProcessPage() {
  return <OurProcessClient />;
}
