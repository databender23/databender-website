import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProspectPageBySlug,
  getAllProspectSlugs,
} from "@/lib/prospect-pages-data";
import ProspectPageClient from "./ProspectPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all prospect pages
 */
export async function generateStaticParams() {
  return getAllProspectSlugs().map((slug) => ({ slug }));
}

/**
 * Generate metadata - intentionally minimal for privacy
 * No company name or details in meta tags
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getProspectPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found | Databender",
    };
  }

  return {
    title: "Your Assessment | Databender",
    description: "A personalized assessment prepared for you by Databender.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

/**
 * Prospect landing page
 * Password-protected, personalized assessment delivery
 */
export default async function ProspectPage({ params }: Props) {
  const { slug } = await params;
  const page = getProspectPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <ProspectPageClient page={page} />;
}
