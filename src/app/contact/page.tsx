import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact DataBender | Schedule a Free Consultation",
  description:
    "Schedule a free 30-minute consultation to discuss your data and AI challenges. Get expert guidance with no obligations.",
  openGraph: {
    title: "Contact DataBender | Schedule a Free Consultation",
    description:
      "Schedule a free 30-minute consultation to discuss your data and AI challenges. Get expert guidance with no obligations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact DataBender | Schedule a Free Consultation",
    description:
      "Schedule a free 30-minute consultation to discuss your data and AI challenges. Get expert guidance with no obligations.",
    images: ["/images/databender-og.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
