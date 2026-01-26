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

  // ========================================
  // HEALTHCARE PROSPECTS
  // ========================================
  // {
  //   slug: "example-health-2026",
  //   password: "examplehealth",
  //   companyName: "Example Health Partners",
  //   industry: "healthcare",
  //   companySize: "12 locations",
  //   companyLocation: "Denver, CO",
  //   contactName: "Jane Smith",
  //   contactTitle: "COO",
  //   createdDate: "2026-01-26",
  // },

  // ========================================
  // MANUFACTURING PROSPECTS
  // ========================================
  // {
  //   slug: "example-mfg-2026",
  //   password: "examplemfg",
  //   companyName: "Example Manufacturing Co",
  //   industry: "manufacturing",
  //   companySize: "$45M revenue",
  //   companyLocation: "Indianapolis, IN",
  //   contactName: "Bob Johnson",
  //   contactTitle: "VP Operations",
  //   createdDate: "2026-01-26",
  // },

  // ========================================
  // COMMERCIAL REAL ESTATE PROSPECTS
  // ========================================
  // {
  //   slug: "example-cre-2026",
  //   password: "examplecre",
  //   companyName: "Example Property Group",
  //   industry: "cre",
  //   companySize: "25 properties",
  //   companyLocation: "Austin, TX",
  //   contactName: "Sarah Williams",
  //   contactTitle: "Managing Partner",
  //   createdDate: "2026-01-26",
  // },
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
