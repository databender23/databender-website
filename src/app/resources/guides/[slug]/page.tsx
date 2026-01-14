import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { legalGuides, healthcareGuides, manufacturingGuides, creGuides, getGuideBySlug } from "@/lib/lead-magnets-data";
import GuidePageClient from "./GuidePageClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allGuides = [...legalGuides, ...healthcareGuides, ...manufacturingGuides, ...creGuides];
  return allGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  return {
    title: `${guide.title} | Free Guide`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      images: [
        {
          url: "/images/databender-og.png",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/images/databender-og.png"],
    },
    alternates: {
      canonical: `https://databender.co/resources/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: guide.title, url: `/resources/guides/${slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <GuidePageClient guide={guide} />
    </>
  );
}
