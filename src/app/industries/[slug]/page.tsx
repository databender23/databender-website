import { notFound } from "next/navigation";
import type { Metadata } from "next";
import IndustryPageClient from "./IndustryPageClient";
import { industries, getIndustryBySlug, type IndustryWithCta } from "@/lib/industries-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.title} Data & AI Solutions | Databender`,
    description: industry.description,
    openGraph: {
      title: `${industry.title} Data & AI Solutions`,
      description: industry.description,
      type: "website",
      images: [
        {
          url: "/images/databender-og.png",
          width: 1200,
          height: 630,
          alt: `${industry.title} Data & AI Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} Data & AI Solutions`,
      description: industry.description,
      images: ["/images/databender-og.png"],
    },
    alternates: {
      canonical: `https://databender.co/industries/${slug}`,
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug) as IndustryWithCta | undefined;

  if (!industry) {
    notFound();
  }

  return <IndustryPageClient industry={industry} />;
}
