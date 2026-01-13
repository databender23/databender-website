import { notFound } from "next/navigation";
import { legalGuides, getGuideBySlug } from "@/lib/lead-magnets-data";
import { getGuideContentBySlug } from "@/lib/guide-content-data";
import GuideContentPageClient from "./GuideContentPageClient";

interface Props {
  params: Promise<{ slug: string }>;
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
  return legalGuides.map((guide) => ({
    slug: guide.slug,
  }));
}
