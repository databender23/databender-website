/**
 * RB2B Integration Service
 *
 * RB2B provides person-level identification for US visitors.
 * Free tier: 150 credits/month
 *
 * API Documentation: https://docs.rb2b.com/
 *
 * Environment Variables Required:
 * - RB2B_API_KEY: Your RB2B API key
 *
 * Features:
 * - Person-level identification (name, email, LinkedIn, job title)
 * - Company identification with domain
 * - Best results for US-based corporate IPs
 * - 24-hour caching to maximize free tier usage
 */

import type { RB2BPersonResult, EnrichedCompanyInfo, CompanyCacheEntry } from "./types/company";

// API configuration
const RB2B_API_KEY = process.env.RB2B_API_KEY;
const RB2B_API_ENDPOINT = "https://api.rb2b.com/v1/identify";

// Cache for RB2B lookups (separate from main cache for granular control)
const rb2bCache = new Map<string, CompanyCacheEntry>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Rate limiting tracking
let monthlyUsage = 0;
const MONTHLY_LIMIT = 150; // Free tier limit
let lastResetMonth = new Date().getMonth();

/**
 * Check if we should reset monthly usage counter
 */
function checkMonthlyReset(): void {
  const currentMonth = new Date().getMonth();
  if (currentMonth !== lastResetMonth) {
    monthlyUsage = 0;
    lastResetMonth = currentMonth;
    console.log("[RB2B] Monthly usage counter reset");
  }
}

/**
 * Check if an IP appears to be US-based
 * Uses country code from geolocation data
 */
export function isUSBasedIP(countryCode?: string): boolean {
  return countryCode?.toUpperCase() === "US";
}

/**
 * Check if RB2B service is available and has remaining credits
 */
export function isRB2BAvailable(): boolean {
  checkMonthlyReset();

  if (!RB2B_API_KEY) {
    return false;
  }

  if (monthlyUsage >= MONTHLY_LIMIT) {
    console.log("[RB2B] Monthly limit reached, service unavailable");
    return false;
  }

  return true;
}

/**
 * Get remaining RB2B credits for the month
 */
export function getRB2BCreditsRemaining(): number {
  checkMonthlyReset();
  return Math.max(0, MONTHLY_LIMIT - monthlyUsage);
}

/**
 * Parse RB2B API response into standardized format
 */
function parseRB2BResponse(data: Record<string, unknown>): RB2BPersonResult | null {
  // RB2B returns person and company data in their response
  // Exact field names may vary - adjust based on actual API response
  const person = data.person as Record<string, unknown> | undefined;
  const company = data.company as Record<string, unknown> | undefined;

  if (!person && !company) {
    return null;
  }

  // Must have at least company name for a valid result
  const companyName = (company?.name as string) || (data.company_name as string);
  if (!companyName) {
    return null;
  }

  return {
    personName: (person?.name as string) ||
                (person?.full_name as string) ||
                (data.person_name as string) ||
                "",
    personEmail: (person?.email as string) ||
                 (data.email as string) ||
                 "",
    linkedInUrl: (person?.linkedin_url as string) ||
                 (person?.linkedin as string) ||
                 (data.linkedin_url as string),
    jobTitle: (person?.title as string) ||
              (person?.job_title as string) ||
              (data.job_title as string),
    companyName: companyName,
    companyDomain: (company?.domain as string) ||
                   (data.company_domain as string),
    companyIndustry: (company?.industry as string) ||
                     (data.industry as string),
  };
}

/**
 * Convert RB2B result to EnrichedCompanyInfo
 */
function rb2bToEnriched(result: RB2BPersonResult): EnrichedCompanyInfo {
  // Determine confidence based on data quality
  // High confidence if we have person email (verified identification)
  // Medium confidence if we only have company data
  const hasPersonEmail = Boolean(result.personEmail);
  const confidence = hasPersonEmail ? "high" : "medium";

  return {
    name: result.companyName,
    domain: result.companyDomain || "",
    industry: result.companyIndustry,
    personName: result.personName || undefined,
    personEmail: result.personEmail || undefined,
    linkedInUrl: result.linkedInUrl,
    jobTitle: result.jobTitle,
    source: "rb2b",
    confidence: confidence,
  };
}

/**
 * Look up person/company information from RB2B
 *
 * @param ip - The IP address to look up
 * @param countryCode - Country code from geolocation (e.g., "US")
 * @returns EnrichedCompanyInfo if found, null otherwise
 */
export async function lookupRB2B(
  ip: string,
  countryCode?: string
): Promise<EnrichedCompanyInfo | null> {
  // Check if service is available
  if (!isRB2BAvailable()) {
    console.log("[RB2B] Service not available (no API key or limit reached)");
    return null;
  }

  // RB2B is primarily for US visitors
  if (!isUSBasedIP(countryCode)) {
    console.log("[RB2B] Skipping non-US IP:", countryCode);
    return null;
  }

  // Check cache first
  const cached = rb2bCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("[RB2B] Cache hit for IP:", ip.substring(0, 8) + "...");
    return cached.data;
  }

  try {
    console.log("[RB2B] Looking up IP:", ip.substring(0, 8) + "...");

    // Make API request
    const response = await fetch(RB2B_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RB2B_API_KEY}`,
        "X-API-Key": RB2B_API_KEY || "", // Some APIs use this header instead
      },
      body: JSON.stringify({
        ip: ip,
        // Additional context can improve matching
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    // Increment usage counter regardless of response
    monthlyUsage++;

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 401) {
        console.error("[RB2B] Invalid API key");
      } else if (response.status === 429) {
        console.error("[RB2B] Rate limit exceeded");
        // Mark as at limit to prevent further calls this month
        monthlyUsage = MONTHLY_LIMIT;
      } else if (response.status === 404) {
        // No match found - this is expected for many IPs
        console.log("[RB2B] No match found for IP");
        rb2bCache.set(ip, { data: null, timestamp: Date.now() });
        return null;
      } else {
        console.error("[RB2B] API error:", response.status);
      }

      rb2bCache.set(ip, { data: null, timestamp: Date.now() });
      return null;
    }

    const data = await response.json();
    const parsed = parseRB2BResponse(data);

    if (!parsed) {
      console.log("[RB2B] No usable data in response");
      rb2bCache.set(ip, { data: null, timestamp: Date.now() });
      return null;
    }

    const enriched = rb2bToEnriched(parsed);
    console.log("[RB2B] Successfully identified:", enriched.name,
      enriched.personName ? `(${enriched.personName})` : "");

    // Cache successful result
    rb2bCache.set(ip, { data: enriched, timestamp: Date.now() });
    return enriched;

  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      console.error("[RB2B] Request timed out");
    } else {
      console.error("[RB2B] Lookup error:", error);
    }

    // Cache failure to prevent repeated attempts
    rb2bCache.set(ip, { data: null, timestamp: Date.now() });
    return null;
  }
}

/**
 * Clear the RB2B cache
 */
export function clearRB2BCache(): void {
  rb2bCache.clear();
}

/**
 * Get RB2B service statistics
 */
export function getRB2BStats(): {
  cacheSize: number;
  monthlyUsage: number;
  remainingCredits: number;
  isAvailable: boolean;
} {
  checkMonthlyReset();
  return {
    cacheSize: rb2bCache.size,
    monthlyUsage: monthlyUsage,
    remainingCredits: getRB2BCreditsRemaining(),
    isAvailable: isRB2BAvailable(),
  };
}
