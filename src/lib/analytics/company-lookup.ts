/**
 * Company Lookup Service
 *
 * Uses reverse DNS lookup to attempt company identification from IP addresses.
 * This is an MVP approach that works best with corporate networks.
 *
 * Future enhancements could integrate with paid services:
 * - Clearbit Reveal: https://clearbit.com/reveal
 * - Leadfeeder: https://www.leadfeeder.com/
 * - Demandbase: https://www.demandbase.com/
 * - ZoomInfo: https://www.zoominfo.com/
 * - 6sense: https://6sense.com/
 */

import dns from "dns";
import { promisify } from "util";

const dnsReverse = promisify(dns.reverse);

export interface CompanyInfo {
  name: string;
  domain: string;
  industry?: string;
  size?: string;
  linkedin?: string;
}

// In-memory cache for company lookups to avoid repeated DNS calls
// Key: IP address, Value: { data: CompanyInfo | null, timestamp: number }
const companyCache = new Map<string, { data: CompanyInfo | null; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours cache

// Known domain patterns that indicate companies vs ISPs/residential
const ISP_PATTERNS = [
  /comcast/i,
  /verizon/i,
  /att\.net/i,
  /charter/i,
  /spectrum/i,
  /cox\.net/i,
  /centurylink/i,
  /frontier/i,
  /xfinity/i,
  /optimum/i,
  /suddenlink/i,
  /mediacom/i,
  /windstream/i,
  /earthlink/i,
  /netzero/i,
  /aol\.com/i,
  /t-mobile/i,
  /sprint/i,
  /dynamic/i,
  /dhcp/i,
  /pool/i,
  /dsl/i,
  /cable/i,
  /residential/i,
  /broadband/i,
  /wireless/i,
  /mobile/i,
  /ppp/i,
  /dial/i,
  /amazonaws\.com/i, // AWS
  /googleusercontent\.com/i, // Google Cloud
  /azure/i, // Azure
  /cloudflare/i,
  /akamaitechnologies/i,
  /localhost/i,
  /localdomain/i,
];

// Patterns to extract company name from hostname
const COMPANY_DOMAIN_PATTERNS = [
  // company.com, company.co.uk, etc.
  /^(?:mail|smtp|mx|www|vpn|remote|proxy|gw|gateway)?\d*\.?([a-z0-9-]+)\.(com|co|org|net|io|ai|tech|biz|info|us|uk|de|fr|ca|au|jp|cn|in|br)(?:\.[a-z]{2})?$/i,
  // Specific corporate patterns
  /^[a-z0-9-]+\.([a-z0-9-]+)\.corp$/i,
  /^[a-z0-9-]+\.([a-z0-9-]+)\.internal$/i,
  /^[a-z0-9-]+\.([a-z0-9-]+)\.local$/i,
];

/**
 * Check if an IP address is private/local
 */
function isPrivateIP(ip: string): boolean {
  // IPv4 private ranges
  if (ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("172.") && parseInt(ip.split(".")[1]) >= 16 && parseInt(ip.split(".")[1]) <= 31 ||
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
function extractCompanyFromHostname(hostname: string): { name: string; domain: string } | null {
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
  const genericSubdomains = ["www", "mail", "smtp", "ftp", "vpn", "remote", "proxy", "gw", "gateway", "ns", "dns"];
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
 * Look up company information from an IP address using reverse DNS.
 *
 * This MVP approach has limitations:
 * - Only works for corporate networks with proper reverse DNS
 * - Residential/mobile IPs typically won't resolve to company names
 * - Results depend on how the company has configured their DNS
 *
 * For production use, consider integrating with paid services like
 * Clearbit Reveal which maintain IP-to-company databases.
 */
export async function lookupCompany(ip: string): Promise<CompanyInfo | null> {
  // Skip private IPs
  if (isPrivateIP(ip)) {
    return null;
  }

  // Check cache first
  const cached = companyCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // Perform reverse DNS lookup
    const hostnames = await dnsReverse(ip);

    if (!hostnames || hostnames.length === 0) {
      // Cache the null result
      companyCache.set(ip, { data: null, timestamp: Date.now() });
      return null;
    }

    // Try to extract company from each hostname
    for (const hostname of hostnames) {
      const company = extractCompanyFromHostname(hostname);
      if (company) {
        const result: CompanyInfo = {
          name: company.name,
          domain: company.domain,
          // Industry and size would come from enrichment services
          // For MVP, we leave these undefined
        };

        // Cache the result
        companyCache.set(ip, { data: result, timestamp: Date.now() });
        return result;
      }
    }

    // No company could be extracted from hostnames
    companyCache.set(ip, { data: null, timestamp: Date.now() });
    return null;
  } catch {
    // DNS lookup failed - IP may not have reverse DNS configured
    // This is common for residential/mobile IPs
    companyCache.set(ip, { data: null, timestamp: Date.now() });
    return null;
  }
}

/**
 * Clear the company lookup cache
 * Useful for testing or when you want to force fresh lookups
 */
export function clearCompanyCache(): void {
  companyCache.clear();
}

/**
 * Get cache statistics
 */
export function getCompanyCacheStats(): { size: number; hitRate?: number } {
  return {
    size: companyCache.size,
  };
}
