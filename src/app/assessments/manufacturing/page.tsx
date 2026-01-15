import type { Metadata } from "next";
import ManufacturingClient from "./ManufacturingClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Manufacturing Operations Assessment | Stop Firefighting",
  description:
    "Free 5-minute assessment for growing manufacturers. See where you're losing time to spreadsheets, phone calls, and firefighting.",
  keywords: [
    "manufacturing assessment",
    "operations assessment",
    "manufacturing data maturity",
    "industrial analytics readiness",
    "manufacturing efficiency",
    "production visibility",
    "manufacturing AI readiness",
  ],
  openGraph: {
    title: "Manufacturing Operations Assessment | Stop Firefighting",
    description:
      "Free 5-minute assessment for growing manufacturers. See where you're losing time to spreadsheets, phone calls, and firefighting.",
    type: "website",
    images: [
      {
        url: "https://databender.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Manufacturing Operations Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Operations Assessment | Stop Firefighting",
    description:
      "Free 5-minute assessment for growing manufacturers. See where you're losing time to spreadsheets and firefighting.",
    images: ["https://databender.co/opengraph-image"],
  },
  alternates: {
    canonical: "https://databender.co/assessments/manufacturing",
  },
};

export default function ManufacturingAssessmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Manufacturing Operations", url: "/assessments/manufacturing" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ManufacturingClient />
    </>
  );
}
