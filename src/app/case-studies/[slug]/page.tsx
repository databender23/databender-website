import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyPageClient from "./CaseStudyPageClient";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  const ogImage = study.thumbnail || "/images/databender-og.png";

  return {
    title: `${study.title} | Databender Case Study`,
    description: study.challengeBrief,
    openGraph: {
      title: study.title,
      description: study.challengeBrief,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.challengeBrief,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://databender.co/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyPageClient study={study} />;
}
