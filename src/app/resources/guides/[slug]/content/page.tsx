import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { legalGuides, healthcareGuides, manufacturingGuides, creGuides, constructionGuides, distributionGuides, getGuideBySlug } from "@/lib/lead-magnets-data";
import { getGuideContentBySlug } from "@/lib/guide-content-data";
import GuideContentPageClient from "./GuideContentPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guideContent = getGuideContentBySlug(slug);

  if (!guideContent) {
    return { title: "Guide Not Found" };
  }

  return {
    title: `${guideContent.title} | Databender`,
    description: guideContent.subtitle,
    openGraph: {
      title: guideContent.title,
      description: guideContent.subtitle,
      type: "article",
      images: [
        {
          url: "https://databender.co/opengraph-image",
          width: 1200,
          height: 630,
          alt: guideContent.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guideContent.title,
      description: guideContent.subtitle,
      images: ["https://databender.co/opengraph-image"],
    },
    alternates: {
      canonical: `https://databender.co/resources/guides/${slug}/content`,
    },
  };
}

export default async function GuideContentPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const guideContent = getGuideContentBySlug(slug);

  if (!guide || !guideContent) {
    notFound();
  }

  return <GuideContentPageClient guide={guide} guideContent={guideContent} />;
}

// Generate static paths for all guides
export function generateStaticParams() {
  const allGuides = [...legalGuides, ...healthcareGuides, ...manufacturingGuides, ...creGuides, ...constructionGuides, ...distributionGuides];
  return allGuides.map((guide) => ({
    slug: guide.slug,
  }));
}
