/**
 * Company Lookup Service
 *
 * Orchestrates company identification from multiple sources:
 * 1. RB2B (Primary for US) - Person-level identification, 150 free/month
 * 2. Leadfeeder (Secondary) - Company-level identification, 100 free/month
 * 3. Reverse DNS (Fallback) - Free, works best with corporate networks
 *
 * Environment Variables:
 * - RB2B_API_KEY: RB2B API key for person-level identification
 * - LEADFEEDER_API_KEY: Leadfeeder API key for company identification
 *
 * Lookup Strategy:
 * - US IPs: RB2B -> Leadfeeder -> Reverse DNS
 * - Non-US IPs: Leadfeeder -> Reverse DNS
 *
 * All results cached for 24 hours to maximize free tier usage.
 */

import dns from "dns";
import { promisify } from "util";
import { lookupRB2B, isRB2BAvailable, isUSBasedIP } from "./rb2b-lookup";
import { lookupLeadfeeder, isLeadfeederAvailable } from "./leadfeeder-lookup";
import type {
  CompanyInfo,
  EnrichedCompanyInfo,
  CompanyCacheEntry,
} from "./types/company";

const dnsReverse = promisify(dns.reverse);

// Re-export types for external consumers
export type { CompanyInfo, EnrichedCompanyInfo } from "./types/company";

// Main cache for orchestrated lookups (separate from service-specific caches)
const companyCache = new Map<string, CompanyCacheEntry>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours cache

// Known domain patterns that indicate companies vs ISPs/residential
const ISP_PATTERNS = [
  // Major US ISPs
  /comcast/i,
  /xfinity/i,
  /verizon/i,
  /fios/i,
  /att\.net/i,
  /att\.com/i,
  /charter/i,
  /spectrum/i,
  /cox\.net/i,
  /cox\.com/i,
  /centurylink/i,
  /lumen/i,
  /frontier/i,
  /optimum/i,
  /altice/i,
  /suddenlink/i,
  /mediacom/i,
  /windstream/i,
  /earthlink/i,
  /hughesnet/i,
  /starlink/i,
  // Regional ISPs
  /rcn\.com/i,
  /rcn\.net/i,
  /astound/i,
  /wow\.com/i,
  /wowway/i,
  /breezeline/i,
  /atlantic\.net/i,
  /consolidated/i,
  /tds\.net/i,
  /ziply/i,
  /metronet/i,
  /fidium/i,
  /google\s*fiber/i,
  /sonic\.net/i,
  /ting/i,
  // Mobile carriers
  /t-mobile/i,
  /tmobile/i,
  /sprint/i,
  /boost/i,
  /cricket/i,
  /metro\s*pcs/i,
  /tracfone/i,
  /visible/i,
  /mint\s*mobile/i,
  /us\s*cellular/i,
  // Legacy/dial-up
  /netzero/i,
  /aol\.com/i,
  /juno/i,
  // Generic ISP patterns
  /dynamic/i,
  /dhcp/i,
  /pool/i,
  /\bdsl\b/i,
  /\bcable\b/i,
  /residential/i,
  /broadband/i,
  /\bwireless\b/i,
  /\bmobile\b/i,
  /\bppp\b/i,
  /\bdial/i,
  /\bisp\b/i,
  /\btelco\b/i,
  // Cloud providers (not real visitors)
  /amazonaws\.com/i,
  /googleusercontent\.com/i,
  /\bazure/i,
  /cloudflare/i,
  /akamaitechnologies/i,
  /fastly/i,
  /digitalocean/i,
  /linode/i,
  /vultr/i,
  /heroku/i,
  /netlify/i,
  /vercel/i,
  // Local/internal
  /localhost/i,
  /localdomain/i,
  /\.local$/i,
  /\.internal$/i,
];

/**
 * Check if an IP address is private/local
 */
function isPrivateIP(ip: string): boolean {
  // IPv4 private ranges
  if (ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      (ip.startsWith("172.") && parseInt(ip.split(".")[1]) >= 16 && parseInt(ip.split(".")[1]) <= 31) ||
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.startsWith("fc") || // IPv6 private
      ip.startsWith("fd") || // IPv6 private
      ip.startsWith("fe80")) { // IPv6 link-local
    return true;
  }
  return false;
}

/**
 * Check if hostname appears to be an ISP/residential connection
 */
function isISPHostname(hostname: string): boolean {
  return ISP_PATTERNS.some((pattern) => pattern.test(hostname));
}

/**
 * Extract company name from hostname
 */
