/**
 * Leadfeeder Integration Service
 *
 * Leadfeeder provides company-level identification for website visitors.
 * Free tier: 100 companies/month
 *
 * API Documentation: https://docs.leadfeeder.com/
 *
 * Environment Variables Required:
 * - LEADFEEDER_API_KEY: Your Leadfeeder API key
 *
 * Features:
 * - Company-level identification (name, domain, industry)
 * - Employee count and revenue ranges
 * - Works globally (not limited to US)
 * - 24-hour caching to maximize free tier usage
 */

import type {
  LeadfeederCompanyResult,
  EnrichedCompanyInfo,
  CompanyCacheEntry,
  EmployeeCountRange,
} from "./types/company";

// API configuration
const LEADFEEDER_API_KEY = process.env.LEADFEEDER_API_KEY;
const LEADFEEDER_API_ENDPOINT = "https://api.leadfeeder.com/v1/identify";

// Cache for Leadfeeder lookups
const leadfeederCache = new Map<string, CompanyCacheEntry>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Rate limiting tracking
let monthlyUsage = 0;
const MONTHLY_LIMIT = 100; // Free tier limit
let lastResetMonth = new Date().getMonth();

/**
 * Check if we should reset monthly usage counter
 */
function checkMonthlyReset(): void {
  const currentMonth = new Date().getMonth();
  if (currentMonth !== lastResetMonth) {
    monthlyUsage = 0;
    lastResetMonth = currentMonth;
    console.log("[Leadfeeder] Monthly usage counter reset");
  }
}

/**
 * Check if Leadfeeder service is available and has remaining credits
 */
export function isLeadfeederAvailable(): boolean {
  checkMonthlyReset();

  if (!LEADFEEDER_API_KEY) {
    return false;
  }

  if (monthlyUsage >= MONTHLY_LIMIT) {
    console.log("[Leadfeeder] Monthly limit reached, service unavailable");
    return false;
  }

  return true;
}

/**
 * Get remaining Leadfeeder credits for the month
 */
export function getLeadfeederCreditsRemaining(): number {
  checkMonthlyReset();
  return Math.max(0, MONTHLY_LIMIT - monthlyUsage);
}

/**
 * Normalize employee count to standard range
 */
function normalizeEmployeeCount(count: unknown): EmployeeCountRange | undefined {
  if (!count) return undefined;

  // Handle numeric values
  if (typeof count === "number") {
    if (count <= 10) return "1-10";
    if (count <= 50) return "11-50";
    if (count <= 200) return "51-200";
    if (count <= 500) return "201-500";
    if (count <= 1000) return "501-1000";
    if (count <= 5000) return "1001-5000";
    if (count <= 10000) return "5001-10000";
    return "10000+";
  }

  // Handle string ranges already in correct format
  if (typeof count === "string") {
    const validRanges: EmployeeCountRange[] = [
      "1-10", "11-50", "51-200", "201-500",
      "501-1000", "1001-5000", "5001-10000", "10000+"
    ];
    if (validRanges.includes(count as EmployeeCountRange)) {
      return count as EmployeeCountRange;
    }

    // Try to parse string as number
    const parsed = parseInt(count, 10);
    if (!isNaN(parsed)) {
      return normalizeEmployeeCount(parsed);
    }
  }

  return undefined;
}

/**
 * Parse Leadfeeder API response into standardized format
 */
function parseLeadfeederResponse(
  data: Record<string, unknown>
): LeadfeederCompanyResult | null {
  // Leadfeeder response structure may vary - adjust based on actual API
  const company = data.company as Record<string, unknown> | undefined;
  const lead = data.lead as Record<string, unknown> | undefined;

  // Try to extract company name from various possible locations
  const companyName =
    (company?.name as string) ||
    (lead?.company_name as string) ||
    (data.company_name as string) ||
    (data.name as string);

  if (!companyName) {
    return null;
  }

  // Extract domain
  const companyDomain =
    (company?.domain as string) ||
    (company?.website as string) ||
    (lead?.domain as string) ||
    (data.domain as string) ||
    "";

  return {
    companyName: companyName,
    companyDomain: companyDomain,
    industry:
      (company?.industry as string) ||
      (data.industry as string),
    employeeCount: normalizeEmployeeCount(
      company?.employee_count ||
      company?.employees ||
      data.employee_count ||
      data.size
    ),
    revenue:
      (company?.revenue as string) ||
      (company?.annual_revenue as string) ||
      (data.revenue as string),
  };
}

