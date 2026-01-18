/**
 * Company Identification Types
 *
 * Shared type definitions for company identification services.
 * Used across RB2B, Leadfeeder, and reverse DNS lookup integrations.
 */

/**
 * Original CompanyInfo type (for reverse DNS lookups)
 */
export interface CompanyInfo {
  name: string;
  domain: string;
  industry?: string;
  size?: string;
  linkedin?: string;
}

/**
 * Source of company identification
 */
export type IdentificationSource = "reverse_dns" | "rb2b" | "leadfeeder";

/**
 * Confidence level of company identification
 * - high: Person-level identification (RB2B match with email)
 * - medium: Company-level identification (Leadfeeder, RB2B company-only)
 * - low: Reverse DNS inference
 */
export type ConfidenceLevel = "low" | "medium" | "high";

/**
 * Employee count ranges (standard classification)
 */
export type EmployeeCountRange =
  | "1-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "501-1000"
  | "1001-5000"
  | "5001-10000"
  | "10000+";

/**
 * Enriched company information from all identification sources
 */
export interface EnrichedCompanyInfo {
  // Core company data
  name: string;
  domain: string;
  industry?: string;

  // Person-level data (from RB2B)
  personName?: string;
  personEmail?: string;
  linkedInUrl?: string;
  jobTitle?: string;

  // Company enrichment data (from Leadfeeder)
  employeeCount?: EmployeeCountRange;
  revenue?: string;

  // Identification metadata
  source: IdentificationSource;
  confidence: ConfidenceLevel;

  // Legacy fields for backwards compatibility
  size?: string;
  linkedin?: string;
}

/**
 * RB2B person identification response
 */
export interface RB2BPersonResult {
  personName: string;
  personEmail: string;
  linkedInUrl?: string;
  jobTitle?: string;
  companyName: string;
  companyDomain?: string;
  companyIndustry?: string;
}

/**
 * Leadfeeder company identification response
 */
export interface LeadfeederCompanyResult {
  companyName: string;
  companyDomain: string;
  industry?: string;
  employeeCount?: EmployeeCountRange;
  revenue?: string;
}

/**
 * Cache entry for company lookups
 */
export interface CompanyCacheEntry {
  data: EnrichedCompanyInfo | null;
  timestamp: number;
}
