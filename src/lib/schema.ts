import type { BlogPost } from "@/types";
import type { ConsolidatedService } from "./services-data";
import type { CaseStudy, Testimonial } from "./case-studies-data";

const SITE_URL = "https://databender.co";
const LOGO_URL = `${SITE_URL}/images/databender-logo.png`;

/**
 * Organization schema for Databender
 * Used on the root layout to establish site-wide organization information
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Databender",
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "Custom data and AI solutions at a fraction of the old cost. Senior consultants with AI-powered delivery build what used to take months in weeks. Data strategy, analytics, and automation for growing companies.",
    sameAs: ["https://www.linkedin.com/company/databender/"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Data Consulting",
      "AI Data Cleanup",
      "Business Intelligence",
      "Data Analytics",
      "Data Integration",
      "AI Insights",
    ],
    priceRange: "$$",
  };
}

/**
 * BlogPosting schema for blog posts
 * Generates rich snippets for blog articles in search results
 */
export function blogPostSchema(post: BlogPost) {
  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${SITE_URL}${post.featuredImage}`
    : `${SITE_URL}/images/databender-og.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author === "Databender Team" ? "Databender" : post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Databender",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: Math.round(post.readingTime * 200), // Estimate ~200 words per minute
  };
}

/**
 * Service schema for service pages
 * Generates rich snippets for service offerings
 */
export function serviceSchema(service: ConsolidatedService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription || service.description,
    provider: {
      "@type": "ProfessionalService",
      name: "Databender",
      url: SITE_URL,
    },
    serviceType: service.title,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    url: `${SITE_URL}/services/${service.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Services`,
      itemListElement: service.subServices.map((subService, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: subService.title,
          description: subService.description,
        },
        position: index + 1,
      })),
    },
  };
}

/**
 * Article schema for case studies
 * Generates rich snippets for case study pages
 */
export function caseStudySchema(study: CaseStudy) {
  const imageUrl = study.thumbnail
    ? study.thumbnail.startsWith("http")
      ? study.thumbnail
      : `${SITE_URL}${study.thumbnail}`
    : `${SITE_URL}/images/databender-og.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.challengeBrief,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "Databender",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Databender",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/case-studies/${study.slug}`,
    },
    about: {
      "@type": "Thing",
      name: study.industry,
    },
    keywords: study.services.join(", "),
  };
}

/**
 * BreadcrumbList schema for navigation breadcrumbs
 * Generates breadcrumb rich snippets in search results
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * WebSite schema with search action
 * Enables sitelinks searchbox in Google search results
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Databender",
    url: SITE_URL,
    description:
      "Custom data and AI solutions at a fraction of the old cost. What used to take months now takes weeks.",
    publisher: {
      "@type": "Organization",
      name: "Databender",
    },
  };
}

/**
 * Review schema for testimonials
 * Generates aggregate rating and individual review rich snippets
 */
export function reviewSchema(testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Databender",
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: testimonials.length.toString(),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: t.name,
        jobTitle: t.title,
      },
      reviewBody: t.quote,
    })),
  };
}

/**
 * FAQ schema for FAQ sections
 * Generates FAQ rich snippets in search results
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