/**
 * Convert Leadfeeder result to EnrichedCompanyInfo
 */
function leadfeederToEnriched(result: LeadfeederCompanyResult): EnrichedCompanyInfo {
  return {
    name: result.companyName,
    domain: result.companyDomain,
    industry: result.industry,
    employeeCount: result.employeeCount,
    revenue: result.revenue,
    // Map employee count to legacy size field for compatibility
    size: result.employeeCount,
    source: "leadfeeder",
    confidence: "medium", // Company-level identification is medium confidence
  };
}

/**
 * Look up company information from Leadfeeder
 *
 * @param ip - The IP address to look up
 * @returns EnrichedCompanyInfo if found, null otherwise
 */
export async function lookupLeadfeeder(
  ip: string
): Promise<EnrichedCompanyInfo | null> {
  // Check if service is available
  if (!isLeadfeederAvailable()) {
    console.log("[Leadfeeder] Service not available (no API key or limit reached)");
    return null;
  }

  // Check cache first
  const cached = leadfeederCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("[Leadfeeder] Cache hit for IP:", ip.substring(0, 8) + "...");
    return cached.data;
  }

  try {
    console.log("[Leadfeeder] Looking up IP:", ip.substring(0, 8) + "...");

    // Make API request
    const response = await fetch(LEADFEEDER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token token=${LEADFEEDER_API_KEY}`,
        // Alternative auth header format
        "X-API-Key": LEADFEEDER_API_KEY || "",
      },
      body: JSON.stringify({
        ip_address: ip,
        // Alternative field name some APIs use
        ip: ip,
      }),
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    // Increment usage counter regardless of response
    monthlyUsage++;

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 401) {
        console.error("[Leadfeeder] Invalid API key");
      } else if (response.status === 429) {
        console.error("[Leadfeeder] Rate limit exceeded");
        // Mark as at limit to prevent further calls
        monthlyUsage = MONTHLY_LIMIT;
      } else if (response.status === 404 || response.status === 204) {
        // No match found - this is expected for many IPs
        console.log("[Leadfeeder] No match found for IP");
        leadfeederCache.set(ip, { data: null, timestamp: Date.now() });
        return null;
      } else {
        console.error("[Leadfeeder] API error:", response.status);
      }

      leadfeederCache.set(ip, { data: null, timestamp: Date.now() });
      return null;
    }

    const data = await response.json();
    const parsed = parseLeadfeederResponse(data);

    if (!parsed) {
      console.log("[Leadfeeder] No usable data in response");
      leadfeederCache.set(ip, { data: null, timestamp: Date.now() });
      return null;
    }

    const enriched = leadfeederToEnriched(parsed);
    console.log("[Leadfeeder] Successfully identified:", enriched.name);

    // Cache successful result
    leadfeederCache.set(ip, { data: enriched, timestamp: Date.now() });
    return enriched;

  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      console.error("[Leadfeeder] Request timed out");
    } else {
      console.error("[Leadfeeder] Lookup error:", error);
    }

    // Cache failure to prevent repeated attempts
    leadfeederCache.set(ip, { data: null, timestamp: Date.now() });
    return null;
  }
}

/**
 * Clear the Leadfeeder cache
 */
export function clearLeadfeederCache(): void {
  leadfeederCache.clear();
}

/**
 * Get Leadfeeder service statistics
 */
export function getLeadfeederStats(): {
  cacheSize: number;
  monthlyUsage: number;
  remainingCredits: number;
  isAvailable: boolean;
} {
  checkMonthlyReset();
  return {
    cacheSize: leadfeederCache.size,
    monthlyUsage: monthlyUsage,
    remainingCredits: getLeadfeederCreditsRemaining(),
    isAvailable: isLeadfeederAvailable(),
  };
}
