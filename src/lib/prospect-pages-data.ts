/**
 * Prospect Landing Pages Data
 *
 * Minimal prospect-specific data. Industry-specific content comes from templates.
 *
 * To add a new prospect:
 * 1. Add an entry to the `prospects` array below (~10 lines)
 * 2. Deploy - the page will be live at /a/{slug}
 *
 * To customize industry content for a specific prospect:
 * - Add an `overrides` object with any template fields to override
 */

import { buildProspectPage, type ProspectInput, type ProspectPage } from "./industry-templates";

// Re-export types for convenience
export type { ProspectPage, ProspectInput };

/**
 * Prospect entries - keep these minimal!
 * All industry-specific content comes from templates.
 */
export const prospects: ProspectInput[] = [
  // ========================================
  // LEGAL PROSPECTS
  // ========================================
  {
    slug: "lp-2026",
    password: "levenfeld",
    companyName: "Levenfeld Pearlstein LLC",
    companyLogo: "https://www.lplegal.com/wp-content/themes/levenfeld-pearlstein/images/lp-logo-main.png",
    industry: "legal",
    companySize: "80 attorneys",
    companyLocation: "Chicago, IL",
    contactName: "Jessa Baker",
    contactTitle: "CEO",
    leadership: "Jessa Baker, CEO",
    recentNews: [
      "4 new partners joined in January 2026",
      "Recognized in Chambers USA 2025 for Real Estate",
      "Expanded healthcare practice with 3 new associates",
    ],
    createdDate: "2026-01-26",
    softExpirationDays: 30,
  },
  {
    slug: "much-shelist-2026",
    password: "much",
    companyName: "Much Shelist, P.C.",
    industry: "legal",
    companySize: "93 attorneys",
    companyLocation: "Chicago, IL",
    contactName: "Courtney Mayster",
    contactTitle: "Managing Partner",
    leadership: "Courtney Mayster, Managing Partner; Steven Schwartz, CFO/COO",
    recentNews: [
      "Expanded to Orange County with new West Coast office",
      "Full-service firm with Corporate, Real Estate, Litigation, Tax, and IP practices",
      "Geographic expansion accelerating growth strategy",
    ],
    createdDate: "2026-01-26",
    softExpirationDays: 30,
  },

  // ========================================
  // DENTAL PROSPECTS (uses dental template)
  // ========================================
  {
    slug: "smile-partners-2026",
    password: "smile",
    companyName: "Smile Partners USA",
    industry: "dental",
    companySize: "100+ locations",
    companyLocation: "Troy, MI",
    contactName: "Dave Gaspar",
    contactTitle: "CEO",
    leadership: "Dave Gaspar, CEO",
    recentNews: [
      "Received investment from BlackRock/Hollyport PE in February 2025",
      "Expanded to 100+ office locations across multiple states",
      "Accelerating growth strategy with PE partnership",
    ],
    createdDate: "2026-01-26",
    softExpirationDays: 30,
  },

  // ========================================
  // MANUFACTURING PROSPECTS
  // ========================================
  {
    slug: "brava-2026",
    password: "brava",
    companyName: "Brava Roof Tile",
    industry: "manufacturing",
    companySize: "$30M revenue",
    companyLocation: "Washington, IA",
    contactName: "Adam Brantman",
    contactTitle: "CEO",
    leadership: "Adam Brantman, CEO; Andrew Ahrens, CMO",
    recentNews: [
      "Acquired by Golden Gate Capital in November 2024",
      "Leading manufacturer of composite roofing tiles",
      "Expanding sustainable building products portfolio",
    ],
    createdDate: "2026-01-26",
    softExpirationDays: 30,
  },

  // ========================================
  // COMMERCIAL REAL ESTATE PROSPECTS
  // ========================================
  {
    slug: "nai-hiffman-2026",
    password: "hiffman",
    companyName: "NAI Hiffman",
    industry: "cre",
    companySize: "800+ properties",
    companyLocation: "Chicago, IL",
    contactName: "John Heiberger",
    contactTitle: "CEO",
    leadership: "John Heiberger, CEO; Michael Flynn, COO; Ann Wallin, CFO",
    recentNews: [
      "New CEO John Heiberger joined January 2024",
      "Manages 100-130M sq ft across 28 states",
      "Launched Hiffman National expansion initiative",
    ],
    createdDate: "2026-01-26",
    softExpirationDays: 30,
  },

  // ========================================
  // CONSTRUCTION PROSPECTS
  // ========================================
  // No audits ready yet - add when available

  // ========================================
  // WHOLESALE DISTRIBUTION PROSPECTS
  // ========================================
  // No audits ready yet - add when available

  // ========================================
  // ACCOUNTING PROSPECTS
  // ========================================
  // No audits ready yet - add when available

  // ========================================
  // HEALTHCARE PROSPECTS (non-dental)
  // ========================================
  // No audits ready yet - add when available
];

/**
 * Build all prospect pages from templates + prospect data
 */
export const prospectPages: ProspectPage[] = prospects.map(buildProspectPage);

/**
 * Get a prospect page by slug
 */
export function getProspectPageBySlug(slug: string): ProspectPage | null {
  return prospectPages.find((page) => page.slug === slug) || null;
}

/**
 * Check if a prospect page has soft-expired
 */
export function isProspectPageExpired(page: ProspectPage): boolean {
  const createdDate = new Date(page.createdDate);
  const expirationDate = new Date(createdDate);
  expirationDate.setDate(expirationDate.getDate() + page.softExpirationDays);
  return new Date() > expirationDate;
}

/**
 * Get all prospect page slugs (for static generation)
 */
export function getAllProspectSlugs(): string[] {
  return prospectPages.map((page) => page.slug);
}