function extractCompanyFromHostname(
  hostname: string
): { name: string; domain: string } | null {
  // Skip if it looks like an ISP
  if (isISPHostname(hostname)) {
    return null;
  }

  // Try to extract domain from hostname
  const parts = hostname.toLowerCase().split(".");

  // Need at least 2 parts (company.com)
  if (parts.length < 2) {
    return null;
  }

  // Get the main domain (e.g., "microsoft" from "remote.corp.microsoft.com")
  // Work backwards from TLD
  let domainName: string | null = null;
  let fullDomain: string | null = null;

  // Handle standard TLDs
  const tldIndex = parts.length - 1;
  const tld = parts[tldIndex];

  // Check for two-part TLDs like .co.uk
  const commonSecondLevelDomains = ["co", "com", "org", "net", "gov", "edu", "ac"];
  if (parts.length >= 3 && commonSecondLevelDomains.includes(parts[tldIndex - 1])) {
    domainName = parts[tldIndex - 2];
    fullDomain = `${parts[tldIndex - 2]}.${parts[tldIndex - 1]}.${tld}`;
  } else {
    domainName = parts[tldIndex - 1];
    fullDomain = `${parts[tldIndex - 1]}.${tld}`;
  }

  if (!domainName || domainName.length < 2) {
    return null;
  }

  // Skip generic subdomains that got picked as company name
  const genericSubdomains = [
    "www", "mail", "smtp", "ftp", "vpn", "remote",
    "proxy", "gw", "gateway", "ns", "dns"
  ];
  if (genericSubdomains.includes(domainName)) {
    return null;
  }

  // Format company name (capitalize, handle hyphens)
  const formattedName = domainName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    name: formattedName,
    domain: fullDomain,
  };
}

/**
 * Perform reverse DNS lookup
 */
async function lookupReverseDNS(ip: string): Promise<EnrichedCompanyInfo | null> {
  try {
    console.log("[ReverseDNS] Looking up IP:", ip.substring(0, 8) + "...");
    const hostnames = await dnsReverse(ip);

    if (!hostnames || hostnames.length === 0) {
      return null;
    }

    // Try to extract company from each hostname
    for (const hostname of hostnames) {
      const company = extractCompanyFromHostname(hostname);
      if (company) {
        console.log("[ReverseDNS] Successfully identified:", company.name);
        return {
          name: company.name,
          domain: company.domain,
          source: "reverse_dns",
          confidence: "low",
        };
      }
    }

    return null;
  } catch {
    // DNS lookup failed - IP may not have reverse DNS configured
    return null;
  }
}

/**
 * Look up company information from an IP address using multiple services.
 *
 * Strategy:
 * 1. For US IPs: Try RB2B first (person-level, highest value)
 * 2. Try Leadfeeder (company-level)
 * 3. Fall back to reverse DNS (free, low confidence)
 *
 * @param ip - The IP address to look up
 * @param countryCode - Optional country code from geolocation
 * @returns EnrichedCompanyInfo if found, null otherwise
 */
export async function lookupCompanyEnriched(
  ip: string,
  countryCode?: string
): Promise<EnrichedCompanyInfo | null> {
  // Skip private IPs
  if (isPrivateIP(ip)) {
    return null;
  }

  // Check main cache first
  const cached = companyCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("[CompanyLookup] Cache hit for IP:", ip.substring(0, 8) + "...");
    return cached.data;
  }

  let result: EnrichedCompanyInfo | null = null;

  // Step 1: Try RB2B for US IPs (person-level identification)
  if (isUSBasedIP(countryCode) && isRB2BAvailable()) {
    result = await lookupRB2B(ip, countryCode);
    if (result) {
      companyCache.set(ip, { data: result, timestamp: Date.now() });
      return result;
    }
  }

  // Step 2: Try Leadfeeder (company-level identification)
  if (isLeadfeederAvailable()) {
    result = await lookupLeadfeeder(ip);
    if (result) {
      companyCache.set(ip, { data: result, timestamp: Date.now() });
      return result;
    }
  }

  // Step 3: Fall back to reverse DNS
  result = await lookupReverseDNS(ip);

  // Cache the result (even if null)
  companyCache.set(ip, { data: result, timestamp: Date.now() });
  return result;
}

/**
 * Legacy function for backwards compatibility.
 * Use lookupCompanyEnriched for new code.
 */
export async function lookupCompany(ip: string): Promise<CompanyInfo | null> {
  const enriched = await lookupCompanyEnriched(ip);

  if (!enriched) {
    return null;
  }

  // Convert to legacy CompanyInfo format
  return {
    name: enriched.name,
    domain: enriched.domain,
    industry: enriched.industry,
    size: enriched.size || enriched.employeeCount,
    linkedin: enriched.linkedin || enriched.linkedInUrl,
  };
}

/**
 * Clear all company lookup caches
 */
export function clearCompanyCache(): void {
  companyCache.clear();
  // Note: Individual service caches are cleared via their own functions
  // This only clears the orchestration cache
}

/**
 * Get cache statistics
 */
export function getCompanyCacheStats(): {
  size: number;
  hitRate?: number;
} {
  return {
    size: companyCache.size,
  };
}

/**
 * Get comprehensive service statistics
 */
export async function getCompanyLookupStats(): Promise<{
  mainCacheSize: number;
  rb2b: { available: boolean; remainingCredits: number };
  leadfeeder: { available: boolean; remainingCredits: number };
}> {
  // Dynamic imports to avoid circular deps
  const { getRB2BStats } = await import("./rb2b-lookup");
  const { getLeadfeederStats } = await import("./leadfeeder-lookup");

  const rb2bStats = getRB2BStats();
  const leadfeederStats = getLeadfeederStats();

  return {
    mainCacheSize: companyCache.size,
    rb2b: {
      available: rb2bStats.isAvailable,
      remainingCredits: rb2bStats.remainingCredits,
    },
    leadfeeder: {
      available: leadfeederStats.isAvailable,
      remainingCredits: leadfeederStats.remainingCredits,
    },
  };
}
