import { notFound } from "next/navigation";
import { legalGuides, getGuideBySlug } from "@/lib/lead-magnets-data";
import GuidePageClient from "./GuidePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <GuidePageClient guide={guide} />;
}

// Generate static paths for all guides
export function generateStaticParams() {
  return legalGuides.map((guide) => ({
    slug: guide.slug,
  }));
}
